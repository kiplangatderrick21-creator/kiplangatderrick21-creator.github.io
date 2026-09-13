import { researchAreas } from '@/lib/content';
import Button from '../ui/Button';
import Container from '../layout/Container';
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
    <section className="bg-ivory-50 py-24 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Research"
            title="Systematic research, from data to decision"
            description="We investigate the structure of markets with statistical rigor and a commitment to reproducibility."
          />
          <Button href="/research" variant="secondary" withArrow className="shrink-0">
            All research areas
          </Button>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((area) => (
            <div key={area.title} className="bg-ivory-50 p-6 sm:p-7">
              <h3 className="font-display text-xl leading-snug text-forest-900">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{area.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
