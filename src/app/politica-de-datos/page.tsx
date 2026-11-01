import type { Metadata } from 'next';
import { PageHead, Shell } from '@/components/sz/Shell';

export const metadata: Metadata = { title: 'Política de tratamiento de datos · Scenario Zero', description: 'Cómo Scenario Zero trata los datos personales que recibe por este sitio y por EVE.' };

// Texto provisional (30 oct 2026): pendiente de revisión legal antes de darse por definitivo.
export default function Politica() {
  return (
    <Shell>
      <PageHead titular="Política de tratamiento de datos personales" bajada="Versión provisional, pendiente de revisión legal." />
      <section className="sz-sec">
        <div className="sz-wrap politica">
          <h2>Responsable</h2>
          <p>Scenario Zero, iniciativa privada con el respaldo de MinTIC, liderada por la Fundación Social Colectivo con NIT: 900644463. Contacto: operaciones@scenariozero.org.</p>
          <h2>Qué datos recogemos</h2>
          <p>Los que nos das al conversar con EVE o al inscribirte en la lista de espera: nombre, organización y cargo, correo, WhatsApp, categoría de interés y el mensaje que quieras dejar. También las preguntas que escribes a EVE, para mejorar sus respuestas.</p>
          <h2>Para qué los usamos</h2>
          <p>Para que una persona del equipo comercial te contacte sobre tu inscripción, enviarte la propuesta formal, atender tus preguntas y mejorar las respuestas de EVE. No vendemos tus datos ni los usamos para fines distintos sin avisarte.</p>
          <h2>Con quién los compartimos</h2>
          <p>Con el equipo comercial y de operaciones de Scenario Zero y con los proveedores que nos prestan servicios técnicos (correo, alojamiento y automatización), bajo deber de confidencialidad.</p>
          <h2>Tus derechos</h2>
          <p>Conforme a la Ley 1581 de 2012, puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar tu autorización, escribiendo a operaciones@scenariozero.org. Responderemos dentro de los plazos legales.</p>
          <h2>Cuánto tiempo los conservamos</h2>
          <p>Mientras dure la relación comercial o el ecosistema 2026-2030 y el tiempo que exija la ley. Después los eliminamos o anonimizamos.</p>
          <h2>Autorización</h2>
          <p>Al marcar la casilla del formulario o confirmar el envío en EVE, autorizas el tratamiento descrito. Si no aceptas, no envíes la solicitud: puedes escribirnos por la página de contacto.</p>
        </div>
      </section>
    </Shell>
  );
}
