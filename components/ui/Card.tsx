import type { ReactNode } from 'react';

type Tone = 'ivory' | 'forest' | 'navy';

/**
 * Framed content surface. Corners are near-square and edges are hairlines, so
 * cards read as engraved plates rather than floating app tiles: warm ivory on
 * light pages, deep forest green or charcoal navy on dark ones.
 */
const tones: Record<Tone, string> = {
  ivory: 'border-rule bg-ivory-50',
  forest: 'border-rule-dark bg-forest-800',
  navy: 'border-rule-navy bg-navy-800',
};

export default function Card({
  children,
  tone = 'ivory',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`rounded-xs border p-6 sm:p-7 ${tones[tone]} ${className}`}>{children}</div>
  );
}

