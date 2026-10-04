'use client';

import type { MouseEvent } from 'react';
import { CountUp } from './CountUp';
import { Ridges } from './Icons';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { SITE } from '@/lib/data';

export function Subscribe() {
  /* soft spotlight follows the cursor */
  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <section className="subscribe pad" id="subscribe" onMouseMove={onMove}>
      <Ridges />
      <div className="wrap">
        <div>
          <SplitText text="Make life easy and subscribe." />
          <Reveal as="p" className="lede">Save more when you subscribe, and never run out of your favourite flavour. Buy in bulk to save even more.</Reveal>
          <Reveal className="cta-row" i={1}>
<a className="btn btn-light" href="#subscribe">Learn more</a>
      <a className="btn btn-line-light" href="#range">Shop one-off</a>
          </Reveal>
        </div>
        <Reveal className="big-off" aria-label="20 percent off when you subscribe">
          <div><b><CountUp to={20} duration={1500} />%</b><span>off when you subscribe</span></div>
        </Reveal>
      </div>
    </section>
  );
}
