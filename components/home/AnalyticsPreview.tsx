import { analyticsCapabilities } from '@/lib/content';
import ExposureBars from '../data-viz/ExposureBars';
import Button from '../ui/Button';
import Container from '../layout/Container';
import Panel from '../ui/Panel';
import SectionHeading from '../ui/SectionHeading';

/**
 * Quantitative analytics.
 *
 * Deep Forest Green as the field with a Charcoal Navy instrument panel on top:
 * the two dark brand colours in one section, which separates the analysis
 * surface from the page it sits on without introducing a third tone.
 */
export default function AnalyticsPreview() {
  const featured = analyticsCapabilities.slice(0, 3);

  return (
    <section className="bg-forest-900 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Quantitative analytics"
            title="Analytics that clarify risk and performance"
            description="Portfolio, risk, and performance analysis built to be transparent, repeatable, and decision-relevant."
          />

          <dl className="mt-10 space-y-6">
            {featured.map((item) => (
              <div key={item.title} className="border-l border-gold-400/50 pl-5">
                <dt className="font-display text-xl leading-snug text-on-dark">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-on-dark-muted">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>

          <Button href="/analytics" variant="secondary" dark withArrow className="mt-10">
            Explore analytics
          </Button>
        </div>

        <Panel
          label="Exposure profile"
          tone="navy"
          footer={
            <span className="flex items-center justify-between uppercase tracking-[0.18em]">
              <span>Risk</span>
              <span>Return</span>
              <span>Factor</span>
            </span>
          }
        >
          <ExposureBars className="h-56 w-full" tone="navy" />
        </Panel>
      </Container>
    </section>
  );
}
