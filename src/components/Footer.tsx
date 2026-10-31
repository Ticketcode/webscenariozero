import Image from 'next/image';
export default function Footer({ variant = 'completo', fecha }: { variant?: 'completo' | 'espera'; fecha?: string }) {
  // La landing de lista de espera lleva un pie mínimo: sin correo ni política de datos.
  if (variant === 'espera') {
    return (
      <footer className="foot" id="contacto">
        <div className="wrap foot-min">
          <span>Scenario Zero {fecha}</span>
          <span>Con el respaldo de MinTIC <Image className="mintic-in" src="/brand/mintic-oficial.png" alt="MinTIC" width={300} height={584} /></span>
        </div>
      </footer>
    );
  }
  return (
    <footer className="foot" id="contacto">
      <div className="wrap">
        <div>
          <div className="brand">SCENARIO ZERO</div>
          <p className="dim">Ecosistema de confianza digital y tecnológica · Con el respaldo de MinTIC <Image className="mintic-in" src="/brand/mintic-oficial.png" alt="MinTIC" width={300} height={584} /></p>
        </div>
        <div className="foot-links">
          <a href="mailto:operaciones@scenariozero.org">operaciones@scenariozero.org</a>
          <a href="/politica-de-datos">Política de tratamiento de datos</a>
          <a href="/terminos-y-condiciones">Términos y condiciones</a>
        </div>
      </div>
    </footer>
  );
}
