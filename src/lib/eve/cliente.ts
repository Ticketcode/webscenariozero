import { responder as respaldo, type Respuesta } from '@/data/sz';

export type Turno = { rol: 'persona' | 'eve'; texto: string };

const ERROR_SENAL = 'Se perdió la señal. Inténtalo de nuevo en un momento.';

// Pide la respuesta a /api/eve. Si el modelo no está disponible (sin llave, caído) usa las respuestas de respaldo del Anexo B,
// así la experiencia nunca se rompe. Con el límite de uso (429) muestra el mensaje de señal perdida.
export async function pedirRespuesta(pregunta: string, historial: Turno[]): Promise<Respuesta> {
  try {
    const r = await fetch('/api/eve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta, historial }),
    });
    if (r.status === 429) return { re: '', texto: ERROR_SENAL, acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }] };
    if (!r.ok) return respaldo(pregunta);
    const d = (await r.json()) as { texto: string; acciones: { label: string; href: string; principal?: boolean }[] };
    return { re: '', texto: d.texto, acciones: d.acciones };
  } catch {
    return respaldo(pregunta);
  }
}
