'use client';

import { useEffect } from 'react';
import { isAnim } from '@/lib/motion';

/**
 * Page-level motion that isn't tied to one component:
 * scroll progress, header shrink, hero + bean parallax, slogan-band scrub, magnetic buttons.
 */
export function Motion() {
  useEffect(() => {
    const anim = isAnim();
    const header = document.querySelector<HTMLElement>('.site-header');
    const stage = document.getElementById('stage');
    const prog = document.getElementById('prog');
    const big = document.getElementById('bigline');
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const beans = Array.from(document.querySelectorAll<HTMLElement>('.bean'));

    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        prog?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
        header?.classList.toggle('scrolled', y > 30);

        if (anim && y < 1500) {
          stage?.style.setProperty('--py', `${(-y * 0.07).toFixed(1)}px`);
          beans.forEach((b) => b.style.setProperty('--by', `${(-y * Number(b.dataset.s)).toFixed(1)}px`));
        }
        if (anim && big && row1 && row2) {
          const r = big.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) {
            const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
            row1.style.transform = `translate3d(${(-p * 1100).toFixed(0)}px,0,0)`;
            row2.style.transform = `translate3d(${(-1100 + p * 1100).toFixed(0)}px,0,0)`;
          }
        }
        tick = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* magnetic buttons (delegated, so it also covers buttons rendered later) */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const SEL = '.btn-primary, .btn-light, .btn-ghost, .btn-line-light';
    let last: HTMLElement | null = null;
    const reset = (b: HTMLElement) => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); };
    const onMove = (e: MouseEvent) => {
      const b = (e.target as Element | null)?.closest?.(SEL) as HTMLElement | null;
      if (last && last !== b) reset(last);
      last = b;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
      b.style.setProperty('--my', `${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px`);
    };
    if (fine) document.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (fine) document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return null;
}
