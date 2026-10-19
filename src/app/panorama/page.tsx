import type { Metadata } from 'next';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { CIFRAS, PANORAMA as P, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/panorama'][0], description: SEO['/panorama'][1] };

export default function Panorama() {
  const ej = P.ejercicio;
  // Una cifra sin estado "verificada" no se renderiza.
  const cifras = CIFRAS.filter((c) => c.estado === 'verificada');
  return (
    <Shell>
      <PageHead antetitulo={P.antetitulo} titular={P.titular} bajada={P.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Las seis transversales</h2>
          <div className="sz-grid">
            {P.transversales.map(([t, x]) => <article key={t} className="sz-card"><h3>{t}</h3><p>{x}</p></article>)}
          </div>
          <p className="sz-nota">{P.fase2}</p>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Cinco sectores críticos</h2>
          <div className="sz-pills">{P.sectores.map((s) => <span key={s} className="sz-pill">{s}</span>)}</div>
          <p className="sz-nota">{P.sectoresTexto}</p>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Cuatro palancas: dónde gana tu organización</h2>
          <div className="sz-grid">
            {P.palancas.map(([t, x]) => <article key={t} className="sz-card"><h3>{t}</h3><p>{x}</p></article>)}
          </div>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <p className="sz-ante">{ej.antetitulo}</p>
          <h2 className="sz-h2">{ej.titular}</h2>
          <p className="sz-lead">{ej.texto}</p>
          <div className="sz-pills">{ej.momentos.map((m, i) => <span key={m} className="sz-pill">{i + 1} · {m}</span>)}</div>
          <p className="sz-nota">{ej.dimensiones}</p>
          <p className="sz-nota">{ej.resultado}</p>
          <p className="sz-nota">{ej.integridad}</p>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">Cifras del panorama</h2>
          <div className="sz-grid">
            {cifras.map((c) => (
              <article key={c.fuente} className="sz-card">
                <p>{c.texto}</p>
                <p className="sz-fuente">Fuente: {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.fuente}</a> : c.fuente}</p>
              </article>
            ))}
          </div>
          <CtaRow boleta />
        </div>
      </section>
    </Shell>
  );
}
