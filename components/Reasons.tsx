'use client';

import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { SITE } from '@/lib/data';
import type { CSSVars } from '@/lib/motion';

const ITEMS: Array<{ title: string; body: string; paths: string[] }> = [
  {
    title: 'Café style, without leaving home',
    body: "Smooth, creamy and indulgent. The kind of cup you'd usually queue for.",
    paths: ['M8 18h26v10a12 12 0 01-12 12h-2A12 12 0 018 28z', 'M34 21h3a5 5 0 010 10h-4', 'M15 12c-2-3 2-4 0-7M22 12c-2-3 2-4 0-7M29 12c-2-3 2-4 0-7'],
  },
  {
    title: 'One sachet, one perfect cup',
    body: 'Single-serve sachets that travel to the office, the campsite or the kitchen.',
    paths: ['M13 6h22v6l-3 2H16l-3-2z', 'M16 14l-2 28h20l-2-28', 'M19 26h10'],
  },
  {
    title: 'Proudly made in New Zealand',
    body: 'Founded by two Kiwis and kept that way. Every product is produced at home.',
    paths: ['M4 38l14-22 8 12 6-8 12 18z', 'M14 22l4 5 4-5'],
  },
  {
    title: 'Try it risk-free',
    body: 'Not right for you? Ask within 30 days of delivery. First orders up to $115 are covered.',
    paths: ['M24 5l15 6v12c0 9-6 16-15 20C15 39 9 32 9 23V11z', 'M17 24l5 5 9-10'],
  },
];

export function Reasons(): ReactNode {
  return (
    <section className="pad" id="why">
      <div className="wrap reasons-grid">
        <div>
          <SplitText text="Rich & creamy café-quality drinks" />
          <Reveal as="p" className="lede">In a delicious range of flavours, ready whenever you are.</Reveal>
          <Reveal as="a" className="btn btn-primary" href="#range" i={1}>Shop now</Reveal>
        </div>
        <div className="rlist">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} i={i}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                {it.paths.map((d) => <path key={d} d={d} pathLength={1} style={{ '--i': i } as CSSVars} />)}
              </svg>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
