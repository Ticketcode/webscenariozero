import type { Respuesta } from '@/data/sz';

// Solicitud de aliado conversada con EVE. El guion lo controla el código (no el modelo): preguntas fijas, validación y un
// resumen con consentimiento antes de enviar. Nada de esto promete cupo ni precio. Módulo sin dependencias de servidor:
// lo usan el chat (cliente), el formulario de /aliados/solicitud y la ruta /api/eve/lead.

export const CATEGORIAS_LEAD = ['Silicio', 'Platinum', 'Gold', 'Silver', 'Academic'] as const;
export const POR_DEFINIR = 'Por definir con el equipo';

export type DatosLead = {
  nombre: string;
  organizacion: string; // organización y cargo
  categoria: string;
  correo: string;
  telefono: string;
  nota: string;
};
type Campo = keyof DatosLead;

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// ---- validación (la misma en el chat, el formulario y el servidor) ----
export const validar = {
  nombre: (v: string) => (v.trim().length >= 2 && v.trim().length <= 80 ? v.trim().replace(/\s+/g, ' ') : null),
  organizacion: (v: string) => (v.trim().length >= 2 && v.trim().length <= 160 ? v.trim().replace(/\s+/g, ' ') : null),
  categoria: (v: string) => {
    const q = norm(v);
    const c = CATEGORIAS_LEAD.find((x) => q.includes(norm(x)));
    if (c) return c;
    if (/\b(no se|no estoy seguro|aun no|ayuda|orient|recomiend|cual)\b/.test(q) || q === POR_DEFINIR.toLowerCase()) return POR_DEFINIR;
    return null;
  },
  correo: (v: string) => (/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.trim().length <= 120 ? v.trim().toLowerCase() : null),
  telefono: (v: string) => {
    const t = v.trim();
    const d = t.replace(/\D/g, '');
    return /^\+?[\d\s().-]+$/.test(t) && d.length >= 7 && d.length <= 15 ? t.replace(/\s+/g, ' ') : null;
  },
  nota: (v: string) => {
    const t = v.trim().replace(/\s+/g, ' ');
    if (/^(no|ninguna|nada|no gracias|n\/a)\.?$/i.test(t)) return '';
    return t.length <= 400 ? t : null;
  },
};

export function validarLead(d: Partial<Record<Campo, unknown>>): DatosLead | null {
  const s = (k: Campo) => (typeof d[k] === 'string' ? (d[k] as string) : '');
  const nombre = validar.nombre(s('nombre'));
  const organizacion = validar.organizacion(s('organizacion'));
  const categoria = validar.categoria(s('categoria'));
  const correo = validar.correo(s('correo'));
  const telefono = validar.telefono(s('telefono'));
  const nota = validar.nota(s('nota') || 'no');
  if (!nombre || !organizacion || !categoria || !correo || !telefono || nota === null) return null;
  return { nombre, organizacion, categoria, correo, telefono, nota };
}

// ---- guion del chat ----
type Paso = { campo: Campo; pregunta: string; error: string };
const PASOS: Paso[] = [
  { campo: 'nombre', pregunta: '¿Cómo te llamas? Nombre y apellido.', error: 'No alcancé a leer tu nombre. ¿Me lo escribes de nuevo?' },
  { campo: 'organizacion', pregunta: '¿De qué organización eres y qué cargo tienes?', error: 'Necesito el nombre de tu organización y tu cargo, por ejemplo «Banco X, directora de riesgos».' },
  { campo: 'categoria', pregunta: '¿Qué categoría te interesa? Silicio, Platinum, Gold, Silver o Academic. Si aún no lo sabes, responde «no sé» y el equipo te orienta.', error: 'Elige una: Silicio, Platinum, Gold, Silver o Academic. O responde «no sé» y el equipo te orienta.' },
  { campo: 'correo', pregunta: '¿A qué correo te escribe el equipo?', error: 'Ese correo no parece válido. ¿Me lo escribes de nuevo?' },
  { campo: 'telefono', pregunta: '¿Y a qué número de WhatsApp te contactan? Con indicativo, por ejemplo +57 300 000 0000.', error: 'Ese número no parece válido. Escríbelo con indicativo, por ejemplo +57 300 000 0000.' },
  { campo: 'nota', pregunta: '¿Algo que quieras que la persona del equipo sepa antes de escribirte? Si no, responde «no».', error: 'Ese mensaje es muy largo. ¿Me lo resumes en una o dos frases?' },
];

export type EstadoLead = { paso: number; datos: Partial<Record<Campo, string>> };

const PASO_CONFIRMAR = PASOS.length;
const INTRO = 'Con gusto. Te hago unas preguntas breves, menos de dos minutos, y le paso tu solicitud a una persona del equipo comercial para que te contacte. ';
const CANCELAR = /\b(cancelar|cancela|salir|ya no|mejor no|no quiero)\b/;
const SI = /^(si|ok|dale|enviar|enviala|envialo|confirmo|claro|listo|de acuerdo|adelante)\b/;
const CORREGIR = /\b(corregir|cambiar|no|otra vez|empezar|de nuevo)\b/;

export const respuestaLead = (texto: string, sugerencias: string[] = []): Respuesta => ({ re: '', texto, acciones: [], sugerencias });

export const textoInicioLead = () => INTRO + PASOS[0].pregunta;
export const estadoInicialLead = (): EstadoLead => ({ paso: 0, datos: {} });
export function inicioLead(): Respuesta { return { ...respuestaLead(textoInicioLead()), flujo: 'lead' }; }

// ¿La persona dice que quiere ser aliado / hablar con un comercial? (la usan el servidor y el respaldo del cliente)
export const INTENCION_ALIADO = [
  /\b(quiero|quisiera|deseo|me gustaria|voy a|puedo)\b.{0,30}\b(reservar|apartar|inscribirme|unirme)\b.{0,40}\b(lugar|cupo|mesa|lista|aliado)\b/,
  /\b(quiero|quisiera|deseo|me gustaria|me interesa)\b.{0,30}\b(ser|hacerme|volverme|vincularme como)\b.{0,15}\baliado\b/,
  /\b(quiero|quisiera|necesito|me gustaria)\b.{0,30}\b(hablar|contactar|comunicarme)\b.{0,30}\b(comercial|asesor)\b/,
];
export const esIntencionAliado = (pregunta: string) => { const q = norm(pregunta); return INTENCION_ALIADO.some((r) => r.test(q)); };

const resumen = (d: Partial<Record<Campo, string>>) =>
  `Nombre: ${d.nombre}\nOrganización y cargo: ${d.organizacion}\nCategoría: ${d.categoria}\nCorreo: ${d.correo}\nWhatsApp: ${d.telefono}${d.nota ? `\nMensaje: ${d.nota}` : ''}`;

export async function enviarLead(datos: DatosLead, origen: 'eve' | 'formulario', extra: Record<string, unknown> = {}): Promise<boolean> {
  try {
    const r = await fetch('/api/eve/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...datos, origen, consentimiento: true, ...extra }) });
    return r.ok;
  } catch { return false; }
}

// Procesa lo que la persona escribió mientras el guion está activo. Devuelve null si en realidad hizo una pregunta (el chat la
// responde normalmente y la solicitud queda cancelada); si no, la respuesta de EVE y el estado siguiente (null = terminó).
export async function procesarLead(estado: EstadoLead, texto: string): Promise<{ respuesta: Respuesta; estado: EstadoLead | null } | null> {
  const q = norm(texto);
  if (CANCELAR.test(q)) return { respuesta: respuestaLead('Listo, no envío nada. Si cambias de idea, dime «quiero ser aliado» y retomamos.'), estado: null };
  if (texto.includes('?') || texto.includes('¿')) return null;

  if (estado.paso === PASO_CONFIRMAR) {
    if (SI.test(q)) {
      const datos = validarLead(estado.datos);
      const ok = datos ? await enviarLead(datos, 'eve') : false;
      if (ok) return { respuesta: respuestaLead(`Listo, ${estado.datos.nombre?.split(' ')[0]}. Ya le pasé tu solicitud al equipo comercial; una persona te escribirá lo antes posible al correo y al WhatsApp que me diste. Mientras tanto, ¿quieres conocer la agenda paralela?`, ['¿Qué incluye la agenda paralela?', '¿Qué recibe cada categoría?']), estado: null };
      return { respuesta: { re: '', texto: 'No pude enviar tu solicitud en este momento. Escríbenos directamente y la atendemos enseguida.', acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }], sugerencias: [] }, estado: null };
    }
    if (CORREGIR.test(q)) return { respuesta: respuestaLead('Sin problema, empecemos de nuevo. ' + PASOS[0].pregunta), estado: estadoInicialLead() };
    return { respuesta: respuestaLead('¿Envío tu solicitud? Responde «sí» para enviarla o «corregir» para empezar de nuevo.', ['Sí, enviar', 'Corregir mis datos']), estado };
  }

  const paso = PASOS[estado.paso];
  const valor = validar[paso.campo](texto);
  if (valor === null) return { respuesta: respuestaLead(paso.error), estado };
  const datos = { ...estado.datos, [paso.campo]: valor };
  const sig = estado.paso + 1;
  if (sig < PASOS.length) return { respuesta: respuestaLead(PASOS[sig].pregunta), estado: { paso: sig, datos } };
  return {
    respuesta: respuestaLead(`Esto es lo que voy a enviar:\n${resumen(datos)}\n\nAl confirmar, autorizas a Scenario Zero a usar estos datos para contactarte, según la política de tratamiento de datos (scenariozero.org/politica-de-datos). Enviar la solicitud no garantiza un cupo ni fija un precio. ¿La envío?`, ['Sí, enviar', 'Corregir mis datos']),
    estado: { paso: PASO_CONFIRMAR, datos },
  };
}
