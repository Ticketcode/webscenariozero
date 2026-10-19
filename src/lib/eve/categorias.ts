import { CATEGORIAS, type Categoria } from '@/data/categorias';
import { ACCIONES, type RespuestaEve } from './schema';

// Respuestas deterministas sobre las categorías de aliado: si la pregunta nombra una categoría y pide su detalle, su
// precio o una comparación, contesta la tabla de /src/data/categorias.ts SIN pasar por el modelo. Así lo que recibe cada
// categoría nunca se adorna ni se inventa, y la respuesta es inmediata y gratis.
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const DETALLE = /(que|cuanto|cuantas?|cuales)\s+(me\s+)?(recibe|recibo|incluye|incluyen|ofrece|trae|tiene|tienen|obtiene|obtengo|gana|gano|da|dan|son los beneficios)|beneficios?|incluye|sillas?|reuniones|boletas|en que consiste|ventajas|que (me )?(da|dan|ofrece)|como es (la )?categoria|que es (un )?(aliado )?(silicio|platinum|gold|silver|academic)/;
const PRECIO = /cuanto (cuesta|vale|sale|cobran|es el valor)|precio|valor|tarifa|costo|cuanto (hay que )?pagar/;
const COMPARA = /diferenc|compar|versus|\bvs\b|cual (me )?conviene|mejor|\bentre\b|frente a/;

function mencionadas(q: string): Categoria[] {
  return CATEGORIAS.filter((c) => new RegExp(`\\b${c.id}\\b`).test(q));
}

function describir(c: Categoria): string {
  if (!c.recibe) return `${c.rol}`;
  const r = c.recibe;
  // Una sola frase por dato para mantener las respuestas cortas: nombre y cupos, rol, y lo que recibe, unidos con signos de pausa.
  return `${c.nombre} (${c.cupos} cupos): ${c.rol.replace(/\.$/, '')}; recibes ${r.sillas}, ${r.reuniones}, ${r.boletas} y ${r.presencia}.`;
}

const ACCIONES_CAT = [
  { ...ACCIONES.reserva, principal: true },
  { ...ACCIONES.aliados, principal: false },
];

export function responderCategoria(pregunta: string): RespuestaEve | null {
  const q = norm(pregunta);
  const cats = mencionadas(q);
  if (!cats.length) return null;
  const precio = PRECIO.test(q);
  const detalle = DETALLE.test(q);
  const compara = COMPARA.test(q);
  const nota = precio ? ' Los valores llegan en tu propuesta formal.' : '';

  let texto: string;
  let sugerencias: string[];
  if (cats.length === 1) {
    if (!precio && !detalle) return null; // otra pregunta sobre la categoría (inscripción, etc.): la contesta el modelo
    const c = cats[0];
    texto = `${precio ? 'Los valores de cada categoría llegan en tu propuesta formal. ' : ''}${describir(c)}`.trim();
    const otra = CATEGORIAS.filter((x) => x.recibe && x.id !== c.id)[0];
    sugerencias = [`¿Cuál es la diferencia entre ${c.nombre} y ${otra.nombre}?`, '¿Cómo me vinculo?', '¿Puedo asistir sin ser aliado?'];
  } else {
    if (!compara && !detalle && !precio) return null;
    texto = `${cats.map(describir).join(' ')}${nota}`.trim();
    sugerencias = ['¿Cómo me vinculo?', '¿Qué es una transversal?', '¿Puedo asistir sin ser aliado?'];
  }

  return {
    texto,
    acciones: ACCIONES_CAT.map((a) => ({ ...a })),
    perfil: 'desconocido',
    componente: 'aliados',
    sugerencias,
    fuente: 'tabla',
  };
}
