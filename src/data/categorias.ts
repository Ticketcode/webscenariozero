// Categorías de aliado: ÚNICA fuente de verdad de lo que recibe cada una (Anexo A, módulo Vincúlate). La usan la página
// /aliados y las respuestas de EVE. EVE nunca redacta estos datos: los toma de aquí. Sin precios (llegan en la propuesta formal).
export type Categoria = {
  id: 'silicio' | 'platinum' | 'gold' | 'silver' | 'academic';
  nombre: string;
  cupos: number | null;
  /** Qué rol tiene la categoría (texto del Anexo A, sin cambios). */
  rol: string;
  /** Lo que recibe, cada pieza tal cual está en el Anexo A. null en Academic (aportes en especie, sin lista). */
  recibe: { sillas: string; reuniones: string; boletas: string; presencia: string } | null;
};

export const CATEGORIAS: Categoria[] = [
  {
    id: 'silicio', nombre: 'Silicio', cupos: 2,
    rol: 'Diseñas el ejercicio y tienes voz: abres o cierras el ejercicio nacional. Eres aliado ancla de una transversal y eliges primero.',
    recibe: { sillas: '3 sillas en el ejercicio', reuniones: '12 reuniones 1 a 1 prioritarias', boletas: '10 boletas para tus clientes', presencia: 'presencia en Bogotá, Villavicencio y Medellín' },
  },
  {
    id: 'platinum', nombre: 'Platinum', cupos: 4,
    rol: 'Tienes voz en el desarrollo del ejercicio y eres aliado de una transversal.',
    recibe: { sillas: '2 sillas', reuniones: '8 reuniones 1 a 1', boletas: '6 boletas', presencia: 'presencia en Bogotá, Villavicencio y Medellín' },
  },
  {
    id: 'gold', nombre: 'Gold', cupos: 6,
    rol: 'Puedes ser convocado a la mesa de crisis.',
    recibe: { sillas: '2 sillas', reuniones: '4 reuniones 1 a 1', boletas: '4 boletas', presencia: 'presencia en Bogotá' },
  },
  {
    id: 'silver', nombre: 'Silver', cupos: 8,
    rol: 'La entrada al ecosistema desde el primer día.',
    recibe: { sillas: '1 silla', reuniones: '2 reuniones 1 a 1', boletas: '2 boletas', presencia: 'presencia en Bogotá' },
  },
  {
    id: 'academic', nombre: 'Academic', cupos: null,
    rol: 'Las universidades y centros de investigación se vinculan como aliados Academic, con aportes en especie.',
    recibe: null,
  },
];

export const lineaRecibe = (c: Categoria, sep = ' · ') => (c.recibe ? [c.recibe.sillas, c.recibe.reuniones, c.recibe.boletas, c.recibe.presencia].join(sep) : '');
