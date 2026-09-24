import type { Metadata } from 'next';
import { analyticsCapabilities } from '@/lib/content';
import CTASection from '@/components/home/CTASection';
import ExposureBars from '@/components/data-viz/ExposureBars';
import PageHero from '@/components/layout/PageHero';
import Panel from '@/components/ui/Panel';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Quantitative Analytics',
  description:
    'Portfolio, risk, and performance analytics built to be transparent, repeatable, and decision-relevant.',
  alternates: { canonical: '/analytics/' },
};

const sections = [
  { label: 'Analytics disciplines', href: '#capabilities' },
  { label: 'How we think', href: '#approach' },
];

export default function AnalyticsPage() {
  const [featured, ...rest] = analyticsCapabilities;

  return (
    <>
      <PageHero
        eyebrow="Quantitative analytics"
        title="Clarity for risk, return, and performance."
        description="We bring structure to the numbers that matter — turning portfolios, exposures, and outcomes into analysis you can act on."
        links={sections}
      />

      {/* The lead capability is given a wider plate; the rest rank below it in a
          single hairline grid, so the hierarchy is explicit. */}
      <Section id="capabilities" labelledBy="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Capabilities"
          title="Analytics disciplines"
          description="The analytical capabilities Nivavale can apply to portfolios, risk, performance, and data."
        />

        <div className="mt-8 space-y-5">
          <div className="rounded-xs border border-rule bg-ivory-50 p-6 sm:p-7">
            <h3 className="font-display text-xl leading-snug text-forest-900 sm:text-2xl">
              {featured.title}
            </h3>
            <p className="mt-2.5 max-w-3xl text-base leading-relaxed text-ink-muted">
              {featured.description}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <div key={item.title} className="bg-ivory-50 p-5 sm:p-6">
                <h3 className="font-display text-lg leading-snug text-forest-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The analytical chain, on forest green with a Charcoal Navy data panel. */}
      <Section
        id="approach"
        tone="forest"
        labelledBy="approach-heading"
        containerClassName="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        <SectionHeading
          id="approach-heading"
          tone="dark"
          eyebrow="How we think"
          title="Measure, attribute, explain, act"
          description="Good analytics is a chain: measure what matters, attribute where it comes from, explain it clearly, and act with confidence."
        />

        <Panel label="Distribution" tone="navy">
          <ExposureBars className="h-44 w-full sm:h-52" tone="navy" />
        </Panel>
      </Section>

      <CTASection />
    </>
  );
}
