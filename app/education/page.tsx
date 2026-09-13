import type { Metadata } from 'next';
import { educationTopics } from '@/lib/content';
import Container from '@/components/layout/Container';
import PageHero from '@/components/layout/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Education',
  description:
    'Quantitative education from Nivavale: quantitative finance, algorithmic trading, statistics, financial modelling, Python for finance, and systematic research.',
  alternates: { canonical: '/education/' },
};

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Education"
        title="Quantitative learning, taught with rigor."
        description="Clear, structured instruction in the methods and tools of systematic finance — designed to build genuine understanding, not just familiarity."
      />

      {/* Curriculum as a syllabus: ruled rows, numbered, read like a prospectus. */}
      <section className="bg-ivory-200 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Curriculum"
            title="Subjects we teach"
            description="A foundation across the disciplines that underpin systematic, quantitative work in finance."
          />

          <ol className="mt-12 divide-y divide-rule border-y border-rule">
            {educationTopics.map((topic, index) => (
              <li
                key={topic.title}
                className="grid gap-2 py-6 sm:grid-cols-[3rem_16rem_1fr] sm:items-baseline sm:gap-8 sm:py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-xl leading-none text-gold-600"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl leading-snug text-forest-900">{topic.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{topic.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The teaching philosophy, set as an editorial statement. */}
      <section className="bg-navy-900 py-20 sm:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Our approach"
            title="An educational, not promotional, tone"
          />
          <p className="mx-auto mt-9 max-w-2xl text-center font-display text-[1.5rem] leading-snug text-on-dark sm:text-[1.7rem]">
            We teach because better quantitative literacy leads to better decisions. Learning is
            built on first principles, worked examples, and honest discussion of limitations.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
