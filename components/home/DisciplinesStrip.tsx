import Link from 'next/link';
import { capabilities } from '@/lib/content';
import Section from '../layout/Section';
import { ArrowUpRight } from '../ui/Icon';

/** Each capability links to the page that expands it. */
const links: Record<string, string> = {
  'Quantitative Research': '/research',
  'Financial Analytics': '/analytics',
  'Data & Technology': '/technology',
  'Quantitative Education': '/education',
};

/**
 * Capability index.
 *
 * Sits immediately below the hero and gives the homepage its four clear routes —
 * research, analytics, technology, and education. It is the single place on the
 * homepage where the four disciplines are described: a ruled index plate, two
 * cells across on a laptop and one on a phone, replacing the previous pair of
 * near-identical sections.
 */
export default function DisciplinesStrip() {
  return (
    <Section tone="forest" spacing="flush-top" labelledBy="capability-index-heading">
      <div className="flex items-center gap-4">
        <h2
          id="capability-index-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400"
        >
          What we do
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-rule-dark" />
      </div>

      <ul className="mt-5 grid gap-px overflow-hidden rounded-xs border border-rule-dark bg-rule-dark sm:grid-cols-2">
        {capabilities.map((item, index) => (
          <li key={item.title} className="bg-forest-900">
            <Link
              href={links[item.title]}
              className="group flex h-full flex-col p-5 transition-colors hover:bg-forest-800 sm:p-6"
            >
              <span className="flex items-center justify-between gap-4">
                <span aria-hidden="true" className="font-display text-base leading-none text-gold-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-gold-400/70 transition-colors group-hover:text-gold-200"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-3 font-display text-[1.25rem] leading-snug text-on-dark transition-colors group-hover:text-gold-200">
                {item.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
