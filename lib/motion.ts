import type { CSSProperties } from 'react';

export type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

export const cn = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(' ');

/** True when the visitor has not asked for reduced motion (the <html> flag is set by an inline script in layout.tsx). */
export const isAnim = () => typeof document !== 'undefined' && document.documentElement.classList.contains('anim');
export const noIntro = () => typeof document !== 'undefined' && document.documentElement.classList.contains('no-intro');

/** A dot in the flavour colour that arcs from the button to the bag icon. */
export function fly(src: HTMLElement, color: string) {
  const bag = document.getElementById('bagBtn');
  if (!bag) return;
  const s = src.getBoundingClientRect();
  const t = bag.getBoundingClientRect();
  const sx = s.left + s.width / 2;
  const sy = s.top + s.height / 2;
  const dx = t.left + t.width / 2 - sx;
  const dy = t.top + t.height / 2 - sy;
  const d = document.createElement('div');
  Object.assign(d.style, {
    position: 'fixed', zIndex: '120', left: `${sx - 9}px`, top: `${sy - 9}px`, width: '18px', height: '18px',
    borderRadius: '50%', background: color, boxShadow: '0 6px 16px rgba(0,0,0,.35)', pointerEvents: 'none',
  });
  document.body.appendChild(d);
  d.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px,${dy * 0.5 - 90}px) scale(1.35)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px,${dy}px) scale(.3)`, opacity: 0.9 },
    ],
    { duration: 720, easing: 'cubic-bezier(.5,0,.6,1)' },
  ).onfinish = () => d.remove();
}
