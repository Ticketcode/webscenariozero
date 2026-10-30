// Agenda paralela: ÚNICA fuente del texto aprobado (addendum del 30 oct). La usan la página del evento, las respuestas de
// respaldo y el corpus de EVE, para que la página y EVE digan exactamente lo mismo. No se agregan ponentes, horarios ni contenido.
export const SESIONES = [
  { titulo: 'Keynote — El algoritmo contraataca', texto: 'IA, automatización y el nuevo campo de batalla de la ciberseguridad.' },
  { titulo: 'Stand Up Chat — Hackers vs. ciberdelincuentes', texto: 'Mismas herramientas, lados opuestos: la comunidad que descubre, explota y defiende.' },
  { titulo: 'Panel — El Próximo Zero Day', texto: 'Las tendencias que están redefiniendo la ciberseguridad.' },
];

export const TE_LLEVAS = 'Acceso a Evidence Floor (la tecnología de los aliados, en vivo) · espacio de networking con apoyo de IA para conectar con el ecosistema · alimentación · informe del ejercicio al día 30 · certificado de participación.';

// En una sola línea, para EVE (corpus y respuestas de respaldo).
export const SESIONES_TEXTO = SESIONES.map((s) => `${s.titulo}. ${s.texto}`).join(' ');
