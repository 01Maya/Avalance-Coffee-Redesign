'use client';

import Image from 'next/image';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { SITE } from '@/lib/data';

export function Story() {
  return (
    <section className="pad" id="story" style={{ paddingTop: 0 }}>
      <div className="wrap story-grid">
        <Reveal kind="clip" className="story-img">
          <Image
            src="/images/scene.webp"
            alt="The Avalanche range of four flavours on stone plinths beside coffee beans, chocolate, caramel and hazelnuts"
            width={1672}
            height={941}
            sizes="(max-width: 860px) 100vw, 58vw"
          />
        </Reveal>
        <div className="story-copy">
          <SplitText text="Two Kiwis who couldn't find a coffee they liked." />
          <Reveal as="p" i={0}>
            Avalanche is founded and run by Paul and Stefan. They couldn&apos;t find a coffee they enjoyed, so they made one. They&apos;re Kiwi, and they&apos;ve kept Avalanche that way.
          </Reveal>
          <dl className="facts">
            <Reveal i={0}><dt>Est. <CountUp from={1940} to={2001} duration={2000} /></dt><dd>Good coffee for brighter days, ever since.</dd></Reveal>
            <Reveal i={1}><dt>Made in NZ</dt><dd>Every Avalanche product is produced in New Zealand.</dd></Reveal>
            <Reveal i={2}><dt>Four countries</dt><dd>Shipping to the USA, New Zealand, Australia and the Philippines.</dd></Reveal>
          </dl>
          <Reveal as="a" className="btn btn-ghost" style={{ marginTop: '2rem' }} href="#story" i={1}>Read our story</Reveal>
        </div>
      </div>
    </section>
  );
}
