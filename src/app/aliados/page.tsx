import type { Metadata } from 'next';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { ALIADOS as A, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/aliados'][0], description: SEO['/aliados'][1] };

// Sin precios: los valores llegan en la propuesta formal.
export default function Aliados() {
  return (
    <Shell>
      <PageHead antetitulo={A.antetitulo} titular={A.titular} bajada={A.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Qué recibe cada categoría</h2>
          <div className="sz-grid">
            {A.categorias.map((c) => (
              <article key={c.nombre} className="sz-card">
                <p className="sz-estado-tag">{c.cupos} cupos</p>
                <h3>{c.nombre}</h3>
                <p>{c.texto}</p>
                <p className="sz-cifras">{c.cifras}</p>
              </article>
            ))}
          </div>
          <p className="sz-nota"><strong>Academic.</strong> {A.academia}</p>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Cómo te vinculas</h2>
          <ol className="sz-lista">
            {A.pasos.map((p, i) => <li key={p}><b>{String(i + 1).padStart(2, '0')}</b><span>{p}</span></li>)}
          </ol>
          <p className="sz-nota">{A.nota}</p>
          <CtaRow />
          <p className="sz-nota" style={{ marginTop: 48 }}>{A.credencial}</p>
          <p className="sz-nota">{A.marca}</p>
        </div>
      </section>
    </Shell>
  );
}
