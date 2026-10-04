import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Intro } from '@/components/Intro';
import { Motion } from '@/components/Motion';
import { Providers } from '@/components/Providers';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-jakarta', display: 'swap' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  title: 'Avalanche Coffee — Café-style coffee, made at home',
  description: 'Rich, creamy café-style instant coffee in single-serve sachets. Made in New Zealand.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='M:\Avalance Coffee\app\favicon.ico' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛰️</text></svg>",
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

/* Play the opening sequence on each refresh, while still respecting reduced-motion preferences. */
const INIT = `(()=>{const root=document.documentElement;const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!reduced){root.classList.add("anim");}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-f="caramel" className={`${jakarta.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Intro />
          {children}
          <Motion />
        </Providers>
      </body>
    </html>
  );
}
