'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';

export function Finale() {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  /* Demo only: nothing is sent. Wire this to Shopify / Klaviyo / Mailchimp. */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setNote('Enter a valid email address, like you@example.com.'); return; }
    setNote("You're in. Watch your inbox for offers.");
    setEmail('');
  };

  return (
    <section className="finale">
      <div className="wrap">
        <Reveal kind="clip" className="finale-img">
          <Image
            src="/images/cta.png"
            alt="Four Avalanche Café Style coffee flavours with matching cups in a warm café setting"
            width={1672}
            height={941}
            sizes="(max-width: 1290px) 100vw, 1240px"
          />
        </Reveal>
        <div className="news">
          <div>
            <SplitText text="No spam, just coffee." />
            <Reveal as="p" className="lede">Sign up for special offers, discounts and new product news.</Reveal>
          </div>
          <Reveal as="form" noValidate onSubmit={onSubmit} i={1}>
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </Reveal>
          <p className="note" role="status">{note}</p>
        </div>
      </div>
    </section>
  );
}
