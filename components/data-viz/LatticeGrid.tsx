/**
 * Lattice field.
 *
 * The brand's geometric motif used as a surface texture: a seamless diamond
 * mesh with a centre cross, drawn to the same proportions as the logo's nodes.
 * Rendered as a CSS background so it costs no DOM nodes and cannot collide with
 * other SVG pattern ids on the page.
 *
 * Colour and intensity are the caller's decision — the tone sets the stroke
 * colour and a Tailwind opacity utility on the element sets the intensity, so a
 * hero can sit at `opacity-[0.55]` and a call to action at `opacity-30`.
 */
const TONES = {
  forest: '#1b3a2d',
  navy: '#2a3a45',
} as const;

function latticeDataUri(size: number, color: string): string {
  const half = size / 2;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><g fill='none' stroke='${color}' stroke-width='1'><path d='M0 ${half}L${half} 0L${size} ${half}L${half} ${size}Z'/><path d='M${half} 0V${size}'/><path d='M0 ${half}H${size}'/></g></svg>`;
  return encodeURIComponent(svg).replace(/#/g, '%23').replace(/'/g, '%27');
}

export default function LatticeGrid({
  className = '',
  tone = 'forest',
  size = 64,
}: {
  className?: string;
  tone?: keyof typeof TONES;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${latticeDataUri(size, TONES[tone])}")`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
