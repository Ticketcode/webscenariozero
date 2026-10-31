// Agenda paralela: ÚNICA fuente del texto aprobado (addendum del 30 oct). La usan la página del evento, las respuestas de
// respaldo y el corpus de EVE, para que la página y EVE digan exactamente lo mismo. No se agregan ponentes, horarios ni contenido.
export const SESIONES = [
  { titulo: 'Keynote — El algoritmo contraataca', texto: 'IA, automatización y el nuevo campo de batalla de la ciberseguridad.' },
  { titulo: 'Stand Up Chat — Hackers vs. ciberdelincuentes', texto: 'Mismas herramientas, lados opuestos: la comunidad que descubre, explota y defiende.' },
  { titulo: 'Panel — El Próximo Zero Day', texto: 'Las tendencias que están redefiniendo la ciberseguridad.' },
];

export const TE_LLEVAS = 'Acceso a Evidence Floor (la tecnología de los aliados, en vivo) · espacio de networking con apoyo de IA para conectar con el ecosistema · alimentación · informe del Simulacro nacional de ciberseguridad al día 30 · certificado de participación.';

// En una sola línea, para EVE (corpus y respuestas de respaldo).
export const SESIONES_TEXTO = SESIONES.map((s) => `${s.titulo}. ${s.texto}`).join(' ');

// Qué es la agenda paralela: la misma respuesta en la página, en el servidor (sin modelo) y en el respaldo.
export const AGENDA_PARALELA_TEXTO = `La agenda paralela es la agenda académica del 12 de noviembre en Bogotá, que corre en paralelo al Simulacro nacional de ciberseguridad. Lo que vives ese día: ${SESIONES_TEXTO} Lo que te llevas: ${TE_LLEVAS}`;
export const RE_AGENDA_PARALELA = /\b(cual|que)\b.{0,12}\b(es|incluye|trae|hay en)\b.{0,20}\bagenda paralela\b|\bagenda paralela\b.{0,20}\b(que es|de que se trata|en que consiste)\b/;
