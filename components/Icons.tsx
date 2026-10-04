import type { SVGProps } from 'react';

export function Mark({ className = 'mark', strokeWidth = 3.4 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 124 52" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="miter" aria-hidden="true">
      <path d="M20 46 L60 5 L100 46" />
      <path d="M44 46 L64 27 L78 38" />
      <path d="M2 40 L15 27 L27 36" />
      <path d="M96 30 L108 17 L122 32" />
    </svg>
  );
}

export function Logo({ href = '#top', label }: { href?: string; label: string }) {
  return (
    <a className="logo" href={href} aria-label={label}>
      <Mark />
      <span className="word"><b>AVALANCHE</b><small>EST. 2001</small></span>
    </a>
  );
}

const base: SVGProps<SVGSVGElement> = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const BagIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.7}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>
);
export const MenuIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.7}><path d="M4 8h16M4 16h16" /></svg>
);
export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const TruckIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
);
export const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2.2 2.2L15 10" /></svg>
);
export const MountainIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8}><path d="M2 19l7-11 4 6 3-4 6 9z" /></svg>
);

export function Ridges() {
  return (
    <svg className="ridges" viewBox="0 0 1600 220" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 140 C 140 60, 260 60, 380 120 S 620 190, 760 110 S 1040 30, 1180 100 S 1360 150, 1600 100 V220 H0Z" />
      <path d="M0 170 C 180 110, 320 120, 460 165 S 760 200, 900 150 S 1200 90, 1600 150 V220 H0Z" />
      <path d="M0 200 C 200 160, 400 170, 600 195 S 1000 200, 1200 175 S 1450 170, 1600 185 V220 H0Z" />
    </svg>
  );
}
