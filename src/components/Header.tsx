import Image from 'next/image';
import Link from 'next/link';

export default function Header({ links = [], right, logos = false }: { links?: { href: string; label: string }[]; right?: React.ReactNode; logos?: boolean }) {
  // Variante con logos: Scenario Zero a la izquierda y MinTIC a la derecha, en los extremos.
  if (logos) {
    return (
      <header className="top top-logos">
        <div className="wrap">
          <Link href="/" aria-label="Scenario Zero">
            <Image className="logo-sz" src="/brand/scenario-zero.png" alt="Scenario Zero" width={900} height={355} priority />
          </Link>
          <Image className="logo-mintic" src="/brand/mintic.png" alt="Con el respaldo de MinTIC" width={131} height={260} priority />
        </div>
      </header>
    );
  }
  return (
    <header className="top">
      <div className="wrap">
        <Link href="/" className="brand">SCENARIO ZERO</Link>
        <nav aria-label="Principal">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          {right}
        </nav>
      </div>
    </header>
  );
}
