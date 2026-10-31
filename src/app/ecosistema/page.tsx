import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { AnilloTransversales, ColumnasPalancas, RedSectores } from '@/components/sz/GraficosEcosistema';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import { CIFRAS, CIFRA_APERTURA, ECOSISTEMA as E, PANORAMA as P, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/ecosistema'][0], description: SEO['/ecosistema'][1] };

export default function Ecosistema() {
  const ej = P.ejercicio;
  // Una cifra sin estado "verificada" no se renderiza.
  const cifras = CIFRAS.filter((c) => c.estado === 'verificada');
  return (
    <Shell>
      <PageHead antetitulo={E.antetitulo} titular={E.titular} bajada={E.bajada} />
      <section className="sz-sec sz-claro">
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
      {/* Panorama (antes /panorama, fusionado aquí): contexto de amenaza que justifica el ecosistema. Las cifras van en bloque claro institucional. */}
      <div id="panorama" className="sz-ancla">
        <section className="sz-sec sz-claro">
          <div className="sz-wrap">
            <p className="sz-ante">{P.antetitulo}</p>
            <h2 className="sz-h2 sz-apertura">{CIFRA_APERTURA.texto}</h2>
            <p className="sz-fuente">Fuente: {CIFRA_APERTURA.fuente}</p>
            <div className="sz-grid" style={{ marginTop: 40 }}>
              {cifras.map((c, i) => (
                <Reveal as="article" key={c.texto} className="sz-card" delay={i * 90}>
                  <p>{c.texto}</p>
                  <p className="sz-fuente">Fuente: {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.fuente}</a> : c.fuente}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="sz-sec">
          <div className="sz-wrap">
            <h2 className="sz-h2">Las seis transversales</h2>
            <p className="sz-lead">{P.bajada}</p>
            <AnilloTransversales items={P.transversales} />
            <p className="sz-nota">{P.fase2}</p>
          </div>
        </section>
        <section className="sz-sec">
          <div className="sz-wrap">
            <h2 className="sz-h2">Cinco sectores críticos</h2>
            <RedSectores items={P.sectores} nota={P.sectoresTexto} />
          </div>
        </section>
        <section className="sz-sec">
          <div className="sz-wrap">
            <h2 className="sz-h2">Cuatro palancas: dónde gana tu organización</h2>
            <ColumnasPalancas items={P.palancas} />
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
      </div>
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
