import { Fragment } from 'react';
import { Mark } from './Icons';

/** Slogan band. Its two rows slide in opposite directions as you scroll (see Motion.tsx). Decorative only. */
function Row({ id, className }: { id: string; className: string }) {
  return (
    <div className={`row ${className}`} id={id}>
      {[0, 1, 2, 3].map((n) => (
        <Fragment key={n}>
          <span>Good coffee.</span>
          <span className="o">Brighter days.</span>
          <Mark className="" strokeWidth={4} />
        </Fragment>
      ))}
    </div>
  );
}

export function BigLine() {
  return (
    <section className="bigline" id="bigline" aria-hidden="true">
      <Row id="row1" className="r1" />
      <Row id="row2" className="r2" />
    </section>
  );
}
