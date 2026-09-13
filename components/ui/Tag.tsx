import type { ReactNode } from 'react';

type Tone = 'ivory' | 'forest' | 'navy';

const tones: Record<Tone, string> = {
  ivory: 'border-rule-strong text-ink',
  forest: 'border-rule-dark-strong text-on-dark',
  navy: 'border-rule-navy text-on-dark',
};

/**
 * Small classification label — a discipline, subject, or data tag. Square,
 * hairline-bordered, and set in tracked small caps so it reads as a catalogue
 * entry rather than a marketing pill.
 */
export default function Tag({
  children,
  tone = 'ivory',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-xs border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

