'use client';

import { useRef, useState } from 'react';
import { useIsoLayoutEffect } from '@/lib/hooks';
import { isAnim } from '@/lib/motion';

interface Props { to: number; from?: number; decimals?: number; duration?: number }

/** Counts up when scrolled into view. Server render (and reduced motion) shows the final number. */
export function CountUp({ to, from = 0, decimals = 0, duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => v.toFixed(decimals);
  const [val, setVal] = useState(fmt(to));

  useIsoLayoutEffect(() => {
    if (!isAnim()) return;
    const el = ref.current;
    if (!el) return;
    setVal(fmt(from));
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(fmt(from + (to - from) * ease));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{val}</span>;
}
