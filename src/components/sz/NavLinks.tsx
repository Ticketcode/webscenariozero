'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Enlaces del menú: el de la sección donde está la persona se ilumina (también al navegar dentro de ella, por ejemplo /eventos/bogota).
export default function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const ruta = usePathname() ?? '/';
  return (
    <>
      {items.map((n) => {
        const activo = ruta === n.href || ruta.startsWith(n.href + '/');
        return <Link key={n.href} href={n.href} className={activo ? 'sz-activo' : undefined} aria-current={activo ? 'page' : undefined}>{n.label}</Link>;
      })}
    </>
  );
}
