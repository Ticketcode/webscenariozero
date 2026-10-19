import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { responderCategoria } from '@/lib/eve/categorias';
import { aRespuesta, esInyeccion, normalizar, respuestaSinRespuesta, revisar } from '@/lib/eve/guardrails';
import { registrar } from '@/lib/eve/log';
import { limitar } from '@/lib/eve/ratelimit';
import { SYSTEM, TOOL_RESPONDER, type SalidaModelo } from '@/lib/eve/schema';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MODELO = process.env.EVE_WEB_MODEL || 'claude-haiku-4-5-20251001';
const MAX_PREGUNTA = 400;
const MAX_HISTORIAL = 6;

type Turno = { rol: 'persona' | 'eve'; texto: string };

// Origen permitido: el propio sitio y los de SITE_ORIGINS. Sin cabecera Origin (curl, pruebas) se permite; el límite de uso aplica igual.
function origenPermitido(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const permitidos = new Set([new URL(req.url).origin, ...(process.env.SITE_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean)]);
  return permitidos.has(origin);
}

const json = (cuerpo: unknown, status = 200) => NextResponse.json(cuerpo, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const t0 = Date.now();
  if (!origenPermitido(req)) return json({ error: 'origen_no_permitido' }, 403);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const lim = limitar(ip);
  if (!lim.ok) return json({ error: 'limite', reintentarEnSeg: lim.reintentarEnSeg }, 429);

  let cuerpo: { pregunta?: unknown; historial?: unknown };
  try { cuerpo = await req.json(); } catch { return json({ error: 'json_invalido' }, 400); }

  const pregunta = typeof cuerpo.pregunta === 'string' ? cuerpo.pregunta.replace(/\s+/g, ' ').trim() : '';
  if (!pregunta) return json({ error: 'pregunta_vacia' }, 400);
  if (pregunta.length > MAX_PREGUNTA) return json({ error: 'pregunta_larga' }, 400);

  // La inyección de instrucciones no llega al modelo.
  if (esInyeccion(pregunta)) {
    registrar({ fuente: 'respaldo', sinRespuesta: true, inyeccion: true, ms: Date.now() - t0 });
    return json(respuestaSinRespuesta(true));
  }

  // Preguntas por lo que recibe una categoría (o su precio, o una comparación): responde la tabla fija, no el modelo.
  const deTabla = responderCategoria(pregunta);
  if (deTabla) {
    registrar({ fuente: 'tabla', sinRespuesta: false, ms: Date.now() - t0 });
    return json(deTabla);
  }

  const historial: Turno[] = Array.isArray(cuerpo.historial)
    ? (cuerpo.historial as unknown[])
        .filter((t): t is Turno => !!t && typeof t === 'object' && ((t as Turno).rol === 'persona' || (t as Turno).rol === 'eve') && typeof (t as Turno).texto === 'string')
        .slice(-MAX_HISTORIAL)
        .map((t) => ({ rol: t.rol, texto: t.texto.slice(0, 600) }))
    : [];

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: 'sin_modelo' }, 503); // el cliente usa las respuestas de respaldo

  try {
    const client = new Anthropic({ apiKey });
    // El historial va como texto plano y la pregunta nueva dentro de <pregunta>, tratada como dato no confiable.
    const mensajes: Anthropic.MessageParam[] = [];
    for (const t of historial) {
      const role = t.rol === 'persona' ? 'user' : 'assistant';
      const contenido = role === 'user' ? `<pregunta>${t.texto}</pregunta>` : t.texto;
      if (mensajes.at(-1)?.role === role) continue;
      mensajes.push({ role, content: contenido });
    }
    if (mensajes.length && mensajes[0].role === 'assistant') mensajes.shift();
    if (mensajes.at(-1)?.role === 'user') mensajes.pop();
    mensajes.push({ role: 'user', content: `<pregunta>${pregunta}</pregunta>` });

    const r = await client.messages.create({
      model: MODELO,
      max_tokens: 700,
      temperature: 0.2,
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      tools: [TOOL_RESPONDER],
      tool_choice: { type: 'tool', name: 'responder' },
      messages: mensajes,
    });

    const uso = r.content.find((b) => b.type === 'tool_use');
    if (!uso || uso.type !== 'tool_use') throw new Error('sin_tool_use');
    const salida = normalizar(uso.input as SalidaModelo);

    const v = revisar(salida);
    if (!v.ok) {
      registrar({ fuente: 'respaldo', sinRespuesta: true, bloqueada: v.motivo, ms: Date.now() - t0 });
      return json(respuestaSinRespuesta(true));
    }
    const res = salida.sin_respuesta ? { ...respuestaSinRespuesta(), perfil: salida.perfil } : aRespuesta(salida);
    registrar({ fuente: 'modelo', sinRespuesta: !!salida.sin_respuesta, perfil: salida.perfil, ms: Date.now() - t0 });
    return json(res);
  } catch (e) {
    registrar({ fuente: 'respaldo', sinRespuesta: false, bloqueada: `error:${e instanceof Error ? e.message.slice(0, 60) : 'desconocido'}`, ms: Date.now() - t0 });
    return json({ error: 'modelo_no_disponible' }, 502); // el cliente usa las respuestas de respaldo
  }
}
