'use client';

import { useState } from 'react';
import { BagIcon, Logo, MenuIcon } from './Icons';
import { useBag } from './Providers';
import { SITE } from '@/lib/data';
import { cn } from '@/lib/motion';

const NAV = [
  ['Shop', '#range'],
  ['Subscriptions', '#subscribe'],
  ['About', '#story'],
  ['Contact', '#faq'],
] as const;

export function Header() {
  const { count, bump, setOpen } = useBag();
  const [menu, setMenu] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap">
        <Logo label="Avalanche Coffee, home" />
        <nav className={cn('nav', menu && 'open')} id="nav" aria-label="Main">
          {NAV.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>
          ))}
        </nav>
        <div className="head-actions">
          <button className="icon-btn" id="bagBtn" aria-label="Open bag" onClick={() => setOpen(true)}>
            <BagIcon />
            {/* changing the key remounts the badge, which replays the bump animation */}
            <span key={bump} className={cn('badge', count > 0 && 'on', bump > 0 && 'bump')}>{count}</span>
          </button>
          <button className="icon-btn menu-btn" aria-label="Menu" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu((m) => !m)}>
            <MenuIcon />
          </button>
        </div>
      </div>
      <div className="progress" id="prog" aria-hidden="true" />
    </header>
  );
}
