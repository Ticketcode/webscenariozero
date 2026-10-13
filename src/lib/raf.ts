// Un único bucle requestAnimationFrame para todo el sitio. Cada consumidor decide si dibuja (visibilidad, etc.).
type Frame = (t: number) => void;

const subs = new Set<Frame>();
let running = false;

function loop(t: number) {
  if (!subs.size) { running = false; return; }
  if (!document.hidden) subs.forEach((f) => f(t));
  requestAnimationFrame(loop);
}

export function subscribe(fn: Frame): () => void {
  subs.add(fn);
  if (!running) { running = true; requestAnimationFrame(loop); }
  return () => { subs.delete(fn); };
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (k: number) => k * k * (3 - 2 * k);
export const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
