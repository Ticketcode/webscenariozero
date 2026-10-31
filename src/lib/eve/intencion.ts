import { ACCIONES, type RespuestaEve } from './schema';
import { AGENDA_PARALELA_TEXTO, RE_AGENDA_PARALELA } from '@/data/agenda';

// Cierre de la conversación: cuando la persona dice que quiere dar el paso (reservar como aliado o comprar su boleta), EVE responde
// con un texto fijo del corpus y SOLO el botón de ese paso. Es lo que cierran las sugerencias "Quiero reservar mi lugar como aliado" y
// "Quiero comprar mi boleta". Sin pasar por el modelo: es inmediato y no inventa nada.
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const RESERVA = /\b(quiero|quisiera|deseo|me gustaria|voy a|puedo)\b.{0,30}\b(reservar|apartar|inscribirme|unirme)\b.{0,40}\b(lugar|cupo|mesa|lista|aliado)\b/;
const BOLETA = /\b(quiero|quisiera|deseo|me gustaria|voy a)\b.{0,30}\b(comprar|adquirir|registrarme|inscribirme)\b.{0,40}\b(boleta|entrada|asistente|asistir)\b/;

export function responderIntencion(pregunta: string): RespuestaEve | null {
  const q = norm(pregunta);
  if (RESERVA.test(q)) {
    return {
      texto: 'Te inscribes en la lista de la categoría que te interese, recibes la propuesta formal y tienes 5 días hábiles para decidir.',
      acciones: [{ ...ACCIONES.reserva, principal: true }],
      perfil: 'desconocido',
      componente: 'ninguno',
      sugerencias: [],
      fuente: 'tabla',
    };
  }
  if (RE_AGENDA_PARALELA.test(q)) {
    // Definición fija de la agenda paralela (misma fuente que la página): sin modelo, no inventa.
    return { texto: AGENDA_PARALELA_TEXTO, acciones: [{ ...ACCIONES.agenda, principal: true }, ACCIONES.boleta], perfil: 'asistente', componente: 'agenda', sugerencias: [], fuente: 'tabla' };
  }
  if (BOLETA.test(q)) {
    return {
      texto: 'La boleta única de la agenda paralela vale $3.000.000 COP e incluye agenda personalizada, alimentación, informe al D+30 y certificado. Se compra con el código del comercial que te contactó.',
      acciones: [{ ...ACCIONES.boleta, principal: true }],
      perfil: 'asistente',
      componente: 'ninguno',
      sugerencias: [],
      fuente: 'tabla',
    };
  }
  return null;
}
