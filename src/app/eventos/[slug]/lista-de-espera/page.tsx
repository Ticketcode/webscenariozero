import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import EveFlotante from '@/components/sz/EveFlotante';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Faq from '@/components/Faq';
import MesaResumen from '@/components/Mesa';
import TicketcodeEmbed from '@/components/TicketcodeEmbed';
import { eventos, listaEsperaFaq, pasosListaEspera } from '@/data/events';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(eventos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = eventos[(await params).slug];
  if (!e) return {};
  return {
    title: `Lista de espera · ${e.ciudad}`,
    description: `Inscríbete en la lista de espera para un cupo en la mesa del salón oval, ${e.ciudad}, ${e.fechaLarga}. No garantiza un cupo ni fija un precio.`,
  };
}

export default async function ListaEspera({ params }: Props) {
  const e = eventos[(await params).slug];
  if (!e) notFound();
  const estado = e.estadoListaEspera;
  const badge = { abierta: 'Lista de espera · Cupos limitados', llena: 'Lista de espera llena', cerrada: 'Lista de espera cerrada' }[estado];

  return (
    <>
      <Header logos />
      <main>
        <section className="hero espera">
          <div className="wrap">
            <div className="hero-copy">
              <p className="badge">{badge}</p>
              <h1>
                <span className="line"><span>Aparta tu</span></span>
                <span className="line"><span className="acc">lugar en la mesa.</span></span>
              </h1>
              <p className="bar-sub">{e.ciudad} · {e.fechaLarga}</p>
              <p className="lead muted">Veinte cupos para organizaciones que quieren decidir en la misma mesa donde se ejecuta el ejercicio nacional. Define cómo quieres verte y actuar dentro del primer ejercicio del ecosistema.</p>
              <ol className="pasos">
                {pasosListaEspera.map((p, i) => (
                  <Reveal as="li" key={p.n} delay={i * 120}><span className="n">{p.n}</span><div><h3>{p.title}</h3><p className="muted">{p.text}</p></div></Reveal>
                ))}
              </ol>
            </div>
            <aside className="form-card" aria-label="Formulario de lista de espera">
              <p className="eyebrow">Únete a la lista</p>
              <h2 className="h-sm">Déjanos los datos de tu organización</h2>
              {estado === 'abierta'
                ? <TicketcodeEmbed embed={e.ticketcode.listaEsperaEmbed} label={`lista de espera · ${e.ciudad}`} />
                : <div className="embed embed-empty"><p>{badge}. Escríbenos a [Correo de contacto].</p></div>}
              <p className="note">Inscribirte no garantiza un cupo ni fija un precio. Las condiciones se acuerdan con el equipo.</p>
            </aside>
          </div>
        </section>

        <section className="sec cyan" id="mesa">
          <div className="wrap">
            <Reveal><p className="eyebrow">La mesa</p><h2>34 posiciones numeradas. Cuatro distancias a la mesa.</h2></Reveal>
            <MesaResumen anillos={e.mesa.anillos} dark />
            <p className="lead">Esta página no publica precios: cada acuerdo se conversa directamente con el equipo.</p>
          </div>
        </section>

        <section className="sec">
          <div className="wrap narrow">
            <Reveal><p className="eyebrow">Preguntas frecuentes</p></Reveal>
            <Faq items={listaEsperaFaq} />
          </div>
        </section>
      </main>
      <Footer variant="espera" fecha="12.11.2026" />
      <EveFlotante />
    </>
  );
}
