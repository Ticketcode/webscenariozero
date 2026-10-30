// Un archivo de datos por evento. `null` = por confirmar: la página muestra el marcador, nunca un valor inventado.

export type Embed =
  | { kind: 'iframe'; src: string; minHeight?: number; title?: string }
  | { kind: 'script'; src: string; attrs?: Record<string, string>; minHeight?: number }
  | { kind: 'html'; html: string; minHeight?: number };

export type EstadoBoleta = 'proximamente' | 'venta_abierta' | 'agotada';
export type EstadoListaEspera = 'abierta' | 'llena' | 'cerrada';

export type Anillo = { id: 'silicio' | 'platinum' | 'gold' | 'silver'; nombre: string; sillas: number; cupos: number; color: string; ubicacion: string };

export type Aliado = { nombre: string; anillo: Anillo['id']; logo: string };

export type EventoData = {
  slug: string;
  ciudad: string;
  fecha: string;
  fechaLarga: string;
  inicioISO: string;
  lugar: string | null;
  horario: string | null;
  estadoBoleta: EstadoBoleta;
  ventaDesde: string;
  ventaDesdeLarga: string;
  estadoListaEspera: EstadoListaEspera;
  /** Si es false, la lista de espera no enlaza a la página del evento (aún no publicada). */
  paginaEventoPublicada: boolean;
  ticketcode: { boletaEmbed: Embed | null; listaEsperaEmbed: Embed | null };
  mesa: { anillos: Anillo[] };
  aliadosConfirmados: Aliado[];
  lugares: { total: number; incluidosEnCupos: number; entidadesPublicas: number; enVenta: number };
  hitos: { n: string; title: string; text: string }[];
  hangares: { id: string; title: string; text: string }[];
  fases: { k: string; v: string }[];
  dimensiones: string[];
  faq: { q: string; a: string }[];
};

export const bogota: EventoData = {
  slug: 'bogota',
  ciudad: 'Bogotá',
  fecha: '2026-11-12',
  fechaLarga: '12 de noviembre de 2026',
  // El evento arranca a las 8:00 a. m. (hora de Colombia).
  inicioISO: '2026-11-12T08:00:00-05:00',
  lugar: 'Américas BPS, calle 26, Bogotá, Colombia',
  horario: null,
  estadoBoleta: 'venta_abierta',
  ventaDesde: '2026-10-14',
  ventaDesdeLarga: '14 de octubre',
  estadoListaEspera: 'abierta',
  paginaEventoPublicada: false,
  // Pegar aquí los embeds de Ticketcode cuando estén listos.
  ticketcode: {
    boletaEmbed: null,
    listaEsperaEmbed: {
      kind: 'html',
      minHeight: 600,
      html: `<script src="https://code.jquery.com/jquery-1.10.2.min.js" integrity="sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<script src="https://www.ticketcode.co/assets/ticketcode/ticketcode-iframe.js"></script>
<iframe id="iframe_ticketcode" type="text/html" height="600" width="100%" src="https://www.ticketcode.co/iframe/scenario-zero-bogota-lista-de-espera" style="border:transparent" scrolling="no"></iframe>`,
    },
  },
  mesa: {
    anillos: [
      { id: 'silicio', nombre: 'Silicio', sillas: 6, cupos: 2, color: '#00C8FF', ubicacion: 'Mesa de crisis' },
      { id: 'platinum', nombre: 'Platinum', sillas: 8, cupos: 4, color: '#1E9FD0', ubicacion: 'Primer anillo' },
      { id: 'gold', nombre: 'Gold', sillas: 12, cupos: 6, color: '#3D8FC4', ubicacion: 'Segundo anillo' },
      { id: 'silver', nombre: 'Silver', sillas: 8, cupos: 8, color: '#6F8DB5', ubicacion: 'Tercer anillo' },
    ],
  },
  aliadosConfirmados: [],
  lugares: { total: 200, incluidosEnCupos: 84, entidadesPublicas: 30, enVenta: 86 },
  hitos: [
    { n: '01', title: 'MinTIC presenta el Plan de desarrollo TIC y ciberseguridad 2026-2030', text: 'La hoja de ruta del país, en la apertura.' },
    { n: '02', title: 'Se lanza Scenario Zero', text: 'Todos los actores del Ecosistema de Confianza Digital y Tecnológica en un solo lugar, compartiendo conocimiento y conectando voluntades.' },
    { n: '03', title: 'El ejercicio nacional TTX', text: '70 a 80 decisores públicos y privados ponen a prueba la coordinación del país.' },
  ],
  hangares: [
    { id: 'H1', title: 'Apertura, agenda paralela y cierre', text: '250–300 participantes en la agenda paralela, con boleta única.' },
    { id: 'H2', title: 'TTX en el salón oval', text: '70 a 80 decisores en 34 posiciones numeradas.' },
    { id: 'H3', title: 'Evidence Floor - Experiencias', text: 'Agenda propia por transversal.' },
    { id: 'H4', title: 'Network', text: 'Conexiones y matchmaking.' },
  ],
  fases: [
    { k: 'Ambigüedad', v: 'Algo pasa y nadie sabe qué.' },
    { k: 'Interdependencia', v: 'El daño se propaga.' },
    { k: 'Confianza y continuidad', v: 'Decidir con quién y a qué precio.' },
    { k: 'Decisión', v: 'La mesa decide como país.' },
  ],
  dimensiones: ['Gobernanza', 'Articulación', 'Calidad de la información', 'Continuidad', 'Narrativa pública', 'Riesgo reputacional', 'Cooperación', 'Trazabilidad'],
  faq: [
    { q: '¿Dónde y a qué hora es?', a: 'En Américas BPS, calle 26, Bogotá, Colombia. El horario se publicará aquí apenas esté confirmado.' },
    { q: '¿La boleta da acceso al salón oval?', a: 'No. La boleta da acceso a la agenda paralela. El salón oval es el ejercicio nacional, con 70 a 80 decisores.' },
    { q: '¿Cómo participo como aliado en la mesa?', a: 'Los cupos se acuerdan con el equipo. Inscríbete en la lista de espera y una persona te contacta.' },
    { q: '¿Me registro igual si soy aliado o invitado?', a: '[Por definir]' },
    { q: '¿Habrá eventos en otras ciudades?', a: 'Sí. Bogotá es el primero; el ecosistema tiene eventos en todo el país entre 2026 y 2030. Las próximas ciudades se anunciarán en esta página.' },
  ],
};

export const eventos: Record<string, EventoData> = { bogota };
export const eventoActivo = bogota;

// Ciudades sin confirmar: la landing global muestra la tarjeta punteada `[Ciudad por anunciar]`.
export const proximosEventos: { ciudad: string | null }[] = [{ ciudad: null }, { ciudad: null }];

export const listaEsperaFaq = [
  { q: '¿Cuánto cuesta un cupo?', a: 'Se acuerda directamente con el equipo, según el perfil de cada organización.' },
  { q: '¿Inscribirme garantiza un cupo?', a: 'No. La lista permite que el equipo te contacte; la confirmación se da tras la conversación y el acuerdo.' },
  { q: '¿Cuándo me contactan?', a: 'Antes del 16 de octubre.' },
  { q: '¿Qué datos piden?', a: 'Los de tu organización y un contacto. Se tratan según la política de datos personales.' },
];

export const pasosListaEspera = [
  { n: '1', title: 'Inscríbete en la lista', text: 'Completa el formulario con los datos de tu organización.' },
  { n: '2', title: 'Te contactamos', text: 'Una persona del equipo te escribe para conversar sobre tu perfil y las opciones en la mesa.' },
  { n: '3', title: 'Acordamos y formalizamos', text: 'Si hay acuerdo, el equipo te acompaña hasta confirmar tu cupo.' },
];

export const PENDIENTE = '[Por confirmar]';
