'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { CloseIcon } from './Icons';
import { useBag } from './Providers';
import { FLAVOURS, FREE_SHIP, ORDER, PRICE, SITE, money } from '@/lib/data';
import { cn } from '@/lib/motion';

export function BagDrawer() {
  const { items, open, setOpen, change, subtotal } = useBag();
  const keys = ORDER.filter((k) => (items[k] ?? 0) > 0);
  const left = Math.max(0, FREE_SHIP - subtotal);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  return (
    <>
      <div className={cn('scrim', open && 'on')} onClick={() => setOpen(false)} />
      <aside className={cn('drawer', open && 'on')} id="drawer" aria-label="Shopping bag" aria-hidden={!open}>
        <header>
          <h2>Your bag</h2>
          <button className="icon-btn" aria-label="Close bag" onClick={() => setOpen(false)}><CloseIcon /></button>
        </header>
        <div className="ship">
          <span>{left > 0 ? `You're ${money(left)} away from free shipping.` : "You've unlocked free shipping."}</span>
          <div className="bar"><i style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} /></div>
        </div>
        <div className="lines">
          {keys.length ? (
            keys.map((k) => {
              const f = FLAVOURS[k];
              const qty = items[k] ?? 0;
              return (
                <div className="line" key={k}>
                  <Image src={f.img} alt="" width={74} height={92} />
                  <div>
                    <h4>{f.name}</h4>
                    <small>Café Style, 10 sachets</small>
                    <div className="qty">
                      <button aria-label={`Remove one ${f.name}`} onClick={() => change(k, -1)}>−</button>
                      <span>{qty}</span>
                      <button aria-label={`Add one ${f.name}`} onClick={() => change(k, 1)}>+</button>
                    </div>
                  </div>
                  <strong>{money(qty * PRICE)}</strong>
                </div>
              );
            })
          ) : (
            <div className="empty"><b>Your bag is empty</b>Pick a flavour to get started.</div>
          )}
        </div>
        <footer>
          <div className="sub-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <a className="btn btn-primary" href={SITE} target="_blank" rel="noreferrer">
            Shop on Avalanche Coffee
          </a>
          <p className="fine">You&apos;ll continue securely on the Avalanche Coffee store.</p>
        </footer>
      </aside>
    </>
  );
}
