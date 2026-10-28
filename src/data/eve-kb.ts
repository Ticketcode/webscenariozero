// Base de conocimiento de EVE en la web: respuestas fijas con información oficial publicada en el sitio.
// En producción se reemplaza por un modelo con recuperación sobre este mismo contenido (fase C).
import { eventoActivo as ev } from './events';

export const IA_NOMBRE = 'EVE';

const ESPERA = `/eventos/${ev.slug}/lista-de-espera`;
const EVENTO = `/eventos/${ev.slug}`;

export type KbItem = { re: string; q: string; a: string; src: [string, string][]; cta: [string, string] | null };

export const KB: KbItem[] = [
  {
    re: 'precio|cu[aá]nto cuesta|costo|valor|tarifa|cu[aá]nto vale',
    q: '¿Cuánto cuesta?',
    a: 'Los cupos de la mesa se acuerdan directamente con el equipo, según el perfil de cada organización; no tengo un valor para darte ni puedo asegurar disponibilidad. El valor de la boleta se publicará en la página del evento cuando esté confirmado.',
    src: [['La mesa', '#mesa']],
    cta: ['Unirme a la lista de espera', ESPERA],
  },
  {
    re: 'cupo|mesa|aliad|patroc|lista de espera',
    q: '¿Cómo participo como aliado?',
    a: 'Los cupos de la mesa del salón oval se acuerdan directamente con el equipo. Se empieza en la lista de espera; inscribirte no garantiza un cupo ni fija un precio. Esta página no publica precios.',
    src: [['La mesa', '#mesa']],
    cta: ['Ir a la lista de espera', ESPERA],
  },
  {
    re: 'boleta|entrada|comprar|ticket|asistir|registr|agenda',
    q: '¿Cómo compro una boleta?',
    a: `La boleta Silicio da acceso a la agenda paralela del 12 de noviembre. Se compra en la página del evento con el formulario de Ticketcode; la venta está abierta desde el ${ev.ventaDesdeLarga}. No da acceso al salón oval.`,
    src: [['Eventos', '#eventos']],
    cta: ['Ir a entradas', `${EVENTO}#entradas`],
  },
  {
    re: 'cu[aá]ndo|d[oó]nde|lugar|hora|fecha|bogot|evento|ubicaci',
    q: '¿Cuándo y dónde es el evento en Bogotá?',
    a: 'El primer evento es en Bogotá el 12 de noviembre de 2026. El lugar es Américas BPS, calle 26, Bogotá, Colombia. El horario se publicará en la página del evento apenas esté confirmado.',
    src: [['Eventos', '#eventos']],
    cta: ['Ver el evento', EVENTO],
  },
  {
    re: 'ejercicio|ttx|simulacro|decisor|oval|crisis',
    q: '¿Qué es el ejercicio nacional?',
    a: 'Es el ejercicio nacional en el salón oval: 70 a 80 decisores públicos y privados atraviesan cuatro fases (Ambigüedad, Interdependencia, Confianza y continuidad, y Decisión). Los hallazgos agregados se entregan en un informe al D+30.',
    src: [['La mesa', '#mesa'], ['La ruta', '#ruta']],
    cta: null,
  },
  {
    re: 'ruta|2030|transversal|programa|academy|pyme|d\\+',
    q: '¿Cuál es la ruta del ecosistema?',
    a: 'Arranca el 12 de noviembre de 2026 con seis transversales: ejercicios nacionales a D+30; Pyme Cibersegura, Trust Academy e Índice y Observatorio a D+90; confianza ciudadana e IA confiable a D+180. El rumbo llega hasta 2030.',
    src: [['La ruta', '#ruta'], ['Transversales', '#programas']],
    cta: null,
  },
  {
    re: 'qu[eé] es|scenario|ecosistema|mintic|confianza',
    q: '¿Qué es Scenario Zero?',
    a: 'Scenario Zero es el ecosistema de confianza digital y tecnológica de Colombia, con el respaldo de MinTIC. Reúne a operadores de sectores críticos, proveedores, academia, sector público y pymes en una agenda 2026-2030.',
    src: [['La oportunidad', '#oportunidad'], ['El dato', '#dato']],
    cta: null,
  },
];

export const FALLBACK: KbItem = {
  re: '',
  q: '',
  a: 'Eso todavía no está en la información oficial publicada. Puedo conectarte con una persona del equipo para que te responda.',
  src: [],
  cta: ['Hablar con el equipo', '#contacto'],
};

export const CHIPS = [
  '¿Qué es Scenario Zero?',
  '¿Cuándo y dónde es el evento en Bogotá?',
  '¿Cómo compro una boleta?',
  '¿Cómo participo como aliado?',
  '¿Qué es el ejercicio nacional?',
];

export const PLACEHOLDERS = ['Pregunta lo que quieras saber', '¿Cuándo es el evento en Bogotá?', '¿Cómo compro una boleta?', '¿Cómo participo como aliado?', '¿Qué es el ejercicio nacional?'];

export function responder(texto: string): KbItem {
  const low = texto.toLowerCase();
  return KB.find((k) => new RegExp(k.re).test(low)) ?? FALLBACK;
}
