import { technologyStack } from '@/lib/content';
import Button from '../ui/Button';
import Section from '../layout/Section';
import SectionHeading from '../ui/SectionHeading';

/**
 * Technology, presented as a specification sheet.
 *
 * Heading and grid run full width rather than as a narrow label column against a
 * narrow body: eight capabilities then read as four cells across on a laptop
 * instead of a tall two-column list, which is both shorter and easier to scan.
 */
export default function TechnologyPreview() {
  return (
    <Section tone="ivory" labelledBy="technology-preview-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <SectionHeading
          id="technology-preview-heading"
          eyebrow="Technology & systems"
          title="Engineering built for research"
          description="A technology philosophy centered on Python, reproducibility, and dependable data infrastructure."
        />
        <Button href="/technology" variant="secondary" withArrow className="shrink-0">
          Our technology approach
        </Button>
      </div>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {technologyStack.map((item) => (
          <div key={item.title} className="bg-ivory-50 p-5">
            <dt className="font-display text-base leading-snug text-forest-900 sm:text-lg">
              {item.title}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
