'use client';

import { Reveal } from './Reveal';

const OUTLETS = ['News', 'Metro', 'Daily Mail', 'Nova', 'NZ Herald', 'Pedestrian', 'WSFM'];

/** Static wrapped list by default; scrolling marquee (4 copies) when motion is allowed. */
export function Press() {
  return (
    <section className="press">
      <div className="wrap">
        <Reveal as="p">As seen in</Reveal>
        <div className="marquee">
          <div className="track">
            {[0, 1, 2, 3].map((n) => (
              <ul key={n} aria-hidden={n > 0 ? true : undefined}>
                {OUTLETS.map((o) => <li key={o}>{o}</li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
