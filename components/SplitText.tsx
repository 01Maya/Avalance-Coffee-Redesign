'use client';

import { Fragment, useEffect, useRef, useState, type ElementType } from 'react';
import { cn, noIntro, type CSSVars } from '@/lib/motion';

interface Props {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** stagger start in ms */
  base?: number;
  /** play on load (after the intro curtain) instead of on scroll */
  auto?: boolean;
}

/** Headline that rises word by word from behind a mask. */
export function SplitText({ text, as: Tag = 'h2', id, className, base = 0, auto = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (auto) {
      const t = window.setTimeout(() => setOn(true), noIntro() ? 120 : 1850);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([en]) => { if (en.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto]);

  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref}
      id={id}
      aria-label={text}
      className={cn(className, 'split', on && 'split-in')}
      style={{ '--base': `${base}ms` } as CSSVars}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true"><span style={{ '--i': i } as CSSVars}>{w}</span></span>
        </Fragment>
      ))}
    </Comp>
  );
}
