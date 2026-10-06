'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { MountainIcon, ShieldIcon, TruckIcon } from './Icons';
import { useBag, useFlavour } from './Providers';
import { SplitText } from './SplitText';
import { Stars } from './Stars';
import { FLAVOURS, ORDER, SITE, WAS_PRICE, PRICE, money } from '@/lib/data';
import { cn, isAnim, type CSSVars } from '@/lib/motion';

/* x %, y %, width px, float seconds, parallax speed */
const BEANS: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [46, 9, 34, 9, 0.05], [55, 66, 22, 12, 0.12], [93, 7, 28, 10, 0.09], [90, 76, 42, 8, 0.04], [3, 90, 26, 11, 0.1],
  [38, 86, 18, 13, 0.14], [68, 3, 20, 9.5, 0.07], [14, 6, 22, 12, 0.11], [62, 46, 16, 10.5, 0.13],
];

const d = (ms: number) => ({ '--d': ms }) as CSSVars;

export function Hero() {
  const { current, set } = useFlavour();
  const { add } = useBag();
  const f = FLAVOURS[current];

  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const prev = useRef(current);

  /* flavour switch: text blurs through, stamp spins */
  useEffect(() => {
    if (prev.current === current) return;
    prev.current = current;
    if (!isAnim()) return;
    [nameRef, descRef, metaRef].forEach((r, i) =>
      r.current?.animate(
        [{ opacity: 0, transform: 'translateY(16px)', filter: 'blur(5px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }],
        { duration: 700, delay: i * 70, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
      ),
    );
    stampRef.current?.animate(
      [{ transform: 'rotate(-200deg) scale(.5)' }, { transform: 'rotate(-9deg) scale(1)' }],
      { duration: 850, easing: 'cubic-bezier(.3,1.4,.5,1)' },
    );
  }, [current]);

  /* hero image tilts toward the pointer */
  useEffect(() => {
    const hero = heroRef.current, tilt = tiltRef.current, stage = stageRef.current;
    if (!hero || !tilt || !stage) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));
    const move = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      tilt.style.setProperty('--ry', `${(clamp(x) * 7).toFixed(2)}deg`);
      tilt.style.setProperty('--rx', `${(clamp(y) * -5).toFixed(2)}deg`);
    };
    const leave = () => { tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg'); };
    hero.addEventListener('mousemove', move);
    hero.addEventListener('mouseleave', leave);
    return () => { hero.removeEventListener('mousemove', move); hero.removeEventListener('mouseleave', leave); };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="beans" id="beans" aria-hidden="true">
        {BEANS.map(([x, y, w, t, s], i) => (
          <span
            key={i}
            className="bean"
            data-s={s}
            style={{
              left: `${x}%`, top: `${y}%`, width: w,
              '--t': `${t}s`, '--dl': `${-i * 1.3}s`, '--r0': `${-30 + i * 9}deg`, '--r1': `${20 + i * 7}deg`,
            } as CSSVars}
          >
            <svg viewBox="0 0 40 60">
              <ellipse cx="20" cy="30" rx="16" ry="26" />
              <path d="M20 6C8 22 32 38 20 54" fill="none" stroke="var(--bg)" strokeWidth={3.6} strokeLinecap="round" />
            </svg>
          </span>
        ))}
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-intro">
            <p className="tagline" data-h="" style={d(0)}>Good coffee. Brighter days.</p>
            <SplitText as="h1" id="h1" auto base={250} text="Café-style coffee, made at home." />
            <p className="lede" data-h="" style={d(800)}>
              Rich, creamy instant coffee in single-serve sachets. Empty one into a mug, add water, done.
            </p>
          </div>

          <div className="hero-details">
            <div className="picker" role="tablist" aria-label="Choose a flavour" id="picker" data-h="" style={d(920)}>
              {ORDER.map((k) => (
                <button key={k} type="button" role="tab" aria-selected={current === k} onClick={() => set(k)}>
                  <span className="sw" style={{ '--c': FLAVOURS[k].color } as CSSVars} />
                  {FLAVOURS[k].name}
                </button>
              ))}
            </div>

            <div className="flavour-card" aria-live="polite" data-h="" style={d(1040)}>
              <div className="flavour-name" ref={nameRef}>{f.name}</div>
              <p className="flavour-desc" ref={descRef}>{f.desc}</p>
              <div className="meta" ref={metaRef}>
                <Stars rating={f.rating} />
                <span>{f.rating.toFixed(1)}</span>
                <span className="price"><b>From {money(PRICE)}</b><s>{money(WAS_PRICE)}</s></span>
                <span className="save">Save 10%</span>
              </div>
              <div className="cta-row">
                <button className="btn btn-primary" type="button" onClick={(e) => add(current, e.currentTarget)}>Add to bag</button>
                <a className="btn btn-ghost" href="#range">Shop all flavours</a>
              </div>
            </div>

            <div className="trust" data-h="" style={d(1160)}>
              <span><TruckIcon />Free shipping over $75</span>
              <span><ShieldIcon />30-day money-back guarantee</span>
              <span><MountainIcon />Made in New Zealand</span>
            </div>
          </div>
        </div>

        <div className="stage" id="stage" ref={stageRef}>
          <div className="tilt" id="tilt" ref={tiltRef}>
            <div className="arch-ring" />
            <div className="arch" id="heroArch">
              {ORDER.map((k) => (
                <Image
                  key={k}
                  src={FLAVOURS[k].img}
                  alt={FLAVOURS[k].heroAlt}
                  width={1024}
                  height={1536}
                  sizes="(max-width: 900px) 84vw, 420px"
                  priority={k === 'caramel'}
                  className={cn(current === k && 'on')}
                />
              ))}
            </div>
            <div className="stamp" id="stamp" ref={stampRef} aria-hidden="true"><div><b>10</b>sachets<br />per box</div></div>
          </div>
        </div>
      </div>

      <svg className="ridges" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 140 C 140 60, 260 60, 380 120 S 620 190, 760 110 S 1040 30, 1180 100 S 1360 150, 1600 100 V220 H0Z" />
        <path d="M0 170 C 180 110, 320 120, 460 165 S 760 200, 900 150 S 1200 90, 1600 150 V220 H0Z" />
        <path d="M0 200 C 200 160, 400 170, 600 195 S 1000 200, 1200 175 S 1400 170, 1440 185 V220 H0Z" />
      </svg>
    </section>
  );
}
