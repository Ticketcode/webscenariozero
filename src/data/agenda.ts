import { FECHAS } from './fechas';

// Agenda paralela: ÚNICA fuente del texto aprobado (addendum del 30 oct). La usan la página del evento, las respuestas de
// respaldo y el corpus de EVE, para que la página y EVE digan exactamente lo mismo. No se agregan ponentes, horarios ni contenido.
export const SESIONES = [
  { titulo: 'Keynote — El algoritmo contraataca', texto: 'IA, automatización y el nuevo campo de batalla de la ciberseguridad.' },
  { titulo: 'Stand Up Chat — Hackers vs. ciberdelincuentes', texto: 'Mismas herramientas, lados opuestos: la comunidad que descubre, explota y defiende.' },
  { titulo: 'Panel — El Próximo Zero Day', texto: 'Las tendencias que están redefiniendo la ciberseguridad.' },
];

export const TE_LLEVAS = 'Acceso a Evidence Floor (la tecnología de los aliados, en vivo) · espacio de networking con apoyo de IA para conectar con el ecosistema · alimentación · informe del Simulacro Nacional de Ciberresiliencia al día 30 · certificado de participación.';

// En una sola línea, para EVE (corpus y respuestas de respaldo).
export const SESIONES_TEXTO = SESIONES.map((s) => `${s.titulo}. ${s.texto}`).join(' ');

// Qué es la agenda paralela: la misma respuesta en la página, en el servidor (sin modelo) y en el respaldo.
export const AGENDA_PARALELA_TEXTO = `La agenda paralela es la agenda académica del ${FECHAS.dia} en Bogotá, que corre en paralelo al Simulacro Nacional de Ciberresiliencia. Lo que vives ese día: ${SESIONES_TEXTO} Lo que te llevas: ${TE_LLEVAS}`;
export const RE_AGENDA_PARALELA = /\b(cual|que)\b.{0,12}\b(es|incluye|trae|hay en)\b.{0,20}\bagenda paralela\b|\bagenda paralela\b.{0,20}\b(que es|de que se trata|en que consiste)\b/;

// ---- El día del evento en Bogotá: ÚNICA fuente de los tres acontecimientos, los nombres y los sectores (texto aprobado el 2 nov).
// La usan la página de Bogotá, la landing global, las respuestas de respaldo y el corpus de EVE.
export const SIMULACRO = 'Simulacro Nacional de Ciberresiliencia';
export const PLAN = 'Plan de Desarrollo Digital y Ciberseguridad de Colombia 2026–2030';
export const SECTORES = ['Energía', 'Transporte', 'Salud', 'Agua y saneamiento', 'Sector financiero'];
export const SECTORES_TEXTO = 'energía, transporte, salud, agua y saneamiento, y sector financiero';

export const APERTURA = {
  titular: 'Colombia se reúne alrededor de la confianza digital y tecnológica',
  intro: `El próximo ${FECHAS.dia}, Colombia reunirá a los principales actores del ecosistema digital y tecnológico con un propósito común: fortalecer la capacidad del país para anticipar, enfrentar y superar las amenazas cibernéticas, articulando al Gobierno, las infraestructuras críticas y el sector privado en una agenda de colaboración y acción colectiva.`,
  hitos: [
    {
      n: '01',
      titulo: 'Presentación de la hoja de ruta digital de Colombia 2026–2030',
      resumen: 'El Ministerio TIC presenta la hoja de ruta digital de Colombia 2026–2030.',
      texto: `El Ministerio TIC presentará la hoja de ruta del ${PLAN}, que orientará las prioridades nacionales en transformación digital, ciberseguridad y confianza tecnológica.`,
    },
    {
      n: '02',
      titulo: SIMULACRO,
      resumen: `${SIMULACRO} con cinco infraestructuras críticas: ${SECTORES_TEXTO}.`,
      texto: `Se pondrá a prueba la capacidad de respuesta, coordinación y toma de decisiones frente a un ciberataque, con la participación de representantes de cinco infraestructuras críticas del país: ${SECTORES_TEXTO}.`,
    },
    {
      n: '03',
      titulo: 'Lanzamiento de Scenario Zero',
      resumen: 'Lanzamiento de Scenario Zero, el ecosistema de colaboración de Colombia.',
      texto: 'Un ecosistema de colaboración que conecta al Gobierno, las infraestructuras críticas, el sector privado, organismos multilaterales, academia, gremios y expertos para impulsar alianzas, compartir capacidades y construir respuestas conjuntas frente a los desafíos de la seguridad y la confianza digital.',
    },
  ],
  cierre: 'Más que un evento, es un punto de partida para conectar la visión de país, poner a prueba nuestras capacidades y construir las alianzas necesarias para fortalecer la ciberresiliencia de Colombia.',
  invitacion: 'Te invitamos a ser parte de la agenda académica y a vincularte a Scenario Zero Bogotá, un espacio de encuentro, conocimiento y colaboración para contribuir a un país digitalmente más seguro, preparado y confiable.',
};

// En una sola línea, para EVE (corpus y respuestas de respaldo).
export const APERTURA_TEXTO = `El ${FECHAS.dia} se dan tres acontecimientos: ${APERTURA.hitos.map((h) => `${h.titulo}: ${h.texto}`).join(' ')}`;
