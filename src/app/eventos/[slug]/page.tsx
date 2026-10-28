import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Countdown from '@/components/Countdown';
import Reveal from '@/components/Reveal';
import Faq from '@/components/Faq';
import MesaResumen from '@/components/Mesa';
import TicketcodeEmbed from '@/components/TicketcodeEmbed';
import EveFlotante from '@/components/sz/EveFlotante';
import QuitaPuerta from '@/components/sz/QuitaPuerta';
import { eventos, PENDIENTE } from '@/data/events';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(eventos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = eventos[(await params).slug];
  if (!e) return {};
  const title = `${e.ciudad} · ${e.fechaLarga}`;
  const description = `Scenario Zero abre el ecosistema el ${e.fechaLarga} en ${e.ciudad}: entradas, ejercicio nacional y salón oval.`;
  return { title, description, openGraph: { title, description, type: 'website' } };
}

export default async function EventoPage({ params }: Props) {
  const e = eventos[(await params).slug];
  if (!e) notFound();
  const espera = `/eventos/${e.slug}/lista-de-espera`;
  const abiertos = 20 - e.aliadosConfirmados.length;
  const boleta = {
    proximamente: `Venta desde el ${e.ventaDesdeLarga}`,
    venta_abierta: `Venta abierta desde el ${e.ventaDesdeLarga}`,
    agotada: 'Boletas agotadas',
  }[e.estadoBoleta];
  const ctaEspera = { abierta: 'Unirme a la lista de espera', llena: 'Lista de espera llena', cerrada: 'Lista de espera cerrada' }[e.estadoListaEspera];

  return (
    <>
      <Header
        links={[{ href: '#formas', label: 'Participar' }, { href: '#aliados', label: 'Aliados' }, { href: '#entradas', label: 'Entradas' }, { href: '#faq', label: 'Preguntas' }]}
        right={<a className="btn btn-sm" href="#entradas">Entradas</a>}
      />
      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-u">{e.ciudad} · 12.11.2026 · La apertura</p>
              <h1>
                <span className="line"><span>El 12 de noviembre</span></span>
                <span className="line"><span className="acc">se abre</span></span>
                <span className="line"><span>el ecosistema.</span></span>
              </h1>
              <p className="bar-sub">Lo que pase ese día en {e.ciudad} es una muestra de lo que haremos en todo Colombia, 2026-2030</p>
              <Countdown iso={e.inicioISO} />
              <div className="doors">
                <a className="door primary" href="#entradas">
                  <span className="door-k">Para asistentes</span>
                  <strong>Quiero asistir →</strong>
                  <span>Boleta Silicio y agenda paralela.</span>
                </a>
                <Link className="door" href={espera}>
                  <span className="door-k">Para aliados</span>
                  <strong>Quiero ser aliado →</strong>
                  <span>Cupo en la mesa del salón oval, por lista de espera.</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="sec datos">
          <div className="wrap cards">
            {[['Fecha', e.fechaLarga], ['Ciudad', e.ciudad], ['Lugar', e.lugar ?? PENDIENTE], ['Horario', e.horario ?? PENDIENTE]].map(([k, v], i) => (
              <Reveal key={k} className="card" delay={i * 80}>
                <div className="when">{k.toUpperCase()}</div>
                <h3>{v}</h3>
              </Reveal>
            ))}
          </div>
          {e.lugar && (<div className="wrap"><iframe className="mapa" title={`Mapa: ${e.lugar}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(e.lugar)}&output=embed`} /></div>)}
        </section>

        <section className="sec" id="hitos">
          <div className="wrap">
            <Reveal><p className="eyebrow">{e.ciudad} · 12.11.2026</p><h2>Un día. <span className="acc">Tres hitos.</span></h2></Reveal>
            <div className="cards">
              {e.hitos.map((h, i) => (
                <Reveal key={h.n} className="card" delay={i * 100}>
                  <div className="num">{h.n}</div>
                  <h3>{h.title}</h3>
                  <p className="muted">{h.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="sec alt" id="hangares">
          <div className="wrap">
            <Reveal><p className="eyebrow">Hangares</p><h2>Cuatro hangares. <span className="acc">Un solo ecosistema en marcha.</span></h2></Reveal>
            <div className="cards">
              {e.hangares.map((h, i) => (
                <Reveal key={h.id} className="card" delay={i * 80}>
                  <div className="when">{h.id}</div>
                  <h3>{h.title}</h3>
                  <p className="muted">{h.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="ejercicio">
          <div className="wrap">
            <Reveal><p className="eyebrow">Hangar 2 · El ejercicio nacional</p><h2>La primera muestra de lo que el ecosistema hará en todo el país.</h2></Reveal>
            <ol className="fases">
              {e.fases.map((f, i) => (
                <Reveal as="li" key={f.k} delay={i * 90}><span className="when">{String(i + 1).padStart(2, '0')} · {f.k.toUpperCase()}</span><p>{f.v}</p></Reveal>
              ))}
            </ol>
            <Reveal>
              <p className="eyebrow" style={{ marginTop: 40 }}>Ocho dimensiones de evaluación</p>
              <div className="chips">{e.dimensiones.map((d) => <span key={d} className="chip">{d}</span>)}</div>
              <p className="muted" style={{ marginTop: 24, maxWidth: 720 }}>70 a 80 decisores públicos y privados, con la participación de organismos internacionales. Hallazgos agregados al cierre e informe al D+30.</p>
            </Reveal>
          </div>
        </section>

        <section className="sec alt" id="formas">
          <div className="wrap">
            <Reveal><p className="eyebrow">Dos formas de participar</p><h2>Una agenda para quienes asisten. <span className="acc">Una mesa para los aliados.</span></h2></Reveal>
            <div className="formas">
              <Reveal className="forma">
                <div className="when">ASISTENTES</div><h3>Boleta Silicio</h3>
                <ul>
                  <li>Agenda paralela: agenda personalizada, reuniones uno a uno, plenarias, Evidence Floor - Experiencias, almuerzo por sector y Network.</li>
                  <li>Después: informe al D+30, certificado y prioridad en Trust Academy 2027.</li>
                  <li>Se compra aquí, en el formulario de Ticketcode del evento.</li>
                  <li>EVE te acompaña por WhatsApp y te conecta con personas afines.</li>
                </ul>
                <a className="btn" href="#entradas">Comprar mi boleta</a>
              </Reveal>
              <Reveal className="forma aliados" delay={120}>
                <div className="when">ALIADOS</div><h3>Cupo en la mesa</h3>
                <ul>
                  <li>Un lugar en el salón oval, el ejercicio nacional, en una de las 34 posiciones numeradas.</li>
                  <li>Cuatro distancias a la mesa: Silicio, Platinum, Gold y Silver, con 20 cupos en total.</li>
                  <li>Se acuerda directamente con el equipo; esta página no publica precios.</li>
                  <li>Se empieza en la lista de espera. Inscribirte no garantiza un cupo.</li>
                  <li>Tu logo aparece en esta página cuando confirmas.</li>
                </ul>
                <Link className="btn btn-ghost" href={espera}>Unirme a la lista de espera</Link>
              </Reveal>
            </div>
            <p className="note">La boleta no da acceso al salón oval. El salón oval es el ejercicio nacional, con 70 a 80 decisores.</p>
          </div>
        </section>

        <section className="sec" id="mesa">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Hangar 2 · Dónde se ubica cada aliado</p>
              <h2>La proximidad a la mesa es el producto.</h2>
              <p className="muted lead">34 posiciones numeradas en cuatro distancias. Los cupos de la mesa se acuerdan en una conversación con el equipo. Para empezar, únete a la lista de espera.</p>
            </Reveal>
            <MesaResumen anillos={e.mesa.anillos} />
            <Link className="btn" href={espera} style={{ marginTop: 32 }}>Unirme a la lista de espera →</Link>
          </div>
        </section>

        <section className="sec alt" id="aliados">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Aliados en {e.ciudad}</p>
              <h2>Las organizaciones que se sientan en la mesa.</h2>
              <p className="muted lead">Cada logo aparece aquí cuando el aliado confirma su cupo. {abiertos === 20 ? 'Hoy los 20 cupos están abiertos.' : `Hoy quedan ${abiertos} cupos abiertos.`}</p>
            </Reveal>
            {e.mesa.anillos.map((a) => {
              const conf = e.aliadosConfirmados.filter((x) => x.anillo === a.id);
              return (
                <div key={a.id} className="grupo">
                  <div className="when" style={{ color: a.color }}>{a.nombre.toUpperCase()} · {a.cupos} CUPOS</div>
                  <div className="logos">
                    {conf.map((x) => <div key={x.nombre} className="logo"><img src={x.logo} alt={x.nombre} /></div>)}
                    {Array.from({ length: a.cupos - conf.length }, (_, i) => <div key={i} className="logo vacio">[Logo]</div>)}
                  </div>
                </div>
              );
            })}
            <Link className="btn" href={espera} style={{ marginTop: 24 }}>{ctaEspera} →</Link>
            <p className="note">Los cupos se acuerdan con el equipo.</p>
          </div>
        </section>

        <section className="sec entradas" id="entradas">
          <div className="wrap entradas-grid">
            <div>
              <p className="eyebrow">Agenda paralela · Boleta Silicio</p>
              <h2>250–300 participantes. <span className="acc">Una sola boleta.</span></h2>
              <p className="chip-estado"><i aria-hidden /> {boleta}</p>
              <p className="lead muted">El 12.11: agenda personalizada, reuniones uno a uno, plenarias, Evidence Floor - Experiencias, almuerzo por sector y Network. Después: informe al D+30, certificado y prioridad en Trust Academy 2027.</p>
              <p className="muted">Se venden bloques corporativos. Un aliado puede patrocinar boletas para las pymes de su cadena. <strong>La boleta no da acceso al salón oval.</strong></p>
              <div className="eve"><strong>EVE</strong><p>Al completar tu registro, EVE, nuestra asistente de IA, te lo confirma por WhatsApp, te resuelve dudas de agenda, ubicación y accesos, y te conecta con personas afines a tu rol.</p></div>
              {e.estadoListaEspera === 'abierta' && (
                <p className="muted" style={{ marginTop: 24 }}>¿Quieres un lugar en el salón oval? Los cupos de la mesa se acuerdan con el equipo. <Link className="lnk" href={espera}>Unirme a la lista de espera →</Link></p>
              )}
            </div>
            <div className="form-card">
              {e.estadoBoleta === 'venta_abierta'
                ? <TicketcodeEmbed embed={e.ticketcode.boletaEmbed} label={`compra de boleta · ${e.ciudad}`} />
                : <div className="embed embed-empty"><p>{boleta}</p></div>}
            </div>
          </div>
        </section>

        <section className="sec" id="faq">
          <div className="wrap narrow">
            <Reveal><p className="eyebrow">Preguntas frecuentes</p></Reveal>
            <Faq items={e.faq} />
          </div>
        </section>

        <section className="sec cierre">
          <div className="wrap">
            <h2>Elige cómo <span className="acc">participar.</span></h2>
            <div className="doors">
              <a className="door primary" href="#entradas"><span className="door-k">Para asistentes</span><strong>Quiero asistir →</strong></a>
              <Link className="door" href={espera}><span className="door-k">Para aliados</span><strong>Quiero ser aliado →</strong></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EveFlotante />
      <QuitaPuerta />
    </>
  );
}
