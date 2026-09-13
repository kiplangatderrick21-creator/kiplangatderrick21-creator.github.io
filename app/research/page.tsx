import type { Metadata } from 'next';
import { researchAreas } from '@/lib/content';
import Card from '@/components/ui/Card';
import Container from '@/components/layout/Container';
import PageHero from '@/components/layout/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Nivavale quantitative research capabilities across factor research, alpha research, statistical modelling, machine learning, and more.',
  alternates: { canonical: '/research/' },
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="The systematic study of markets."
        description="We pursue quantitative research as a discipline: careful framing, rigorous statistics, and honest validation against data."
      />

      {/* Research areas as individual plates: a long list is easier to scan when
          every entry is self-contained. */}
      <section className="bg-ivory-200 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Areas of research"
            description="These represent the areas in which Nivavale conducts and applies research. They describe capability and method, not specific results."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <Card key={area.title} className="flex flex-col">
                <h3 className="font-display text-xl leading-snug text-forest-900">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{area.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-50 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl border-l-2 border-gold-400/60 pl-6">
            <p className="text-base leading-relaxed text-ink-muted">
              A note on expectations: research is a process of disciplined inquiry, not a promise of
              outcomes. We describe our capabilities honestly and avoid presenting research areas as
              claims of performance or results.
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
