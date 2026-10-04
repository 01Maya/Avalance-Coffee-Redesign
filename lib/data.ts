export type FlavourKey = 'mocha' | 'caramel' | 'hazel' | 'irish';

export interface Flavour {
  key: FlavourKey;
  name: string;
  desc: string;
  rating: number;
  color: string;
  url: string;
  img: string;
  heroAlt: string;
}

export const SITE = 'https://avalanchecoffee.com';

export const FLAVOURS: Record<FlavourKey, Flavour> = {
  mocha: {
    key: 'mocha', name: 'Mochaccino', desc: 'Rich chocolate. Velvety coffee. Pure indulgence.', rating: 5.0, color: '#7d3a8c',
    url: `${SITE}/products/cafe-style-mochaccino`, img: '/images/mocha.webp',
    heroAlt: 'Avalanche Mochaccino Café Style box with a cup of mochaccino and dark chocolate on a lilac set',
  },
  caramel: {
    key: 'caramel', name: 'Caramel Latte', desc: 'Smooth coffee with a buttery caramel twist.', rating: 5.0, color: '#a9581f',
    url: `${SITE}/products/cafe-style-caramel-latte`, img: '/images/caramel.webp',
    heroAlt: 'Avalanche Caramel Latte Café Style box with a caramel-drizzled latte and salted caramel',
  },
  hazel: {
    key: 'hazel', name: 'Hazelnut Latte', desc: 'Nutty, creamy and perfectly balanced.', rating: 4.6, color: '#587a3f',
    url: `${SITE}/products/cafe-style-hazelnut-latte`, img: '/images/hazel.webp',
    heroAlt: 'Avalanche Hazelnut Latte Café Style box with a latte and hazelnuts on a sage green set',
  },
  irish: {
    key: 'irish', name: 'Irish Cream', desc: 'A smooth blend with a hint of Irish cream.', rating: 5.0, color: '#2c6a3a',
    url: `${SITE}/products/cafe-style-irish-cream`, img: '/images/irish.webp',
    heroAlt: 'Avalanche Irish Cream Café Style box with a latte, white chocolate and pistachio macarons',
  },
};

export const ORDER: FlavourKey[] = ['mocha', 'caramel', 'hazel', 'irish'];

export const PRICE = 54;
export const WAS_PRICE = 60;
export const FREE_SHIP = 75;

/* Ratings as shown on avalanchecoffee.com. Swap for your reviews API when you wire up Shopify / Judge.me. */
export const ALL_RATINGS: Array<[string, number]> = [
  ['Mochaccino', 5.0], ['Caramel Latte', 5.0], ['Hazelnut Latte', 4.6], ['Irish Cream', 5.0],
  ['Vanilla Latte', 4.75], ['Chai Latte', 5.0], ['Cappuccino', 4.86], ['Chai Turmeric Latte', 4.94],
];

export const pct = (r: number) => `${((r / 5) * 100).toFixed(1)}%`;
export const money = (n: number) => `$${n.toFixed(2)}`;
