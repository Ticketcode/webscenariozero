import { NextResponse } from 'next/server';
import { validarLead } from '@/lib/eve/flujoLead';
import { notificarLead } from '@/lib/eve/notificar';
import { limitar } from '@/lib/eve/ratelimit';

export const runtime = 'nodejs';
export const maxDuration = 30;

const json = (cuerpo: unknown, status = 200) => NextResponse.json(cuerpo, { status, headers: { 'Cache-Control': 'no-store' } });

function origenPermitido(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const permitidos = new Set([new URL(req.url).origin, ...(process.env.SITE_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean)]);
  return permitidos.has(origin);
}

// Recibe una solicitud de aliado (desde el chat de EVE o desde /aliados/solicitud) y la pasa al equipo comercial.
export async function POST(req: Request) {
  if (!origenPermitido(req)) return json({ error: 'origen_no_permitido' }, 403);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const lim = limitar(`lead:${ip}`);
  if (!lim.ok) return json({ error: 'limite', reintentarEnSeg: lim.reintentarEnSeg }, 429);

  let cuerpo: Record<string, unknown>;
  try { cuerpo = await req.json(); } catch { return json({ error: 'json_invalido' }, 400); }

  // Trampa para bots: el campo "web" está oculto; si viene lleno se responde "ok" sin enviar nada.
  if (typeof cuerpo.web === 'string' && cuerpo.web.trim()) return json({ ok: true });

  // Sin consentimiento expreso no se guarda ni se envía ningún dato personal.
  if (cuerpo.consentimiento !== true) return json({ error: 'sin_consentimiento' }, 400);

  const datos = validarLead(cuerpo);
  if (!datos) return json({ error: 'datos_invalidos' }, 400);

  const origen = cuerpo.origen === 'formulario' ? 'formulario' : 'eve';
  const r = await notificarLead({ ...datos, origen, recibido: new Date().toISOString(), consentimiento: { aceptado: true, politica: 'provisional-2026-10-30', texto: 'Autoriza el uso de sus datos para ser contactado por el equipo comercial de Scenario Zero.' } });
  if (!r.ok) return json({ error: 'sin_destino' }, 503);
  return json({ ok: true });
}
