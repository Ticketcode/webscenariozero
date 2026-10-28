import type { Metadata } from 'next';
import { PageHead, Shell } from '@/components/sz/Shell';
import { CONTACTO as C, SEO } from '@/data/sz';

export const metadata: Metadata = { title: SEO['/contacto'][0], description: SEO['/contacto'][1] };

// Cada canal es un enlace directo: correo (mailto) y WhatsApp (wa.me).
const enlace = (v: string) => (v.includes('@') ? `mailto:${v}` : `https://wa.me/${v.replace(/\D/g, '')}`);
export default function Contacto() {
  return (
    <Shell>
      <PageHead titular={C.titular} bajada={C.bajada} />
      <section className="sz-sec">
        <div className="sz-wrap">
          <div className="sz-grid">
            {C.canales.map(([k, v]) => <article key={k} className="sz-card"><p className="sz-etq">{k}</p><h3><a href={enlace(v)} {...(v.includes('@') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{v}</a></h3></article>)}
          </div>
        </div>
      </section>
    </Shell>
  );
}
