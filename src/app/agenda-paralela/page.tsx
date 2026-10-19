import type { Metadata } from 'next';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { AGENDA as A, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/agenda-paralela'][0], description: SEO['/agenda-paralela'][1] };

export default function Agenda() {
  return (
    <Shell>
      <PageHead antetitulo={A.antetitulo} titular={A.titular} bajada={A.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <p className="sz-nota" style={{ marginTop: 0 }}>{A.aforo}</p>
          <h2 className="sz-h2" style={{ marginTop: 40 }}>Tu recorrido</h2>
          <ol className="sz-lista">
            {A.recorrido.map(([t, x], i) => <li key={t}><b>{String(i + 1).padStart(2, '0')}</b><span><strong>{t}:</strong> {x}</span></li>)}
          </ol>
          <p className="sz-precio">{A.precio}</p>
          <p className="sz-nota">{A.nota}</p>
          <CtaRow espera={false} boleta />
        </div>
      </section>
    </Shell>
  );
}
