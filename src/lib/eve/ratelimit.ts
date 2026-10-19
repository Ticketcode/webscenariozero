// Límite de uso por visitante. En memoria: sirve en local y como primera barrera, pero en serverless (Vercel) cada
// instancia tiene su propio contador. Para producción hay que cambiar el almacén por Vercel KV / Upstash (misma interfaz).
const VENTANAS = [
  { ms: 60_000, max: Number(process.env.EVE_RATELIMIT_PER_MIN) || 10 }, // preguntas por minuto
  { ms: 3_600_000, max: Number(process.env.EVE_RATELIMIT_PER_HOUR) || 60 }, // preguntas por hora
];

const golpes = new Map<string, number[]>();

export function limitar(clave: string, ahora = Date.now()): { ok: true } | { ok: false; reintentarEnSeg: number } {
  const lista = (golpes.get(clave) ?? []).filter((t) => ahora - t < VENTANAS[VENTANAS.length - 1].ms);
  for (const v of VENTANAS) {
    const dentro = lista.filter((t) => ahora - t < v.ms);
    if (dentro.length >= v.max) return { ok: false, reintentarEnSeg: Math.ceil((v.ms - (ahora - dentro[0])) / 1000) };
  }
  lista.push(ahora);
  golpes.set(clave, lista);
  if (golpes.size > 5000) for (const [k, v] of golpes) if (!v.some((t) => ahora - t < VENTANAS[0].ms)) golpes.delete(k);
  return { ok: true };
}
