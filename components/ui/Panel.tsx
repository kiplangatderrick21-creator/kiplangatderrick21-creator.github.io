import type { ReactNode } from 'react';

type Tone = 'navy' | 'forest';

const tones: Record<
  Tone,
  { frame: string; rule: string; label: string; footer: string }
> = {
  navy: {
    frame: 'border-rule-navy bg-navy-900',
    rule: 'border-rule-navy',
    label: 'text-navy-300',
    footer: 'text-navy-300',
  },
  forest: {
    frame: 'border-rule-dark bg-forest-900',
    rule: 'border-rule-dark',
    label: 'text-forest-300',
    footer: 'text-forest-300',
  },
};

/**
 * Instrument panel: the recurring frame for charts, exposures, and research
 * data. A hairline header carries the panel label and a restrained status
 * marker, and the body holds the visual. Used on dark sections only, so the
 * data sits on charcoal navy or deep forest green rather than on the page.
 */
export default function Panel({
  label,
  children,
  tone = 'navy',
  footer,
  className = '',
}: {
  label: string;
  children: ReactNode;
  tone?: Tone;
  footer?: ReactNode;
  className?: string;
}) {
  const t = tones[tone];

  return (
    <figure className={`overflow-hidden rounded-xs border ${t.frame} ${className}`}>
      <figcaption className={`flex items-center justify-between gap-4 border-b ${t.rule} px-5 py-3.5`}>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${t.label}`}>
          {label}
        </span>
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-gold-400/45" />
          <span className="h-1 w-1 rounded-full bg-gold-400/65" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        </span>
      </figcaption>
      <div className="px-5 py-6 sm:px-6 sm:py-7">{children}</div>
      {footer && (
        <div className={`border-t ${t.rule} px-5 py-3.5 text-[11px] tracking-[0.14em] ${t.footer}`}>
          {footer}
        </div>
      )}
    </figure>
  );
}
