import type { Metadata, Viewport } from 'next';
import { Khand, Poppins } from 'next/font/google';
import JsFlag from '@/components/JsFlag';
import './globals.css';
import './home.css';
import './logos.css';

const khand = Khand({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-display', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--f-body', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Scenario Zero · Ecosistema de confianza digital y tecnológica', template: '%s · Scenario Zero' },
  description: 'El ecosistema de confianza digital y tecnológica de Colombia, 2026-2030, con el respaldo de MinTIC.',
};
export const viewport: Viewport = { themeColor: '#020418', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${khand.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')" }} />
      </head>
      <body>
        <JsFlag />
        {children}
      </body>
    </html>
  );
}
