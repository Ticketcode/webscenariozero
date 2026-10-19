import { ACCIONES, ACCION_IDS, COMPONENTES, PERFILES, type RespuestaEve, type SalidaModelo } from './schema';

export const SIN_RESPUESTA_TEXTO = 'Todavía no tengo esa respuesta. Te conecto con el equipo para que te la den por escrito.';

export const respuestaSinRespuesta = (bloqueada = false): RespuestaEve => ({
  texto: SIN_RESPUESTA_TEXTO,
  acciones: [{ ...ACCIONES.contacto, principal: true }],
  perfil: 'desconocido',
  componente: 'ninguno',
  fuente: 'respaldo',
  bloqueada,
});

// Intentos de inyección de instrucciones: no se envían al modelo.
const INYECCION = [
  /ignora\w*\s+(todas?\s+)?(las\s+|tus\s+|las\s+anteriores\s+)?(instrucciones|reglas|indicaciones)/i,
  /olvida\w*\s+(todo|las\s+instrucciones|tus\s+reglas)/i,
  /ignore\s+(all\s+|the\s+|your\s+)?(previous|prior|above)?\s*(instructions|rules)/i,
  /(system|developer)\s*prompt|prompt\s+del\s+sistema|instrucciones\s+del\s+sistema/i,
  /(muestra|revela|repite|imprime|dime)\w*\s+.{0,30}(instrucciones|prompt|corpus|reglas internas)/i,
  /act[uú]a\s+como|finge\s+que|eres\s+ahora|modo\s+(desarrollador|dios|dan)\b|jailbreak/i,
  /<\s*\/?\s*(pregunta|system|instrucciones)\s*>/i,
];

export function esInyeccion(texto: string): boolean {
  return INYECCION.some((r) => r.test(texto));
}

// Lo que EVE nunca dice (secciones 7 y 8 del requerimiento).
const PROHIBIDOS: [RegExp, string][] = [
  [/blockchain|vitrina|primera\s+cohorte|centro\s+nacional|plataforma\s+oficial|alianza\s+p[uú]blico[- ]privada|\bAPP\b/i, 'termino_prohibido'],
  [/\bferia\b|\bstands?\b/i, 'termino_prohibido'],
  [/sal[oó]n\s+oval|hangar(es)?|distribuci[oó]n\s+de\s+espacios/i, 'espacios_evento'],
  [/MinTIC\s+(convoca|organiza|avala|vende)/i, 'rol_mintic'],
  [/\b(garantiza|garantizamos|prometemos?)\b.{0,40}\b(retorno|roi|ganancia|dinero)\b/i, 'promesa_retorno'],
  [/\b(computaci[oó]n\s+cu[aá]ntica|cu[aá]ntic[oa])\b/i, 'escenario_futuro'],
  [/\b(inject|injects)\b/i, 'detalle_ejercicio'],
  [/\b(las\s+)?[0-2]?\d[:.]\d{2}\s*(h|hrs|a\.?\s?m\.?|p\.?\s?m\.?)\b/i, 'horario'],
];

// Precios: solo se permite la boleta de $3.000.000 COP. Ningún otro valor en pesos.
function tienePrecioNoPermitido(texto: string): boolean {
  const montos = texto.match(/\$\s*[\d][\d.,]*|[\d][\d.,]*\s*(COP|pesos)\b/gi) ?? [];
  return montos.some((m) => !/(^|\D)3\.000\.000(?![.,]?\d)/.test(m));
}

// El modelo puede devolver valores fuera de las listas (un componente o una acción que no existen). Eso no es un riesgo de
// contenido: se corrige en vez de bloquear la respuesta. Una acción desconocida se descarta; sin acciones válidas va a contacto.
export function normalizar(s: SalidaModelo): SalidaModelo {
  const acciones = (Array.isArray(s.acciones) ? s.acciones : []).filter((a, i, arr) => ACCION_IDS.includes(a) && arr.indexOf(a) === i).slice(0, 3);
  return {
    texto: typeof s.texto === 'string' ? s.texto : '',
    perfil: PERFILES.includes(s.perfil) ? s.perfil : 'desconocido',
    componente: COMPONENTES.includes(s.componente) ? s.componente : 'ninguno',
    acciones: acciones.length ? acciones : ['contacto'],
    sin_respuesta: !!s.sin_respuesta,
  };
}

// Valida que el texto no rompa las líneas rojas. Si algo falla, el visitante recibe la respuesta segura.
export function revisar(s: SalidaModelo): { ok: true } | { ok: false; motivo: string } {
  const t = (s.texto ?? '').trim();
  if (!t) return { ok: false, motivo: 'vacia' };
  if (t.length > 900) return { ok: false, motivo: 'demasiado_larga' };
  for (const [re, motivo] of PROHIBIDOS) if (re.test(t)) return { ok: false, motivo };
  if (tienePrecioNoPermitido(t)) return { ok: false, motivo: 'precio' };
  if (/https?:\/\/|www\./i.test(t)) return { ok: false, motivo: 'url_en_texto' };
  if (/<\/?[a-z][^>]*>/i.test(t)) return { ok: false, motivo: 'html' };
  return { ok: true };
}

export function aRespuesta(s: SalidaModelo): RespuestaEve {
  const ids = s.acciones.length ? s.acciones : (['contacto'] as const);
  return {
    texto: s.texto.trim(),
    acciones: ids.slice(0, 3).map((id, i) => ({ ...ACCIONES[id], principal: i === 0 })),
    perfil: s.perfil,
    componente: s.componente,
    fuente: 'modelo',
  };
}
