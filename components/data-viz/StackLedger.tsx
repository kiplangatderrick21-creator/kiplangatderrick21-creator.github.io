import type { ReactNode } from 'react';
import Tag from '../ui/Tag';

type Tone = 'forest' | 'navy';

const tones: Record<Tone, { rail: string; divide: string; rule: string; index: string }> = {
  forest: {
    rail: 'border-rule-dark',
    divide: 'divide-rule-dark',
    rule: 'bg-rule-dark',
    index: 'text-gold-400',
  },
  navy: {
    rail: 'border-rule-navy',
    divide: 'divide-rule-navy',
    rule: 'bg-rule-navy',
    index: 'text-gold-400',
  },
};

/**
 * Stack ledger.
 *
 * The research stack presented the way an engineering team would document it: a
 * numbered, hairline-ruled ledger from data up to interfaces, with the
 * components of each layer itemised. No diagram chrome, no boxes-with-icons —
 * just an ordered structure, which is both quieter and easier to read.
 *
 * Rendered as an ordered list so the layer order is meaningful to assistive
 * technology as well as to the eye.
 */
export default function StackLedger({
  layers,
  tone = 'forest',
  className = '',
  intro,
}: {
  layers: Array<{ label: string; items: string[] }>;
  tone?: Tone;
  className?: string;
  intro?: ReactNode;
}) {
  const t = tones[tone];

  return (
    <div className={className}>
      {intro}
      <ol className={`divide-y border-y ${t.divide} ${t.rail}`}>
        {layers.map((layer, index) => (
          <li key={layer.label} className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr] sm:items-start sm:gap-8">
            <span className="flex items-center gap-3">
              <span className={`font-display text-xl leading-none ${t.index}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className={`h-px w-4 ${t.rule}`} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-dark-muted">
                {layer.label}
              </span>
            </span>
            <span className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <Tag key={item} tone={tone}>
                  {item}
                </Tag>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
