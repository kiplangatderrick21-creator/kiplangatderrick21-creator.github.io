import { researchAreas } from '@/lib/content';
import Button from '../ui/Button';
import Section from '../layout/Section';
import SectionHeading from '../ui/SectionHeading';

/**
 * Research areas, as a hairline grid.
 *
 * The section background is the same warm ivory as the cells, so only the
 * dividing rules are visible. The result reads as a printed index of research
 * areas rather than a set of products.
 */
export default function ResearchPreview() {
  const featured = researchAreas.slice(0, 6);

  return (
    <Section tone="ivory-alt" labelledBy="research-preview-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <SectionHeading
          id="research-preview-heading"
          eyebrow="Research"
          title="Systematic research, from data to decision"
          description="We investigate the structure of markets with statistical rigor and a commitment to reproducibility."
        />
        <Button href="/research" variant="secondary" withArrow className="shrink-0">
          All research areas
        </Button>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((area) => (
          <div key={area.title} className="bg-ivory-50 p-5 sm:p-6">
            <h3 className="font-display text-lg leading-snug text-forest-900 sm:text-xl">
              {area.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{area.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
