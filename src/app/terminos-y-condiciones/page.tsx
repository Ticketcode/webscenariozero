import type { Metadata } from 'next';
import { PageHead, Shell } from '@/components/sz/Shell';

export const metadata: Metadata = { title: 'Términos y condiciones · Scenario Zero', description: 'Condiciones de uso del sitio de Scenario Zero y de EVE, su asistente.' };

// Texto provisional (31 oct 2026): pendiente de revisión legal antes de darse por definitivo.
export default function Terminos() {
  return (
    <Shell>
      <PageHead titular="Términos y condiciones" bajada="Versión provisional, pendiente de revisión legal." />
      <section className="sz-sec">
        <div className="sz-wrap politica">
          <h2>Quiénes somos</h2>
          <p>Scenario Zero es una iniciativa privada con el respaldo de MinTIC, liderada por la Fundación Social Colectivo con NIT: 900644463. Contacto: operaciones@scenariozero.org.</p>
          <h2>Uso del sitio</h2>
          <p>La información de este sitio es informativa y puede cambiar. Los cupos de aliado, los precios de cada categoría y las condiciones de participación se confirman por escrito en la propuesta formal, nunca por el sitio ni por EVE.</p>
          <h2>EVE, la asistente</h2>
          <p>EVE es una asistente de inteligencia artificial. Responde con la información publicada por Scenario Zero y, si no la tiene, te conecta con el equipo. Sus respuestas no son una oferta, una promesa ni un compromiso contractual.</p>
          <h2>Lista de espera y boletas</h2>
          <p>Inscribirte en la lista de espera de aliados no garantiza un cupo ni fija un precio. La boleta única de la agenda paralela se compra con el código del comercial que te contactó y no da acceso al Simulacro Nacional de Ciberresiliencia.</p>
          <h2>Marca y respaldo</h2>
          <p>Los aliados pueden decir «Somos aliados de Scenario Zero, una iniciativa con el respaldo de MinTIC». No pueden usar el logo de MinTIC ni sugerir que respalda su producto.</p>
          <h2>Datos personales</h2>
          <p>El tratamiento de tus datos se rige por la <a href="/politica-de-datos">política de tratamiento de datos</a>.</p>
        </div>
      </section>
    </Shell>
  );
}
