// Registro mínimo de eventos de EVE. Todavía no guarda el texto de las conversaciones: eso requiere decidir dónde se
// almacenan (base de datos) y el consentimiento expreso. Por ahora solo salen métricas sin datos personales a los logs.
export type EventoEve = {
  fuente: 'modelo' | 'respaldo';
  sinRespuesta: boolean;
  bloqueada?: string;
  inyeccion?: boolean;
  ms: number;
  perfil?: string;
};

export function registrar(e: EventoEve) {
  console.info(JSON.stringify({ evento: 'eve_web', t: new Date().toISOString(), ...e }));
}
