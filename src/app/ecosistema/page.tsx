import type { Metadata } from 'next';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { ECOSISTEMA as E, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/ecosistema'][0], description: SEO['/ecosistema'][1] };

export default function Ecosistema() {
  return (
    <Shell>
      <PageHead antetitulo={E.antetitulo} titular={E.titular} bajada={E.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Qué es y qué no es</h2>
          <div className="sz-grid">
            {E.tarjetas.map(([no, es]) => (
              <article key={no} className="sz-card">
                <p className="sz-etq">No es</p>
                <p className="sz-no">{no}</p>
                <p className="sz-etq">Es</p>
                <p className="sz-es">{es}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Un relato en cuatro tiempos</h2>
          <ol className="sz-lista">
            {E.relato.map(([t, x], i) => <li key={t}><b>{String(i + 1).padStart(2, '0')}</b><span><strong>{t}.</strong> {x}</span></li>)}
          </ol>
          <p className="sz-cierre">{E.cierre}</p>
          <CtaRow boleta />
        </div>
      </section>
    </Shell>
  );
}
