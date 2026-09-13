/* ---------------------------------------------------------------------------
   Signal plot.

   A decorative, unit-free time-series figure for research panels: hairline
   gridlines, an axis rule, one muted reference series, one accented series, and
   tick marks at the recorded observations.

   It carries no numbers, no values, and no axis labels, and it is hidden from
   assistive technology, so it can never be read as a performance record. The
   geometry is deliberately abstract: this is an illustration of method, not a
   claim of results.

   Strokes use `vector-effect: non-scaling-stroke` and the figure is drawn in a
   stretched viewBox, so lines stay exactly one pixel crisp at every width.
   --------------------------------------------------------------------------- */

const WIDTH = 480;
const TOP = 24;
const BASELINE = 208;
const SPAN = BASELINE - TOP;
const SCALE = 200;

/** Reference series: quieter, and the comparison line in the panel. */
const REFERENCE = [168, 162, 158, 150, 154, 142, 138, 132, 126, 120, 118, 110, 106];

/** Primary series: the series the panel draws attention to. */
const PRIMARY = [152, 138, 146, 118, 126, 96, 104, 84, 62, 74, 58, 44, 36];

/** Every third observation is marked with a tick, to keep the figure uncluttered. */
const TICK_INDICES = [0, 3, 6, 9, 12];

const STEP = WIDTH / (PRIMARY.length - 1);

function pointsFor(values: number[]): string {
  return values
    .map((value, index) => `${(index * STEP).toFixed(1)},${(BASELINE - (value / SCALE) * SPAN).toFixed(1)}`)
    .join(' ');
}

function yFor(value: number): number {
  return BASELINE - (value / SCALE) * SPAN;
}

const GRID_Y = [TOP, TOP + SPAN / 4, TOP + SPAN / 2, TOP + (SPAN * 3) / 4];

const TONES = {
  forest: 'text-forest-300',
  navy: 'text-navy-300',
} as const;

export default function SignalPlot({
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

      <polygon
        points={`0,${BASELINE} ${pointsFor(PRIMARY)} ${WIDTH},${BASELINE}`}
        className="fill-gold-400"
        fillOpacity={0.06}
      />

      <polyline
        points={pointsFor(REFERENCE)}
        fill="none"
        className="stroke-current"
        strokeOpacity={0.45}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />

      <g className="stroke-gold-400" strokeWidth={1.5} vectorEffect="non-scaling-stroke">
        {TICK_INDICES.map((index) => {
          const y = yFor(PRIMARY[index]);
          const x = index * STEP;
          return <line key={index} x1={x} y1={y - 4} x2={x} y2={y + 4} vectorEffect="non-scaling-stroke" />;
        })}
      </g>

      <polyline
        points={pointsFor(PRIMARY)}
        fill="none"
        className="stroke-gold-400"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
