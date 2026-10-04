import { pct } from '@/lib/data';
import type { CSSVars } from '@/lib/motion';

export function Stars({ rating, index, className = 'stars' }: { rating: number; index?: number; className?: string }) {
  const style: CSSVars = { '--pct': pct(rating) };
  if (index !== undefined) style['--i'] = index;
  return <span className={className} style={style} role="img" aria-label={`Rated ${rating} out of 5`} />;
}
