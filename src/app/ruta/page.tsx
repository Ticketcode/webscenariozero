import type { Metadata } from 'next';
import { CtaRow, PageHead, Shell } from '@/components/sz/Shell';
import PulseRuta from '@/components/sz/PulseRuta';
import { RUTA as R, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/ruta'][0], description: SEO['/ruta'][1] };

export default function Ruta() {
  // Los hitos sin aprobación de Alex no se publican.
  const hitos = R.hitos.filter((h) => h.aprobado);
  return (
    <Shell>
      <PageHead antetitulo={R.antetitulo} titular={R.titular} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <PulseRuta hitos={hitos} />
          <CtaRow boleta />
        </div>
      </section>
    </Shell>
  );
}
