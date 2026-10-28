import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Loader from '@/components/home/Loader';
import QuitaPuerta from './QuitaPuerta';
import EveFlotante from './EveFlotante';
import { NAV, RUTAS, TEXTOS } from '@/data/sz';

// Estructura común del sitio global: cabecera, contenido, franja institucional y pie.
// El sello "Con el respaldo de MinTIC" va en su propia franja, nunca junto a aliados.
export function Shell({ children, loader = false, home = false }: { children: ReactNode; loader?: boolean; home?: boolean }) {
  return (
    <div className={home ? "sz sz-home" : "sz"}>
      {loader && <Loader />}
      {!home && <QuitaPuerta />}
      <header className="sz-top">
        <div className="sz-wrap sz-top-in">
          <Link href="/" className="sz-logo" aria-label="Scenario Zero, inicio">
            <Image src="/brand/scenario-zero-horizontal.png" alt="Scenario Zero" width={900} height={435} priority />
          </Link>
          <nav className="sz-nav" aria-label="Principal">
            {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          </nav>
          <Link href="/ecosistema" className="sz-btn sz-btn-ghost sz-explorar">{TEXTOS.explorar}</Link>
        </div>
        <details className="sz-menu">
          <summary>Menú</summary>
          <div>{NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
        </details>
      </header>
      <main id="contenido">{children}</main>
      <Sello />
      <footer className="sz-foot">
        <div className="sz-wrap">
          <p className="sz-foot-1">{TEXTOS.pie1}</p>
          <p className="sz-foot-2">{TEXTOS.pie2}</p>
          <p className="sz-foot-links">
            <Link href="/contacto">{TEXTOS.pieEnlaces[0]}</Link>
            <Link href="/contacto">{TEXTOS.pieEnlaces[1]}</Link>
            <Link href="/contacto">{TEXTOS.pieEnlaces[2]}</Link>
            <Link href="/contacto">{TEXTOS.pieEnlaces[3]}</Link>
          </p>
        </div>
      </footer>
      <EveFlotante />
    </div>
  );
}

export function Sello() {
  return (
    <div className="sz-sello">
      <div className="sz-wrap sz-sello-in">
        <div className="sz-sello-l">
          <span>CON EL<br />RESPALDO DE</span>
          <Image src="/brand/mintic-oficial.png" alt="MinTIC" width={300} height={584} />
        </div>
        <span className="sz-sello-url">SCENARIOZERO.ORG</span>
      </div>
    </div>
  );
}

export function PageHead({ antetitulo, titular, bajada }: { antetitulo?: string; titular: string; bajada?: string }) {
  return (
    <section className="sz-sec sz-pagehead">
      <div className="sz-wrap">
        {antetitulo && <p className="sz-ante">{antetitulo}</p>}
        <h1 className="sz-h1">{titular}</h1>
        {bajada && <p className="sz-lead">{bajada}</p>}
      </div>
    </section>
  );
}

export function CtaRow({ espera = true, boleta = false }: { espera?: boolean; boleta?: boolean }) {
  return (
    <div className="sz-cta-row">
      {espera && <Link href={RUTAS.espera} className="sz-btn sz-btn-primary">{TEXTOS.cta}</Link>}
      {boleta && <Link href={RUTAS.boleta} className="sz-btn sz-btn-ghost">{TEXTOS.ctaBoleta}</Link>}
    </div>
  );
}
