import { principles } from '@/lib/content';
import Container from '../layout/Container';
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
    <section className="bg-forest-950 py-24 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Methodology & philosophy"
          title="How we think about quantitative work"
          description="A few principles that shape how we approach research, analytics, and engineering."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((principle, index) => (
            <div key={principle.title} className="border-t border-rule-dark pt-6">
              <span aria-hidden="true" className="font-display text-3xl leading-none text-gold-400/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl leading-snug text-on-dark">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
