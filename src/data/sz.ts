// Sitio global (sombrilla) de Scenario Zero. Textos del Anexo A y corpus de EVE del Anexo B (requerimiento del 18 oct 2026).
// Regla: nada sale al sitio fuera de esta base. Las cifras solo se renderizan si su estado es 'verificada'.

export const RUTAS = {
  espera: '/eventos/bogota/lista-de-espera', // "Reserva tu lugar en la mesa"
  boleta: '/eventos/bogota#entradas', // "Compra tu boleta"
  bogota: '/eventos/bogota',
};

export const NAV = [
  { href: '/ecosistema', label: 'Ecosistema' },
  { href: '/panorama', label: 'Panorama' },
  { href: '/ruta', label: 'Ruta' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/aliados', label: 'Vincúlate' },
];

export const TEXTOS = {
  cta: 'RESERVA TU LUGAR EN LA MESA',
  ctaBoleta: 'COMPRA TU BOLETA',
  explorar: 'EXPLORAR EL ECOSISTEMA',
  whatsapp: 'Sigue la conversación por WhatsApp',
  pie1: 'Scenario Zero · Ecosistema de Confianza Digital y Tecnológica',
  pie2: 'Una iniciativa privada con el respaldo de MinTIC. 2026-2030.',
  pieEnlaces: ['Política de tratamiento de datos', 'Términos y condiciones', 'Prensa', 'Contacto'],
};

export const PORTADA = {
  antetitulo: 'ECOSISTEMA 2026-2030 · BOGOTÁ · VILLAVICENCIO · MEDELLÍN',
  titular: ['La confianza digital y tecnológica no se decreta.', 'Se construye juntos.'],
  bajada: 'Pregúntale a EVE lo que quieras saber del ecosistema: te responde corto y te muestra el camino.',
  estado: 'EVE · en línea',
  campo: 'Pregúntale a EVE sobre el ecosistema...',
  sugerencias: ['Soy operador de infraestructura crítica', 'Soy proveedor de tecnología', '¿Qué pasa el 12 de noviembre?', '¿Cómo me vinculo?'],
  bloque: ['El desafío del país es de coordinación.', 'Scenario Zero es donde converge el ecosistema.'],
};

export const ECOSISTEMA = {
  antetitulo: 'EL ECOSISTEMA',
  titular: 'El desafío del país es de coordinación.',
  bajada: 'Scenario Zero es donde converge el ecosistema: una iniciativa privada, financiada por el sector privado y con el respaldo de MinTIC, que entre 2026 y 2030 convierte la confianza digital en una capacidad de país.',
  tarjetas: [
    ['Un evento de ciberseguridad', 'Un ecosistema 2026-2030 que se lanza el 12 de noviembre'],
    ['Una iniciativa del Gobierno', 'Una iniciativa privada con el respaldo de MinTIC'],
    ['Una feria con stands', 'El lugar donde convergen programas, ejercicios y conocimiento'],
    ['Un patrocinio con logos', 'Una inversión con retorno medible en cuatro palancas'],
    ['Un simulacro aislado', 'Un programa permanente de ejercicios en todo el país'],
  ],
  relato: [
    ['El desafío', 'La transformación digital va más rápido que la coordinación entre quienes la hacen posible.'],
    ['La convicción', 'La confianza se construye entre Estado, empresas, academia y ciudadanía.'],
    ['La respuesta', 'Scenario Zero diagnostica, forma, ejercita, mide y conecta.'],
    ['La promesa', 'Capacidades verificables y una ruta que llega al territorio.'],
  ],
  cierre: '2026 es la puerta. Lo que sigue es el ecosistema.',
};

export const PANORAMA = {
  antetitulo: 'PANORAMA DEL ECOSISTEMA',
  titular: 'Seis transversales, cinco sectores críticos, un solo ecosistema.',
  bajada: 'Toca un eje para ver qué entrega y cuándo. Elige una palanca para ver dónde gana tu organización.',
  transversales: [
    ['1 · Ejercicios nacionales y regionales', 'Un programa permanente de ejercicios en todo el país. Primer entregable: el ejercicio nacional del 12 de noviembre y su informe al D+30.'],
    ['2 · Trust Academy', 'Formación por rol para juntas y equipos. Primer entregable: la Cohorte de juntas al D+90.'],
    ['3 · Índice y Observatorio', 'La madurez en confianza digital, medida de 0 a 5. Primer entregable: la línea base publicada al D+90.'],
    ['4 · Pyme Cibersegura', 'Una ruta para pequeñas y medianas empresas. Primer entregable: el autodiagnóstico en línea al D+90.'],
    ['5 · Confianza ciudadana', 'Pausa, verifica, confirma, actúa. Primer entregable: el piloto de campaña al D+180.'],
    ['6 · IA confiable', 'Adopción segura y responsable de la IA. Primer entregable: el módulo en Trust Academy al D+180.'],
  ],
  fase2: 'Fase 2 · horizonte 2027-2030: Trust Lab, cyber range, vouchers y fondo de innovación.',
  sectores: ['Eléctrico', 'Banca', 'Salud', 'Movilidad', 'Telecomunicaciones'],
  sectoresTexto: 'Cuando un sector cae, arrastra a los demás. Por eso el ejercicio nacional pone a los cinco en la misma mesa.',
  palancas: [
    ['Impacto', 'Las ciudades, los sectores críticos y las transversales donde aparece tu marca.'],
    ['Posicionamiento', 'Tu presencia por categoría, tu voz ante el país, tu transversal y tu credencial de aliado.'],
    ['Influencia', 'Tu posición en el ejercicio nacional, tus reuniones 1 a 1 y las boletas para tus clientes.'],
    ['Data', 'Informes, benchmark del Índice y fichas de valor, siempre agregados y anonimizados.'],
  ],
  ejercicio: {
    antetitulo: 'SCENARIO ZERO · EJERCICIO NACIONAL · 5 INFRAESTRUCTURAS CRÍTICAS',
    titular: 'Ensayar la crisis antes de que ocurra.',
    texto: 'Una crisis cibernética nacional que empieza con una anomalía pendiente de verificar y se propaga en cascada por el sector eléctrico, la banca, la salud, la movilidad y las telecomunicaciones. Participan 70–80 decisores públicos y privados. El ejercicio es ficticio y no interviene sistemas reales.',
    momentos: ['Ambigüedad', 'Interdependencia', 'Confianza y continuidad', 'Decisión'],
    dimensiones: 'Ocho dimensiones que se miden: gobernanza, articulación, calidad de la información, continuidad, narrativa pública, riesgo reputacional, cooperación y trazabilidad.',
    resultado: 'Hallazgos agregados al cierre, informe al D+30 y un programa permanente de ejercicios. Nunca un ranking de participantes.',
    integridad: 'Ningún aliado altera el escenario, los hallazgos ni el informe.',
  },
};

// Cifras: solo se muestran con estado 'verificada'. La URL de la fuente original está pendiente (no se inventa).
export type Cifra = { texto: string; fuente: string; url: string | null; estado: 'verificada' | 'pendiente' };
export const CIFRAS: Cifra[] = [
  { texto: 'Según MinTIC, en 2025 se gestionaron 697 incidentes de seguridad digital, y en los últimos dos años el fraude representó el 79,83 % de los incidentes.', fuente: 'MinTIC', url: null, estado: 'verificada' },
  { texto: 'El mercado de ciberseguridad en Colombia pasaría de cerca de USD 280 millones en 2024 a unos USD 1.102 millones en 2034, un crecimiento del 14,7 % anual.', fuente: 'ICEX España', url: null, estado: 'verificada' },
  { texto: 'Según IBM, en 2025 una filtración de datos en Latinoamérica costó en promedio USD 2,51 millones, y su ciclo de vida para identificarla y contenerla fue de 316 días.', fuente: 'IBM', url: null, estado: 'verificada' },
];

export const RUTA = {
  antetitulo: 'LA RUTA',
  titular: 'Del lanzamiento al D+365: un año con entregables fechados.',
  // Los tres primeros hitos los aprueba Alex antes de publicarlos: aprobado=false no se renderiza.
  hitos: [
    { fecha: 'Agosto 2026', titulo: 'Nace la idea', texto: 'Un ejercicio nacional de gestión de crisis cibernética.', aprobado: false },
    { fecha: 'Septiembre 2026', titulo: 'Nace la plataforma', texto: 'Scenario Zero se define como el lugar donde converge el ecosistema, con el respaldo de MinTIC.', aprobado: false },
    { fecha: '13 oct 2026', titulo: 'Presentación a los primeros aliados', texto: 'Operadores de infraestructura crítica y proveedores de tecnología conocen el ecosistema.', aprobado: false },
    { fecha: '12.11.2026', titulo: 'Apertura del ecosistema', texto: 'En Bogotá arranca la agenda 2026-2030: tres hitos en un día.', aprobado: true },
    { fecha: 'Antes de finalizar 2026', titulo: 'Ejercicios regionales', texto: 'Además de Bogotá: Villavicencio y Medellín.', aprobado: true },
    { fecha: 'D+30 · 12.12.2026', titulo: 'Primeros hallazgos', texto: 'Informe del programa de ejercicios y plan de mejora.', aprobado: true },
    { fecha: 'D+90 · 10.02.2027', titulo: 'Arrancan los programas', texto: 'Cohorte de juntas, línea base del Índice y autodiagnóstico pyme.', aprobado: true },
    { fecha: 'D+180 · 11.05.2027', titulo: 'Llega a la ciudadanía', texto: 'Piloto de campaña ciudadana y módulo de IA confiable.', aprobado: true },
    { fecha: 'D+365 · 12.11.2027', titulo: 'Un año de ecosistema', texto: 'Lo que entregó cada transversal, a la vista.', aprobado: true },
    { fecha: '2030', titulo: 'Rumbo país', texto: 'Colombia, el milagro digital y tecnológico. Después, LATAM.', aprobado: true },
  ],
};

export const EVENTOS = {
  antetitulo: 'EVENTOS 2026',
  titular: 'Un ecosistema, tres ciudades en 2026.',
  bajada: 'Cada evento abre el ecosistema en un territorio. Lo que pasa en cada ciudad queda en su historia.',
  fichas: [
    { ciudad: 'Bogotá', estado: 'Próximo', fecha: '12.11.2026 · Américas BPS', texto: 'Apertura del ecosistema. Un día, tres hitos.', href: RUTAS.bogota },
    { ciudad: 'Villavicencio', estado: 'Por anunciar', fecha: 'Antes de finalizar 2026', texto: 'Ejercicio regional del ecosistema. Te avisamos cuando haya fecha.', href: null },
    { ciudad: 'Medellín', estado: 'Por anunciar', fecha: 'Antes de finalizar 2026', texto: 'Ejercicio regional del ecosistema. Te avisamos cuando haya fecha.', href: null },
  ],
  bogota: {
    antetitulo: '12.11.2026 · LA APERTURA · AMÉRICAS BPS, BOGOTÁ',
    titular: 'Un día. Tres hitos.',
    hitos: [
      'MinTIC presenta el Plan de desarrollo TIC y ciberseguridad 2026-2030.',
      'Se lanza Scenario Zero - Ecosistema de Confianza Digital y Tecnológica.',
      'Scenario Zero - Ejercicio nacional: 5 infraestructuras críticas, con 70–80 decisores.',
    ],
  },
  cierre: 'El 12 de noviembre es el día en que Colombia empieza a desarrollar su confianza digital y tecnológica, y los primeros aliados la construyen desde adentro.',
};

export const AGENDA = {
  antetitulo: 'AGENDA PARALELA · BOGOTÁ · 12.11.2026',
  titular: 'Mientras el país ensaya, tú te conectas.',
  bajada: 'Una agenda académica de keynotes y talleres que corre en paralelo al ejercicio nacional, y después, experiencias y reuniones 1 a 1 con el ecosistema.',
  aforo: 'Aforo total esperado: 250–300 participantes en la agenda paralela.',
  recorrido: [
    ['Antes', 'tu agenda personalizada.'],
    ['Durante', 'agenda académica, Evidence Floor - Experiencias y networking con reuniones 1 a 1.'],
    ['Alimentación', 'incluida durante el día.'],
    ['Después', 'informe al D+30, certificado y directorio autorizado de participantes.'],
  ],
  precio: 'Boleta única: $3.000.000 COP.',
  nota: 'La boleta no da acceso al salón del ejercicio nacional. Se compra con el código del comercial que te contactó; si no lo tienes, pídeselo a EVE.',
};

export const ALIADOS = {
  antetitulo: 'LOS PRIMEROS ALIADOS',
  titular: 'Quien llega después, empieza sin historia.',
  bajada: 'Hay 20 cupos en cuatro categorías para vincular a tu organización en 2026. No compras un patrocinio de un día: tomas una posición con retorno en cuatro palancas.',
  categorias: [
    { nombre: 'Silicio', cupos: 2, texto: 'Diseñas el ejercicio y tienes voz: abres o cierras el ejercicio nacional. Eres aliado ancla de una transversal y eliges primero.', cifras: '3 sillas en el ejercicio · 12 reuniones 1 a 1 prioritarias · 10 boletas para tus clientes · presencia en Bogotá, Villavicencio y Medellín' },
    { nombre: 'Platinum', cupos: 4, texto: 'Tienes voz en el desarrollo del ejercicio y eres aliado de una transversal.', cifras: '2 sillas · 8 reuniones 1 a 1 · 6 boletas · presencia en Bogotá, Villavicencio y Medellín' },
    { nombre: 'Gold', cupos: 6, texto: 'Puedes ser convocado a la mesa de crisis.', cifras: '2 sillas · 4 reuniones 1 a 1 · 4 boletas · presencia en Bogotá' },
    { nombre: 'Silver', cupos: 8, texto: 'La entrada al ecosistema desde el primer día.', cifras: '1 silla · 2 reuniones 1 a 1 · 2 boletas · presencia en Bogotá' },
  ],
  academia: 'Las universidades y centros de investigación se vinculan como aliados Academic, con aportes en especie.',
  pasos: [
    'Te inscribes en la lista de tu categoría.',
    'Recibes la propuesta formal y tienes 5 días hábiles para decidir; tu posición queda reservada a tu nombre.',
    'Firmas la carta de intención y la ficha de aporte.',
    'Confirmas tu cupo con el anticipo y la firma de los términos y condiciones.',
  ],
  nota: 'Los valores llegan en tu propuesta formal.',
  credencial: 'Cada aliado recibe su credencial verificable por categoría, con vigencia 2026.',
  marca: 'Puedes decir "Somos aliados de Scenario Zero, una iniciativa con el respaldo de MinTIC". No uses el logo de MinTIC ni sugieras que respalda tu producto.',
};

export const CONTACTO = {
  titular: 'Hablemos.',
  bajada: 'EVE responde de inmediato. Si prefieres a una persona, escríbenos.',
  canales: [
    ['WhatsApp con EVE', '[número]'],
    ['Correo', '[correo de contacto]'],
    ['Prensa', '[correo de prensa]'],
  ],
};

export const SEO: Record<string, [string, string]> = {
  '/': ['Scenario Zero · Ecosistema de Confianza Digital y Tecnológica', 'La confianza digital y tecnológica no se decreta. Se construye juntos. Ecosistema 2026-2030 con el respaldo de MinTIC.'],
  '/ecosistema': ['Qué es Scenario Zero', 'Una iniciativa privada que diagnostica, forma, ejercita, mide y conecta la confianza digital del país.'],
  '/panorama': ['Panorama del ecosistema', 'Seis transversales, cinco sectores críticos y cuatro palancas de retorno.'],
  '/ruta': ['La ruta 2026-2030', 'Del lanzamiento del 12 de noviembre al D+365, con entregables fechados.'],
  '/eventos': ['Eventos 2026 · Bogotá, Villavicencio, Medellín', 'La apertura del ecosistema en Bogotá y los ejercicios regionales de 2026.'],
  '/agenda-paralela': ['Agenda paralela · 12.11.2026', 'Keynotes, talleres, experiencias y reuniones 1 a 1 en la apertura del ecosistema.'],
  '/aliados': ['Vincúlate como aliado', '20 cupos en cuatro categorías para construir el ecosistema desde adentro.'],
  '/contacto': ['Contacto', 'EVE responde de inmediato. Si prefieres a una persona, escríbenos.'],
};

// ---- EVE (respuestas fijas del corpus, Anexo B §7). Reemplazar por el modelo con recuperación cuando estén las credenciales. ----
export type Respuesta = { re: string; texto: string; acciones: { label: string; href: string; principal?: boolean }[] };

export const KB: Respuesta[] = [
  { re: 'cu[aá]nto cuesta ser aliado|precio.*(cupo|aliad)|valor.*(cupo|aliad)|cu[aá]nto.*(cupo|vincul)', texto: 'Los valores llegan en tu propuesta formal. Te muestro qué recibe cada categoría y te inscribes en la lista de la que te interese.', acciones: [{ label: TEXTOS.cta, href: RUTAS.espera, principal: true }, { label: 'Qué recibe cada categoría', href: '/aliados' }] },
  { re: 'c[oó]digo', texto: 'Te conecto con el equipo para que te asignen uno. Escríbenos por WhatsApp o por correo.', acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }] },
  { re: 'cu[aá]nto cuesta|cu[aá]nto vale|boleta.*(precio|valor|cuesta)|precio.*boleta', texto: 'La boleta única de la agenda paralela vale $3.000.000 COP e incluye agenda personalizada, alimentación, informe al D+30, certificado y directorio. Se compra con el código del comercial que te contactó.', acciones: [{ label: TEXTOS.ctaBoleta, href: RUTAS.boleta, principal: true }, { label: 'Ver la agenda paralela', href: '/agenda-paralela' }] },
  { re: 'hora|horario|a qu[eé] hora|empieza', texto: 'La agenda detallada llega a quienes tienen boleta. Te muestro cómo comprarla.', acciones: [{ label: TEXTOS.ctaBoleta, href: RUTAS.boleta, principal: true }] },
  { re: 'acceso|entrar.*ejercicio|boleta.*ejercicio|ejercicio.*boleta', texto: 'No. El ejercicio nacional es para sus 70–80 decisores y los aliados. La boleta te da la agenda paralela, las experiencias y las reuniones 1 a 1.', acciones: [{ label: TEXTOS.ctaBoleta, href: RUTAS.boleta, principal: true }, { label: 'Ver la agenda paralela', href: '/agenda-paralela' }] },
  { re: 'gobierno|mintic', texto: 'No. Es una iniciativa privada, financiada por el sector privado y con el respaldo de MinTIC.', acciones: [{ label: 'Qué es Scenario Zero', href: '/ecosistema', principal: true }] },
  { re: '12 de noviembre|12\\.11|bogot[aá]|qu[eé] pasa', texto: 'Es la apertura del ecosistema en Américas BPS, Bogotá: MinTIC presenta el Plan de desarrollo TIC y ciberseguridad 2026-2030, se lanza Scenario Zero y se realiza el ejercicio nacional con 70–80 decisores. ¿Quieres asistir a la agenda paralela?', acciones: [{ label: TEXTOS.ctaBoleta, href: RUTAS.boleta, principal: true }, { label: 'Ver la ficha de Bogotá', href: RUTAS.bogota }] },
  { re: 'villavicencio|medell[ií]n|otras ciudades', texto: 'Antes de finalizar 2026. Las fechas se anuncian aquí y por WhatsApp.', acciones: [{ label: 'Ver los eventos', href: '/eventos', principal: true }] },
  { re: 'emblema', texto: 'Es un reconocimiento que se gana, no se compra: Ensaya, Mide, Mejora. Certifica la práctica, no la seguridad, y lo otorga Scenario Zero.', acciones: [{ label: 'Explorar el panorama', href: '/panorama', principal: true }] },
  { re: 'c[oó]mo se paga|pago|anticipo|factur', texto: 'Con un anticipo del 50 % al confirmar y el saldo el 5 de noviembre; factura la Fundación Social Colectivo. Cualquier detalle adicional te lo confirma el comercial por escrito.', acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }] },
  { re: 'arrepient|reembols', texto: 'Queda establecido en los términos y condiciones que firmas al confirmar. Te conecto con el equipo.', acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }] },
  { re: 'qui[eé]nes m[aá]s|qui[eé]nes participan|participan', texto: 'Participan Gobierno, empresas, academia y organismos internacionales. Los nombres se anuncian cuando cada vinculación está confirmada.', acciones: [{ label: 'Ver el panorama', href: '/panorama', principal: true }] },
  { re: 'qu[eé] gana|retorno|roi', texto: 'Depende de tu perfil: te muestro qué recibe cada categoría. El retorno en dinero lo calculas con tus cifras en la reunión 1 a 1.', acciones: [{ label: 'Qué recibe cada categoría', href: '/aliados', principal: true }, { label: TEXTOS.cta, href: RUTAS.espera }] },
  { re: 'operador|infraestructura cr[ií]tica', texto: 'El regulador, la junta y tus clientes van a preguntar si la crisis se ensayó antes de que ocurriera. El ecosistema te da esa evidencia. Te abro el panorama: tu sector es una de las 5 infraestructuras críticas del ejercicio nacional.', acciones: [{ label: TEXTOS.cta, href: RUTAS.espera, principal: true }, { label: 'Ver el panorama', href: '/panorama' }] },
  { re: 'proveedor|tecnolog[ií]a|ciberseguridad.*(vendo|soluci)', texto: 'Entre 2026 y 2030 el país va a definir qué necesita en confianza digital y tecnológica. Estar adentro es conocerlo cuando se define.', acciones: [{ label: 'Qué recibe cada categoría', href: '/aliados', principal: true }, { label: TEXTOS.ctaBoleta, href: RUTAS.boleta }] },
  { re: 'vincul|aliad|cupo|mesa|lista', texto: 'Hay 20 cupos en cuatro categorías: Silicio, Platinum, Gold y Silver, y Academic para la academia. Te inscribes en la lista de tu categoría, recibes la propuesta formal y tienes 5 días hábiles para decidir.', acciones: [{ label: TEXTOS.cta, href: RUTAS.espera, principal: true }, { label: 'Qué recibe cada categoría', href: '/aliados' }] },
  { re: 'boleta|entrada|comprar|asistir', texto: 'La boleta única da acceso a la agenda paralela del 12 de noviembre en Bogotá. Se compra con el código del comercial que te contactó.', acciones: [{ label: TEXTOS.ctaBoleta, href: RUTAS.boleta, principal: true }] },
  { re: 'ejercicio|ttx|simulacro|decisor', texto: 'Es una crisis cibernética nacional que empieza con una anomalía pendiente de verificar y se propaga en cascada por cinco sectores. Participan 70–80 decisores. Los hallazgos son agregados y salen en un informe al D+30; nunca un ranking.', acciones: [{ label: 'Ver el panorama', href: '/panorama', principal: true }] },
  { re: 'ruta|2030|transversal|programa|academy|pyme', texto: 'Arranca el 12 de noviembre de 2026 con seis transversales y entregables fechados: D+30, D+90 y D+180. El rumbo llega a 2030 y después a LATAM.', acciones: [{ label: 'Ver la ruta', href: '/ruta', principal: true }] },
  { re: 'qu[eé] es|scenario|ecosistema', texto: 'Es el ecosistema de confianza digital y tecnológica de Colombia entre 2026 y 2030: una iniciativa privada con el respaldo de MinTIC que diagnostica, forma, ejercita, mide y conecta. El desafío del país es de coordinación, y aquí converge el ecosistema. Te abro el panorama.', acciones: [{ label: 'Explorar el panorama', href: '/panorama', principal: true }] },
];

export const SIN_RESPUESTA: Respuesta = {
  re: '',
  texto: 'Todavía no tengo esa respuesta. Te conecto con el equipo para que te la den por escrito.',
  acciones: [{ label: 'Hablar con el equipo', href: '/contacto', principal: true }],
};

export function responder(pregunta: string): Respuesta {
  const q = pregunta.toLowerCase();
  return KB.find((k) => new RegExp(k.re).test(q)) ?? SIN_RESPUESTA;
}
