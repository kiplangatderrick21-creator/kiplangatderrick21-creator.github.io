/* ---------------------------------------------------------------------------
   Exposure bars.

   A decorative, unit-free distribution figure: a baseline, hairline gridlines,
   a field of muted bars, and two accented bars that mark the largest
   observations in the series.

   Like the signal plot it carries no values and is hidden from assistive
   technology, so it illustrates the shape of a distribution rather than
   reporting one. Bars are filled rather than stroked, so they survive the
   stretched viewBox without distortion.
   --------------------------------------------------------------------------- */

const WIDTH = 480;
const BASELINE = 208;
const TOP = 24;
const SPAN = BASELINE - TOP;

const SLOT = 30;
const BAR_WIDTH = 16;
const INSET = (SLOT - BAR_WIDTH) / 2;

/** Relative magnitudes, 0–200, chosen to read as a right-skewed distribution. */
const BARS = [46, 88, 62, 118, 74, 150, 96, 176, 68, 132, 54, 104, 42, 84, 158, 72];

/** The two dominant observations, drawn in full gold. */
const ACCENT_INDICES = [7, 14];

const GRID_Y = [TOP + SPAN / 4, TOP + SPAN / 2, TOP + (SPAN * 3) / 4];

const TONES = {
  forest: 'text-forest-300',
  navy: 'text-navy-300',
} as const;

export default function ExposureBars({
  className = '',
  tone = 'forest',
}: {
  className?: string;
  tone?: keyof typeof TONES;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${BASELINE + 12}`}
      preserveAspectRatio="none"
      className={`${TONES[tone]} ${className}`}
    >
      <g className="stroke-current" strokeOpacity={0.16} strokeWidth={1}>
        {GRID_Y.map((y) => (
          <line key={y} x1={0} y1={y} x2={WIDTH} y2={y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g className="fill-current" fillOpacity={0.22}>
        {BARS.map((value, index) => {
          const height = (value / 200) * SPAN;
          return (
            <rect
              key={index}
              x={index * SLOT + INSET}
              y={BASELINE - height}
              width={BAR_WIDTH}
              height={height}
            />
          );
        })}
      </g>

      <g className="fill-gold-400">
        {ACCENT_INDICES.map((index) => {
          const height = (BARS[index] / 200) * SPAN;
          return (
            <rect
              key={index}
              x={index * SLOT + INSET}
              y={BASELINE - height}
              width={BAR_WIDTH}
              height={height}
            />
          );
        })}
      </g>

      <line
        x1={0}
        y1={BASELINE}
        x2={WIDTH}
        y2={BASELINE}
        className="stroke-current"
        strokeOpacity={0.4}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
