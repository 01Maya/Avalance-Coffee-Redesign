'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { cn, isAnim } from '@/lib/motion';

type Mode = 'hot' | 'cold';

export function HowTo() {
  const [mode, setMode] = useState<Mode>('hot');

  function choose(m: Mode) {
    if (m === mode) return;
    if (isAnim()) {
      const vessel = document.getElementById('vessel');
      vessel?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(.955)' }, { transform: 'scale(1)' }],
        { duration: 650, easing: 'cubic-bezier(.3,1.4,.5,1)' },
      );
      if (m === 'cold') {
        vessel?.querySelectorAll('.ice-a, .ice-b, .ice-c').forEach((g, i) =>
          g.animate(
            [{ transform: 'translateY(-170px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
            { duration: 850, delay: 120 + i * 150, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'backwards' },
          ),
        );
      }
    }
    setMode(m);
  }

  return (
    <section className="how pad" id="how">
      <div className={cn('wrap how-grid', `mode-${mode}`)} id="howGrid">
        <Reveal kind="clip" className="vessel-wrap" id="vessel">
          <div className="vessel-glow" aria-hidden="true" />
          <svg viewBox="0 0 400 432" aria-hidden="true">
            <defs>
              <linearGradient id="cup-ceramic" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fffdf8" />
                <stop offset=".56" stopColor="#f1e2cf" />
                <stop offset="1" stopColor="#c8aa8a" />
              </linearGradient>
              <linearGradient id="coffee-surface" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a9683f" />
                <stop offset=".52" stopColor="#704027" />
                <stop offset="1" stopColor="#422317" />
              </linearGradient>
              <linearGradient id="glass-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".7" />
                <stop offset=".5" stopColor="#e5f2f0" stopOpacity=".2" />
                <stop offset="1" stopColor="#b1d5d1" stopOpacity=".55" />
              </linearGradient>
              <filter id="vessel-shadow" x="-30%" y="-30%" width="160%" height="180%">
                <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#25160f" floodOpacity=".2" />
              </filter>
            </defs>
            <path className="r1" d="M0 300 C 60 250, 120 250, 190 290 S 320 330, 400 270 V432 H0Z" />
            <path className="r2" d="M0 340 C 80 300, 160 310, 240 340 S 340 370, 400 330 V432 H0Z" />
            <path className="r3" d="M0 385 C 90 355, 170 365, 250 385 S 350 400, 400 380 V432 H0Z" />
            <ellipse cx="200" cy="372" rx="118" ry="14" fill="#000" opacity=".16" />

            {/* hot mug */}
            <g className="v-hot">
              <image href="/images/mug.png" x="26" y="8" width="348" height="380" preserveAspectRatio="xMidYMid meet" />
            </g>

            {/* iced glass */}
            <g className="v-cold">
              <image href="/images/glass.png" x="26" y="8" width="348" height="380" preserveAspectRatio="xMidYMid meet" />
            </g>
          </svg>
        </Reveal>

        <div>
          <Reveal as="span" className="eyebrow" i={0}>Your cup, your way</Reveal>
          <SplitText text="Make it hot or cold" />
          <Reveal as="p" className="lede" style={{ marginTop: '1.1rem' }}>Three simple steps to turn every sachet into a smooth, café-style cup — steaming hot or perfectly iced.</Reveal>
          <Reveal className="toggle" role="group" aria-label="Choose how you like it" i={1}>
            <button type="button" aria-pressed={mode === 'hot'} onClick={() => choose('hot')}>Hot</button>
            <button type="button" aria-pressed={mode === 'cold'} onClick={() => choose('cold')}>Iced</button>
          </Reveal>
          <ol className="steps">
            <Reveal as="li" i={0}><span><b>Empty</b> one Avalanche sachet into your favourite mug.</span></Reveal>
            <Reveal as="li" i={1}><span><b>Pour in 200 mL</b> of hot (not boiling) water and stir well.</span></Reveal>
            <Reveal as="li" i={2}>
              <span>
                {mode === 'hot' ? (<><b>Sip</b> and enjoy it hot. Cheers!</>) : (<><b>Top up with ice</b> or cold water if you prefer it chilled. Cheers!</>)}
              </span>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}
