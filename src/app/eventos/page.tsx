import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { EVENTOS as E, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/eventos'][0], description: SEO['/eventos'][1] };

export default function Eventos() {
  return (
    <Shell>
      <PageHead antetitulo={E.antetitulo} titular={E.titular} bajada={E.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <div className="sz-grid">
            {E.fichas.map((f) => (
              <article key={f.ciudad} className="sz-card">
                <p className="sz-estado-tag">{f.estado}</p>
                <h3>{f.ciudad}</h3>
                <p className="sz-etq" style={{ margin: '8px 0' }}>{f.fecha}</p>
                <p>{f.texto}</p>
                {f.href && <Link href={f.href} className="sz-btn sz-btn-ghost" style={{ marginTop: 20 }}>Ver la ficha</Link>}
              </article>
            ))}
          </div>
          <div style={{ marginTop: 72 }}>
            <p className="sz-ante">{E.bogota.antetitulo}</p>
            <h2 className="sz-h2">{E.bogota.titular}</h2>
            <ol className="sz-lista">
              {E.bogota.hitos.map((h, i) => <li key={h}><b>{String(i + 1).padStart(2, '0')}</b><span>{h}</span></li>)}
            </ol>
            <p className="sz-cierre">{E.cierre}</p>
            <CtaRow boleta />
          </div>
        </div>
      </section>
    </Shell>
  );
}
