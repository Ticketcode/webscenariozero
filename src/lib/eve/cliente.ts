import { responder as respaldo, type Respuesta } from '@/data/sz';

export type Turno = { rol: 'persona' | 'eve'; texto: string };

const ERROR_SENAL = 'Se perdió la señal. Inténtalo de nuevo en un momento.';

const sentencia = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// Lo que EVE dice DESPUÉS de que la persona elige un botón, justo antes de pasar a la otra página: así el salto no es abrupto
// y no se da por hecha una elección que la persona todavía no hizo. Lo escribe el sitio para que el tono sea siempre el mismo.
export function mensajeAlElegir(a: { label: string; href: string }): string {
  const destino = `«${sentencia(a.label)}»`;
  if (a.href.includes('#entradas')) return `Excelente. Te llevo a ${destino}. Si necesitas algo más, vuelve aquí y te sigo ayudando.`;
  if (a.href.includes('lista-de-espera')) return `Perfecto. Te llevo a ${destino}. Si te queda alguna duda, vuelve aquí y la resolvemos.`;
  if (a.href === '/contacto') return `Listo. Te llevo a ${destino} para que hables con el equipo. Cuando termines, vuelve aquí si necesitas algo más.`;
  return `Claro. Te llevo a ${destino}. Cuando quieras, vuelve aquí y seguimos conversando.`;
}

// Etiqueta de un botón de EVE: si el texto viene todo en mayúsculas (como el CTA del sitio) se muestra en minúsculas, igual que el resto.
export const etiqueta = (label: string) => (label === label.toUpperCase() ? sentencia(label) : label);

// Etiqueta de un botón como la diría la persona al elegirlo (por ejemplo «Compra tu boleta»).
export const eleccionDe = (label: string) => sentencia(label);

// Pide la respuesta a /api/eve. Si el modelo no está disponible (sin llave, caído) usa las respuestas de respaldo del Anexo B,
// así la experiencia nunca se rompe. Con el límite de uso (429) muestra el mensaje de señal perdida.
export async function pedirRespuesta(pregunta: string, historial: Turno[]): Promise<Respuesta> {
  try {
    const r = await fetch('/api/eve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta, historial }),
    });
    if (r.status === 429) return { re: '', texto: ERROR_SENAL, acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }], sugerencias: [] };
    if (!r.ok) return respaldo(pregunta);
    const d = (await r.json()) as { texto: string; acciones: { label: string; href: string; principal?: boolean }[]; sugerencias?: string[] };
    return { re: '', texto: d.texto, acciones: d.acciones, sugerencias: d.sugerencias ?? [] };
  } catch {
    return respaldo(pregunta);
  }
}
