import type { Metadata } from 'next';
import Link from 'next/link';
import Portada from '@/components/sz/Portada';
import { Shell } from '@/components/sz/Shell';
import PulseRuta from '@/components/sz/PulseRuta';
import { PORTADA, RUTA, SEO, TEXTOS } from '@/data/sz';

export const metadata: Metadata = { title: { absolute: SEO['/'][0] }, description: SEO['/'][1] };

export default function Home() {
  return (
    <Shell loader home>
      <Portada />
      {/* Bloque bajo el pliegue (modo exploración). */}
      <section className="sz-sec">
        <div className="sz-wrap">
          <h2 className="sz-h2">{PORTADA.bloque[0]} <span className="sz-acc">{PORTADA.bloque[1]}</span></h2>
          <div className="sz-cta-row">
            <Link href="/ecosistema" className="sz-btn sz-btn-primary">{TEXTOS.explorar}</Link>
          </div>
        </div>
      </section>
      <section className="sz-sec">
        <div className="sz-wrap">
          <p className="sz-ante">{RUTA.antetitulo}</p>
          <h2 className="sz-h2">{RUTA.titular}</h2>
          <PulseRuta hitos={RUTA.hitos.filter((h) => h.aprobado)} />
        </div>
      </section>
    </Shell>
  );
}
