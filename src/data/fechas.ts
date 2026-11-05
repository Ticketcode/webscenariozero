// FECHA DEL EVENTO DE BOGOTÁ: única fuente de verdad. Cambia aquí (y en nada más) si la fecha vuelve a moverse.
// De ella salen los textos del sitio, el corpus de EVE y las fechas de la ruta (D+30, D+90, D+180 y el aniversario).
// Historial: 2026-11-12 -> 2026-11-19 (cambio comunicado el 2026-11-05).
export const FECHA_EVENTO = '2026-11-19';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// Se trabaja al mediodía UTC para que el cambio de huso horario nunca corra el día.
const fecha = (iso: string, dias = 0) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d;
};
const dd = (n: number) => String(n).padStart(2, '0');

/** 19.11.2026 */
export const cortaDe = (iso: string, dias = 0) => {
  const d = fecha(iso, dias);
  return `${dd(d.getUTCDate())}.${dd(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
};
/** 19.11 */
export const cortaDMDe = (iso: string) => cortaDe(iso).slice(0, 5);
/** 19 de noviembre */
export const diaDe = (iso: string) => {
  const d = fecha(iso);
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
};
/** 19 de noviembre de 2026 */
export const largaDe = (iso: string) => `${diaDe(iso)} de ${fecha(iso).getUTCFullYear()}`;

export const FECHAS = {
  iso: FECHA_EVENTO,
  corta: cortaDe(FECHA_EVENTO),
  cortaDM: cortaDMDe(FECHA_EVENTO),
  dia: diaDe(FECHA_EVENTO),
  larga: largaDe(FECHA_EVENTO),
  // Hitos de la ruta, contados desde el evento.
  d30: cortaDe(FECHA_EVENTO, 30),
  d90: cortaDe(FECHA_EVENTO, 90),
  d180: cortaDe(FECHA_EVENTO, 180),
  /** Un año después (D+365). */
  aniv: cortaDe(FECHA_EVENTO, 365),
} as const;
