'use client';

import Image from 'next/image';
import { useBag, useFlavour } from './Providers';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { Stars } from './Stars';
import { FLAVOURS, ORDER, PRICE, SITE, WAS_PRICE, money } from '@/lib/data';
import { cn, type CSSVars } from '@/lib/motion';

export function Range() {
  const { current, set } = useFlavour();
  const { add } = useBag();

  return (
    <section className="pad" id="range" style={{ paddingTop: 'clamp(2rem,5vw,4rem)' }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText text="Our delicious range" />
          <Reveal as="p" className="lede">Pick a flavour to see it up close. Every box holds 10 sachets.</Reveal>
        </div>

        <div className="strips" id="strips">
          {ORDER.map((k, i) => {
            const f = FLAVOURS[k];
            return (
              <Reveal
                key={k}
                i={i}
                className={cn('strip', current === k && 'on')}
                tabIndex={0}
                role="group"
                aria-label={f.name}
                style={{ '--band-c': f.color } as CSSVars}
                onClick={(e) => { if (!(e.target as HTMLElement).closest('[data-add]')) set(k); }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); set(k); }
                }}
              >
                <Image src={f.img} alt="" width={1024} height={1536} sizes="(max-width: 860px) 82vw, 40vw" loading="lazy" />
                <span className="vname" aria-hidden="true">{f.name}</span>
                <div className="info">
                  <h3>{f.name}</h3>
                  <p>{f.desc}</p>
                  <div className="row">
                    <div className="meta" style={{ margin: 0 }}>
                      <Stars rating={f.rating} />
                      <span>{f.rating.toFixed(1)}</span>
                      <span className="price"><b>From {money(PRICE)}</b><s>{money(WAS_PRICE)}</s></span>
                    </div>
                    <button className="btn btn-primary" data-add={k} type="button" onClick={(e) => add(k, e.currentTarget)}>Add to bag</button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="p" className="more">
          Also in the range: Vanilla Latte, Chai Latte, Cappuccino and Chai Turmeric Latte.{' '}
          <a href="#range">See all eight flavours</a>
        </Reveal>
      </div>
    </section>
  );
}
