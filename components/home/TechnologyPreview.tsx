import { technologyStack } from '@/lib/content';
import Button from '../ui/Button';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';

/**
 * Technology, presented as a specification sheet.
 *
 * Eight capabilities in a hairline grid, each named and described in one line.
 * Understated by construction: the discipline is in the structure, not in the
 * decoration.
 */
export default function TechnologyPreview() {
  return (
    <section className="bg-ivory-200 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <SectionHeading
          eyebrow="Technology & systems"
          title="Engineering built for research"
          description="A technology philosophy centered on Python, reproducibility, and dependable data infrastructure."
        />

        <div>
          <dl className="grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2">
            {technologyStack.map((item) => (
              <div key={item.title} className="bg-ivory-50 p-5 sm:p-6">
                <dt className="font-display text-lg leading-snug text-forest-900">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</dd>
              </div>
            ))}
          </dl>

          <Button href="/technology" variant="secondary" withArrow className="mt-8">
            Our technology approach
          </Button>
        </div>
      </Container>
    </section>
  );
}
