// Contenido de la landing global.

export const transversales = [
  { when: 'D+30', name: 'Ejercicios nacionales y regionales', text: 'Programa permanente en todo el país. Primer informe al D+30.' },
  { when: 'D+90', name: 'Pyme Cibersegura', text: 'Autodiagnóstico, kit básico y certificado. En línea al D+90.' },
  { when: 'D+90', name: 'Trust Academy', text: 'Formación por rol. Cohorte de juntas al D+90.' },
  { when: 'D+90', name: 'Índice y Observatorio', text: 'Madurez del nivel 0 al 5. Línea base al D+90.' },
  { when: 'D+180', name: 'Confianza ciudadana', text: 'Pausa, verifica, confirma, actúa. Piloto al D+180.' },
  { when: 'D+180', name: 'IA confiable', text: 'Adopción segura de IA. Módulo al D+180.' },
];

export const ruta = [
  { when: '12.11.2026', title: 'Apertura del ecosistema', text: 'Arranca la agenda 2026-2030.' },
  { when: 'D+30', title: 'Primeros hallazgos', text: 'Informe del programa de ejercicios y plan de mejora.' },
  { when: 'D+90', title: 'Arrancan los programas', text: 'Cohorte de juntas, línea base del Índice y autodiagnóstico pyme.' },
  { when: 'D+180', title: 'Llega a la ciudadanía', text: 'Piloto de campaña ciudadana y módulo de IA confiable.' },
  { when: '12.11.2027', title: 'Año 1 de 4', text: 'Lo que entregó cada transversal, a la vista.' },
  { when: '2030', title: 'Colombia, el milagro digital y tecnológico', text: 'Un país tecnológicamente confiable y ciberresiliente.' },
];

// Posiciones (fracción del ancho de 1200) de cada hito sobre la línea de latido.
export const rutaX = [0.04, 0.22, 0.4, 0.58, 0.76, 0.95].map((f) => f * 1200);

export function rutaPath() {
  let d = 'M0 60';
  rutaX.forEach((x, i) => {
    d += ` L${x - 24} 60 L${x - 12} ${i % 2 ? 14 : 22} L${x} 104 L${x + 12} 60`;
  });
  return d + ' L1200 60';
}

export const pilares = ['Programas', 'Ejercicios', 'Formación', 'Medición', 'Conocimiento', 'Conexiones'];
export const verbos = ['Resistir', 'Detectar', 'Responder', 'Recuperarse', 'Aprender'];

export const publicos = [
  {
    tag: 'Operadores',
    title: 'La junta va a preguntar si la crisis se ensayó antes de que ocurriera.',
    text: 'Energía y agua, banca y fintech, salud, movilidad y logística, telecomunicaciones. El ecosistema muestra la evidencia: el sector ejercitado, el equipo entrenado y hallazgos agregados.',
    cta: 'Quiero un cupo en la mesa',
    to: 'espera',
  },
  {
    tag: 'Proveedores',
    title: 'Ser parte de la demanda del país, o enterarse después.',
    text: 'Acceso a operadores, juntas y sector público en los espacios y programas del ecosistema. Coautoría en publicaciones y formación en Trust Academy. Criterios abiertos, sin proveedor preferente.',
    cta: 'Quiero un cupo en la mesa',
    to: 'espera',
  },
  {
    tag: 'Academia y sector público',
    title: 'Conocimiento y política pública en la misma mesa.',
    text: 'La academia aporta evaluación y relatoría del ejercicio. Las entidades públicas participan por invitación.',
    cta: 'Hablar con el equipo',
    to: 'contacto',
  },
] as const;
