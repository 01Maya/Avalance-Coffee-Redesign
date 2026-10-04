/** Curtain shown on first visit per session: the logo draws itself, then lifts away. Pure CSS (see .intro in globals.css). */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="0 0 124 52" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinejoin="miter">
        <path pathLength={1} d="M20 46 L60 5 L100 46" />
        <path pathLength={1} d="M44 46 L64 27 L78 38" />
        <path pathLength={1} d="M2 40 L15 27 L27 36" />
        <path pathLength={1} d="M96 30 L108 17 L122 32" />
      </svg>
      <b>AVALANCHE</b>
    </div>
  );
}
