import type { Metadata } from 'next';
import { analyticsCapabilities } from '@/lib/content';
import ExposureBars from '@/components/data-viz/ExposureBars';
import Container from '@/components/layout/Container';
import PageHero from '@/components/layout/PageHero';
import Panel from '@/components/ui/Panel';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Quantitative Analytics',
  description:
    'Portfolio, risk, and performance analytics built to be transparent, repeatable, and decision-relevant.',
  alternates: { canonical: '/analytics/' },
};

export default function AnalyticsPage() {
  const [featured, ...rest] = analyticsCapabilities;

  return (
    <>
      <PageHero
        eyebrow="Quantitative analytics"
        title="Clarity for risk, return, and performance."
        description="We bring structure to the numbers that matter — turning portfolios, exposures, and outcomes into analysis you can act on."
      />

      {/* The lead capability is given a wider plate; the rest rank below it in a
          single hairline grid, so the hierarchy is explicit. */}
      <section className="bg-ivory-200 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Analytics disciplines"
            description="The analytical capabilities Nivavale can apply to portfolios, risk, performance, and data."
          />

          <div className="mt-12 space-y-6">
            <div className="rounded-xs border border-rule bg-ivory-50 p-7 sm:p-9">
              <h3 className="font-display text-[1.6rem] leading-snug text-forest-900">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-muted">
                {featured.description}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <div key={item.title} className="bg-ivory-50 p-6 sm:p-7">
                  <h3 className="font-display text-lg leading-snug text-forest-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The analytical chain, on forest green with a Charcoal Navy data panel. */}
      <section className="bg-forest-900 py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            tone="dark"
            eyebrow="How we think"
            title="Measure, attribute, explain, act"
            description="Good analytics is a chain: measure what matters, attribute where it comes from, explain it clearly, and act with confidence."
          />

          <Panel label="Distribution" tone="navy">
            <ExposureBars className="h-56 w-full" tone="navy" />
          </Panel>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
