import Link from 'next/link';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { AskProvider, HeroAsk } from '@/components/home/Ask';
import DatoScene from '@/components/home/DatoScene';
import HeroRing from '@/components/home/HeroRing';
import HomeHeader from '@/components/home/HomeHeader';
import LightLines from '@/components/home/LightLines';
import Loader from '@/components/home/Loader';
import MesaScene from '@/components/home/MesaScene';
import RutaScene from '@/components/home/RutaScene';
import { eventoActivo as ev, proximosEventos } from '@/data/events';
import { pilares, publicos, transversales, verbos } from '@/data/home';

export default function Home() {
  const evento = `/eventos/${ev.slug}`;
  const espera = `${evento}/lista-de-espera`;
  return (
    <AskProvider>
      <Loader />
      <HomeHeader esperaHref={espera} />
      <main id="inicio">
        <section className="hero" id="hero">
          <div className="wrap split">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-u">Ecosistema de confianza digital y tecnológica</p>
              <h1>
                <span className="line"><span>La confianza digital</span></span>
                <span className="line"><span>y tecnológica no se decreta.</span></span>
                <span className="line"><span className="acc">Se construye juntos.</span></span>
              </h1>
              <p className="bar-sub">Scenario Zero 2026-2030 · Primer evento en {ev.ciudad} · 12.11.2026</p>
              <HeroAsk />
            </div>
            <div className="hero-art" aria-hidden="true"><HeroRing /></div>
          </div>
        </section>

        <section className="sec cyan" id="oportunidad">
          <div className="wrap">
            <p className="eyebrow">La oportunidad</p>
            <Reveal className="flag" delay={200}><i /><i /><i /></Reveal>
            <Reveal as="p" className="opp">Colombia puede ser un país tecnológicamente confiable y ciberresiliente. Para lograrlo, el ecosistema tiene que moverse junto.</Reveal>
          </div>
        </section>

        <section className="sec" id="pregunta">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">La pregunta</p>
              <p className="tachado">Ya no es cómo evitamos que nos ataquen.</p>
              <h2>Es cómo garantizamos que Colombia pueda <span className="acc">resistir, detectar, responder, recuperarse y aprender.</span></h2>
            </Reveal>
            <div className="chips verbos">
              {verbos.map((v) => <span key={v} className="chip">{v.toUpperCase()}</span>)}
            </div>
            <Reveal as="p" className="muted lead">La confianza no se decreta. Se construye cuando Estado, empresas, academia y ciudadanos saben <strong>qué proteger, cómo actuar y con quién coordinarse.</strong></Reveal>
          </div>
        </section>

        <DatoScene />

        <section className="sec alt" id="que-es">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Qué es</p>
              <h2>La plataforma donde converge la agenda del ecosistema <span className="acc">2026-2030.</span></h2>
              <p className="muted lead">Una iniciativa privada con el respaldo de MinTIC que diagnostica, forma, ejercita, mide y conecta la oferta con la demanda.</p>
              <p className="lead"><strong>No es un evento. No es un simulacro.</strong> Es el epicentro donde se encuentran los programas, acciones y conocimiento de los próximos cuatro años del ecosistema.</p>
            </Reveal>
            <div className="chips verbos">
              {pilares.map((p, i) => <Reveal key={p} as="span" className="chip" delay={i * 60}>{p.toUpperCase()}</Reveal>)}
            </div>
          </div>
        </section>

        <section className="sec" id="programas">
          <div className="wrap">
            <p className="eyebrow">Seis transversales</p>
            <Reveal as="h2" className="h-wide">Seis frentes de trabajo, <span className="acc">con fechas.</span></Reveal>
            <div className="cards">
              {transversales.map((t, i) => (
                <Reveal as="article" key={t.name} className="card" delay={(i % 3) * 90}>
                  <div className="when">{t.when}</div>
                  <h3>{t.name}</h3>
                  <p className="muted">{t.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <RutaScene />
        <MesaScene anillos={ev.mesa.anillos} eyebrow={`Salón oval · ${ev.ciudad} 12.11.2026`} />

        <section className="sec alt" id="para-quien">
          <div className="wrap">
            <Reveal><p className="eyebrow">Para quién</p><h2>Cuando un sector cae, <span className="acc">arrastra a los demás.</span></h2></Reveal>
            <div className="cards">
              {publicos.map((p, i) => (
                <Reveal as="article" key={p.tag} className="card publico" delay={i * 90}>
                  <div className="when">{p.tag}</div>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.text}</p>
                  <Link className="btn btn-ghost" href={p.to === 'espera' ? espera : '#contacto'}>{p.cta}</Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="close" id="eventos">
          <LightLines />
          <div className="wrap">
            <p className="eyebrow">Eventos</p>
            <h2>Un ecosistema. <span className="acc">Muchos eventos en todo Colombia.</span></h2>
            <div className="cards eventos">
              <Link href={evento} className="card ev destacado">
                <div className="when">{ev.ciudad.toUpperCase()} · 12.11.2026</div>
                <h3>Lanzamiento del ecosistema, ejercicio nacional y salón oval.</h3>
                <p className="lnk">Ver evento →</p>
              </Link>
              {proximosEventos.map((p, i) => (
                <div key={i} className="card ev punteada">
                  <div className="when">{p.ciudad ?? '[Ciudad por anunciar]'}</div>
                  <p className="muted">Las próximas ciudades se anunciarán aquí.</p>
                </div>
              ))}
            </div>
            <div className="doors">
              <Link className="door primary" href={`${evento}#entradas`}>
                <span className="door-k">Para asistentes</span><strong>Quiero asistir →</strong><span>Boleta Silicio y agenda paralela.</span>
              </Link>
              <Link className="door" href={espera}>
                <span className="door-k">Para aliados</span><strong>Quiero ser aliado →</strong><span>Cupo en la mesa del salón oval, por lista de espera.</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AskProvider>
  );
}
