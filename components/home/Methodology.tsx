import { principles } from '@/lib/content';
import Section from '../layout/Section';
import SectionHeading from '../ui/SectionHeading';

/**
 * Methodology and philosophy.
 *
 * The four principles are set as numbered entries over hairline rules, mirroring
 * how the firm documents its own research: an ordered set of commitments, not a
 * list of selling points.
 */
export default function Methodology() {
  return (
    <Section tone="forest-deep" labelledBy="methodology-heading">
      <SectionHeading
        id="methodology-heading"
        tone="dark"
        eyebrow="Methodology & philosophy"
        title="How we think about quantitative work"
        description="A few principles that shape how we approach research, analytics, and engineering."
      />

      <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {principles.map((principle, index) => (
          <div key={principle.title} className="border-t border-rule-dark pt-5">
            <span aria-hidden="true" className="font-display text-2xl leading-none text-gold-400/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-lg leading-snug text-on-dark sm:text-xl">
              {principle.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
