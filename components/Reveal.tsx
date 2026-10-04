'use client';

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn, type CSSVars } from '@/lib/motion';

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** "clip" wipes the element open instead of fading it up */
  kind?: '' | 'clip';
  /** stagger index; each step adds 90ms */
  i?: number;
  open?: boolean;
  noValidate?: boolean;
  href?: string;
  children?: ReactNode;
};

/**
 * Scroll reveal. The hidden start state only exists under `html.anim`
 * (see globals.css), so reduced-motion visitors and no-JS renders see everything.
 */
export function Reveal({ as: Tag = 'div', kind = '', i = 0, className, style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const [armed, setArmed] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* a fully clipped element counts as invisible to IntersectionObserver, so watch its parent instead */
    const target = kind === 'clip' && el.parentElement ? el.parentElement : el;
    const io = new IntersectionObserver(
      ([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: kind === 'clip' ? 0.12 : 0.14, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [kind]);

  /* once revealed, hand transitions back to the element (strips need their flex-grow transition back) */
  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => setArmed(false), 3200);
    return () => window.clearTimeout(t);
  }, [seen]);

  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref}
      data-r={armed ? kind : undefined}
      className={cn(className, seen && 'in')}
      style={{ '--i': i, ...style } as CSSVars}
      {...rest}
    >
      {children}
    </Comp>
  );
}
