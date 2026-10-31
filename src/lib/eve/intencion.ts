import { ACCIONES, type RespuestaEve } from './schema';
import { esIntencionAliado, textoInicioLead } from './flujoLead';
import { AGENDA_PARALELA_TEXTO, RE_AGENDA_PARALELA } from '@/data/agenda';

// Cierre de la conversación: cuando la persona dice que quiere dar el paso (reservar como aliado o comprar su boleta), EVE responde
// con un texto fijo del corpus y SOLO el botón de ese paso. Es lo que cierran las sugerencias "Quiero reservar mi lugar como aliado" y
// "Quiero comprar mi boleta". Sin pasar por el modelo: es inmediato y no inventa nada.
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const BOLETA = /\b(quiero|quisiera|deseo|me gustaria|voy a)\b.{0,30}\b(comprar|adquirir|registrarme|inscribirme)\b.{0,40}\b(boleta|entrada|asistente|asistir)\b/;

export function responderIntencion(pregunta: string): RespuestaEve | null {
  const q = norm(pregunta);
  if (esIntencionAliado(pregunta)) {
    // EVE conduce la solicitud: pregunta lo mínimo y la pasa al equipo comercial (guion fijo en flujoLead.ts).
    return {
      texto: textoInicioLead(),
      acciones: [],
      flujo: 'lead',
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
