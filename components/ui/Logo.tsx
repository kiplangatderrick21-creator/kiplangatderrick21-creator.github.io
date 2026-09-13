import type { ReactNode, SVGProps } from 'react';

/* ---------------------------------------------------------------------------
   The Nivavale mark — a lattice "N".

   Seven nodes joined by six edges form an N: two vertical stems, and a diagonal
   that runs from the top-left node through a centre node to the bottom-right
   node. The nodes are diamonds, so the mark reads simultaneously as a letter and
   as an interconnected data structure — quantitative systems, mathematical
   precision, and structure, rather than a stock-market pictogram.

   The construction is deliberate about symmetry. It is point-symmetric about its
   centre and mirror-symmetric about its main diagonal, which is what makes it
   feel balanced and engraved rather than drawn.

   The mark is pure geometry (no raster, no background, no gradient) and paints
   with `currentColor`, so it is identical in deep forest green on ivory, ivory
   on deep forest green, and single-colour black or white. The same paths are
   published as static files in /public/brand for reports, email signatures,
   business cards, and presentation decks.
   --------------------------------------------------------------------------- */

const VIEW_BOX = 48;

/** Node positions on a 3x3 grid: the corner joints, the stem midpoints, and the centre. */
const NODES = [
  [9, 9],
  [9, 24],
  [9, 39],
  [24, 24],
  [39, 9],
  [39, 24],
  [39, 39],
] as const;

/** Left stem, right stem, and the diagonal that passes through the centre node. */
const EDGES = ['M9 9L9 24', 'M9 24L9 39', 'M39 9L39 24', 'M39 24L39 39', 'M9 9L24 24', 'M24 24L39 39'];

const STROKE = 2.6;
const NODE_RADIUS = 2.4;

function nodePath(x: number, y: number): string {
  const r = NODE_RADIUS;
  return `M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}Z`;
}

export function LogoMark({
  size = 32,
  className = '',
  ...props
}: { size?: number; className?: string } & Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'width' | 'height'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="square">
        {EDGES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="currentColor">
        {NODES.map(([x, y]) => (
          <path key={`${x}-${y}`} d={nodePath(x, y)} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The horizontal brand lockup: mark followed by the wordmark. Both inherit the
 * surrounding text colour, so a single utility class sets the whole lockup to
 * ivory on dark or deep forest green on ivory.
 */
export default function Logo({
  markSize = 30,
  showWordmark = true,
  className = '',
  wordmark = 'Nivavale',
  children,
}: {
  markSize?: number;
  showWordmark?: boolean;
  className?: string;
  wordmark?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={markSize} />
      {showWordmark && (
        <span className="font-display text-[1.3rem] font-medium uppercase leading-none tracking-[0.24em]">
          {wordmark}
        </span>
      )}
      {children}
    </span>
  );
}
