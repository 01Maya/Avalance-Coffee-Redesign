'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { FLAVOURS, ORDER, PRICE, type FlavourKey } from '@/lib/data';
import { fly, isAnim } from '@/lib/motion';

type BagItems = Partial<Record<FlavourKey, number>>;

interface FlavourCtx { current: FlavourKey; set: (k: FlavourKey) => void }
interface BagCtx {
  items: BagItems; open: boolean; setOpen: (o: boolean) => void;
  add: (k: FlavourKey, src?: HTMLElement | null) => void;
  change: (k: FlavourKey, delta: number) => void;
  count: number; subtotal: number; bump: number;
}

const FlavourContext = createContext<FlavourCtx | null>(null);
const BagContext = createContext<BagCtx | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<FlavourKey>('caramel');
  const [items, setItems] = useState<BagItems>({});
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [bagLoaded, setBagLoaded] = useState(false);
  const [flavourLoaded, setFlavourLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('avalanche-flavour') as FlavourKey | null;
      if (saved && ORDER.includes(saved)) setCurrent(saved);
    } catch {
      // Theme persistence is optional; the default flavour remains available.
    } finally {
      setFlavourLoaded(true);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('avalanche-bag');
      if (saved) {
        const parsed = JSON.parse(saved) as BagItems;
        const validItems = ORDER.reduce<BagItems>((bag, key) => {
          const quantity = Number(parsed[key]);
          if (Number.isInteger(quantity) && quantity > 0) bag[key] = quantity;
          return bag;
        }, {});
        setItems(validItems);
      }
    } catch {
      window.localStorage.removeItem('avalanche-bag');
    } finally {
      setBagLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (bagLoaded) window.localStorage.setItem('avalanche-bag', JSON.stringify(items));
  }, [bagLoaded, items]);

  /* The whole page recolours from this one attribute (see the [data-f] rules in globals.css). */
  useEffect(() => {
    document.documentElement.dataset.f = current;
    if (flavourLoaded) window.localStorage.setItem('avalanche-flavour', current);
  }, [current, flavourLoaded]);

  const add = useCallback((k: FlavourKey, src?: HTMLElement | null) => {
    setItems((p) => ({ ...p, [k]: (p[k] ?? 0) + 1 }));
    if (isAnim() && src) {
      fly(src, FLAVOURS[k].color);
      window.setTimeout(() => { setBump((b) => b + 1); setOpen(true); }, 740);
    } else {
      setOpen(true);
    }
  }, []);

  const change = useCallback((k: FlavourKey, delta: number) => {
    setItems((p) => ({ ...p, [k]: Math.max(0, (p[k] ?? 0) + delta) }));
  }, []);

  const flavour = useMemo<FlavourCtx>(() => ({ current, set: setCurrent }), [current]);
  const bag = useMemo<BagCtx>(() => {
    const count = ORDER.reduce((n, k) => n + (items[k] ?? 0), 0);
    return { items, open, setOpen, add, change, count, subtotal: count * PRICE, bump };
  }, [items, open, add, change, bump]);

  return (
    <FlavourContext.Provider value={flavour}>
      <BagContext.Provider value={bag}>{children}</BagContext.Provider>
    </FlavourContext.Provider>
  );
}

export function useFlavour() {
  const c = useContext(FlavourContext);
  if (!c) throw new Error('useFlavour must be used inside <Providers>');
  return c;
}

export function useBag() {
  const c = useContext(BagContext);
  if (!c) throw new Error('useBag must be used inside <Providers>');
  return c;
}
