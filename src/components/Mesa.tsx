import type { Anillo } from '@/data/events';

// Resumen estático de la mesa (el diagrama interactivo llega en la fase B). Sin precios.
export default function MesaResumen({ anillos, dark = false }: { anillos: Anillo[]; dark?: boolean }) {
  return (
    <div className={`anillos ${dark ? 'on-cyan' : ''}`}>
      {anillos.map((a) => (
        <div key={a.id} className="anillo" style={{ ['--c' as string]: a.color }}>
          <span className="dot" aria-hidden />
          <h3>{a.nombre.toUpperCase()}</h3>
          <p className="big-n">{a.cupos} <small>cupos</small></p>
          <p>{a.sillas} sillas · {a.ubicacion}</p>
        </div>
      ))}
    </div>
  );
}
