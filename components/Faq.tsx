'use client';

import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { SITE } from '@/lib/data';

const ITEMS: Array<{ q: string; a: ReactNode }> = [
  { q: 'Do you ship internationally?', a: "We currently ship to the USA, New Zealand, Australia and the Philippines. We're looking at solutions for more of our international fans, so hold tight." },
  { q: "Who's behind Avalanche?", a: "Paul and Stefan, two guys who just couldn't find a coffee they liked. They're Kiwi and kept Avalanche that way, so all our products are produced in New Zealand." },
  {
    q: 'Do you have a money-back guarantee?',
    a: (<>Yes, on first-time orders of any Avalanche product. If it&apos;s not right for you, tell us within 30 days of delivery and reference the Money Back Guarantee. It&apos;s valid for orders up to $115, and a $15 shipping and handling fee is deducted from eligible refunds. See the full <a href="/terms">terms and conditions</a>.</>),
  },
  {
    q: "What's your refund policy?",
    a: (<>You can return any product within 30 days of delivery for a refund, as long as it&apos;s unused, unopened and in the condition you received it. Return shipping for unopened products is at your cost, and we can offer a discounted return label deducted from your refund. Read the <a href="/policy">full policy</a>.</>),
  },
  {
    q: 'Why is my refund late or missing?',
    a: (<>Refunds take 3 to 5 business days to post to your account. If yours hasn&apos;t arrived, check with your card provider or PayPal first, then <a href={`${SITE}/pages/contact`}>contact us</a>.</>),
  },
  { q: "What if something's wrong with my order?", a: 'Email reception@avalanchecoffee.co.nz with the issue and your batch number, or send us a DM on socials, and we\'ll sort it out.' },
  { q: 'What if an item is out of stock?', a: "We're working behind the scenes to get it back as soon as we can. Thanks for your patience in the meantime." },
];

export function Faq() {
  return (
    <section className="pad" id="faq">
      <div className="wrap faq-grid">
        <div>
          <SplitText text="Questions, answered." />
          <Reveal as="p" className="lede">
            Can&apos;t spot yours? <a href={`${SITE}/pages/contact`}>Contact us</a>. We&apos;re happy to chat anytime.
          </Reveal>
        </div>
        <div>
          {ITEMS.map((it, i) => (
            <Reveal as="details" key={it.q} i={i} open={i === 0}>
              <summary>{it.q}<span className="pm" /></summary>
              <div className="ans">{it.a}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
