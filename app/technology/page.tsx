import type { Metadata } from 'next';
import { engineeringPrinciples, technologyLayers, technologyStack } from '@/lib/content';
import CTASection from '@/components/home/CTASection';
import StackLedger from '@/components/data-viz/StackLedger';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Technology & Systems',
  description:
    'Nivavale technology philosophy: Python, data pipelines, research infrastructure, algorithmic systems, backtesting, APIs, and automated workflows.',
  alternates: { canonical: '/technology/' },
};

const sections = [
  { label: 'Research stack', href: '#stack' },
  { label: 'Tools and systems', href: '#tools' },
  { label: 'How we build', href: '#principles' },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & systems"
        title="Engineering for dependable research."
        description="Our technology philosophy favors simple, reproducible, and reliable systems — built around Python and a disciplined approach to data and automation."
        links={sections}
      />

      {/* The stack, documented as an ordered ledger rather than a diagram. */}
      <Section id="stack" tone="forest" labelledBy="stack-heading">
        <SectionHeading
          id="stack-heading"
          tone="dark"
          eyebrow="Technology stack"
          title="The research stack"
          description="How the layers of the stack relate to one another, from raw data at the base to the interfaces on top."
        />
        <StackLedger className="mt-8" layers={technologyLayers} tone="forest" />
      </Section>

      {/* Each discipline, described once, in a specification grid. */}
      <Section id="tools" labelledBy="tools-heading">
        <SectionHeading
          id="tools-heading"
          eyebrow="Disciplines"
          title="Tools and systems"
          description="The technologies and system disciplines that shape how we work. We describe our approach honestly and do not imply that any specific system is operational beyond what is stated."
        />

        <dl className="mt-8 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {technologyStack.map((item) => (
            <div key={item.title} className="bg-ivory-50 p-5">
              <dt className="font-display text-lg leading-snug text-forest-900">{item.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="principles" tone="ivory-alt" labelledBy="principles-heading">
        <SectionHeading id="principles-heading" eyebrow="Engineering principles" title="How we build" />

        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringPrinciples.map((item, index) => (
            <div key={item.title} className="border-t border-rule-strong pt-4">
              <span
                aria-hidden="true"
                className="text-[11px] font-semibold tracking-[0.2em] text-gold-600"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg leading-snug text-forest-900">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
