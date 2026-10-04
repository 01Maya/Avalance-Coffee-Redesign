'use client';

import { useEffect, useRef, useState } from 'react';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';
import { Stars } from './Stars';
import { ALL_RATINGS } from '@/lib/data';
import { cn, type CSSVars } from '@/lib/motion';

const customerReviews = [
  {
    name: 'Ava M.',
    product: 'Mochaccino',
    quote: 'It tastes like my favorite café order at home, without the wait or the extra cost.',
    rating: 5,
  },
  {
    name: 'Noah L.',
    product: 'Caramel Latte',
    quote: 'Smooth, rich, and ridiculously easy to make. This is my weekday reset.',
    rating: 5,
  },
  {
    name: 'Emma R.',
    product: 'Hazelnut Latte',
    quote: 'The nutty finish is so balanced. It feels comforting and premium every single time.',
    rating: 4.6,
  },
  {
    name: 'Leo T.',
    product: 'Irish Cream',
    quote: 'Honestly the best cup I’ve had in months. It tastes indulgent without being too sweet.',
    rating: 5,
  },
];

export function Ratings() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  /* `seen` lets the star fills animate from empty (see .ratings.seen in globals.css) */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={cn('ratings pad', seen && 'seen')} id="reviews">
      <div className="wrap ratings-grid">
        <div className="rating-summary">
          <Reveal as="span" className="eyebrow" i={0}>Loved by coffee people</Reveal>
          <Reveal className="big-score"><CountUp to={4.91} decimals={2} duration={1800} /><small>/ 5</small></Reveal>
          <Reveal as="span" className="stars" role="img" aria-label="Rated 4.91 out of 5" style={{ '--pct': '98.2%' } as CSSVars} i={1} />
          <Reveal as="p" className="who" i={2}>From 57 verified customer reviews</Reveal>
          <Reveal as="p" className="rating-note" i={3}>The easy, delicious cup people keep coming back for.</Reveal>
        </div>

        <div className="reviews-grid">
          {customerReviews.map(({ name, product, quote, rating }, idx) => (
            <Reveal as="article" key={name} className="review-card" i={idx}>
              <div className="review-head">
                <div className="review-person">
                  <span className="avatar">{name.charAt(0)}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{product}</small>
                  </div>
                </div>
                <span className="review-score">{rating.toFixed(1).replace(/\.0$/, '')}</span>
              </div>

              <div className="review-stars">
                <Stars rating={rating} index={idx} />
              </div>

              <p className="review-quote">“{quote}”</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
