import type { Metadata } from 'next';
import { capabilities, principles, researchApproach } from '@/lib/content';
import CTASection from '@/components/home/CTASection';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Nivavale is, what the firm focuses on, its philosophy, and its approach to quantitative research.',
  alternates: { canonical: '/about/' },
};

/** The page's bands, in order, for the index in the hero. */
const sections = [
  { label: 'Who we are', href: '#who-we-are' },
  { label: 'What we focus on', href: '#focus' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Approach', href: '#approach' },
  { label: 'Vision', href: '#vision' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nivavale"
        title="Quantitative intelligence, applied with discipline."
        description="Nivavale is a quantitative intelligence and technology firm working at the intersection of research, data, analytics, and engineering."
        links={sections}
      />

      {/* Institutional story: a narrow label column against a wider body column. */}
      <Section id="who-we-are" labelledBy="who-we-are-heading">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            id="who-we-are-heading"
            eyebrow="Who we are"
            title="A firm built around evidence and method"
          />
          <div className="space-y-4 text-base leading-relaxed text-ink lg:max-w-[38rem]">
            <p>
              Nivavale focuses on the disciplined application of quantitative methods to financial
              questions. Our work spans quantitative research, financial analytics, data and
              technology, and quantitative education — connected by a shared commitment to rigor,
              reproducibility, and clarity.
            </p>
            <p className="text-ink-muted">
              We believe that better decisions come from better evidence. That means treating
              markets as systems to be understood through data, statistics, and computation, and
              holding every model to a high standard of honesty about what it can and cannot tell
              us.
            </p>
          </div>
        </div>
      </Section>

      {/* The four disciplines, as one hairline plate. */}
      <Section id="focus" tone="ivory-alt" labelledBy="focus-heading">
        <SectionHeading
          id="focus-heading"
          eyebrow="What we focus on"
          title="Four connected disciplines"
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <div key={item.title} className="flex flex-col bg-ivory-50 p-5 sm:p-6">
              <span aria-hidden="true" className="font-display text-xl leading-none text-gold-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-lg leading-snug text-forest-900 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Philosophy on Charcoal Navy: the research-facing panel tone. */}
      <Section id="philosophy" tone="navy" labelledBy="philosophy-heading">
        <SectionHeading
          id="philosophy-heading"
          tone="dark"
          eyebrow="Philosophy"
          title="Principles that guide our work"
        />

        <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {principles.map((principle, index) => (
            <div key={principle.title} className="border-t border-rule-navy pt-5">
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

      {/* The research process as an ordered rail. */}
      <Section id="approach" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          eyebrow="Approach to research"
          title="A disciplined process"
          description="Our research follows a clear, repeatable sequence — from a well-formed question to a validated, honest answer."
        />

        <ol className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {researchApproach.map((step, index) => (
            <li key={step.title} className="border-t border-rule-strong pt-4">
              <span
                aria-hidden="true"
                className="text-[11px] font-semibold tracking-[0.2em] text-gold-600"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg leading-snug text-forest-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Long-term vision, with the company-details note kept explicit. */}
      <Section id="vision" tone="ivory-alt" labelledBy="vision-heading">
        <SectionHeading id="vision-heading" eyebrow="Long-term vision" title="Where we're headed" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
          Our long-term ambition is to build a firm that meaningfully improves how quantitative work
          is done — through better research, better tools, and better education — and to hold
          ourselves to the standard of the institutions we admire. We measure progress by the quality
          of our methods and the trust they earn, not by shortcuts.
        </p>

        <div className="mt-7 max-w-3xl border-l-2 border-gold-400/60 bg-ivory-200 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
            Company details — placeholder
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Founding year, team, locations, and history will be added here. This section is
            intentionally left as a placeholder so that no unverified information is published.
          </p>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
