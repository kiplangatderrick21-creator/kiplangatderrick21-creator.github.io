import type { Metadata } from 'next';
import { researchAreas } from '@/lib/content';
import CTASection from '@/components/home/CTASection';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Nivavale quantitative research capabilities across factor research, alpha research, statistical modelling, machine learning, and more.',
  alternates: { canonical: '/research/' },
};

const sections = [
  { label: 'Areas of research', href: '#areas' },
  { label: 'Reading this page', href: '#notes' },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="The systematic study of markets."
        description="We pursue quantitative research as a discipline: careful framing, rigorous statistics, and honest validation against data."
        links={sections}
      />

      {/* Research areas as one ruled plate: the index reads as a catalogue, and a
          three-across grid keeps ten entries to four short rows on a laptop. */}
      <Section id="areas" labelledBy="areas-heading">
        <SectionHeading
          id="areas-heading"
          eyebrow="Capabilities"
          title="Areas of research"
          description="These represent the areas in which Nivavale conducts and applies research. They describe capability and method, not specific results."
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <div key={area.title} className="bg-ivory-50 p-5 sm:p-6">
              <h3 className="font-display text-lg leading-snug text-forest-900 sm:text-xl">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="notes" tone="ivory-alt" spacing="compact" labelledBy="notes-heading">
        <div className="max-w-3xl border-l-2 border-gold-400/60 pl-5">
          <h2
            id="notes-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700"
          >
            Reading this page
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            A note on expectations: research is a process of disciplined inquiry, not a promise of
            outcomes. We describe our capabilities honestly and avoid presenting research areas as
            claims of performance or results.
          </p>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
