import type { Metadata } from 'next';
import { educationTopics } from '@/lib/content';
import CTASection from '@/components/home/CTASection';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Education',
  description:
    'Quantitative education from Nivavale: quantitative finance, algorithmic trading, statistics, financial modelling, Python for finance, and systematic research.',
  alternates: { canonical: '/education/' },
};

const sections = [
  { label: 'Subjects we teach', href: '#subjects' },
  { label: 'Our approach', href: '#approach' },
];

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Education"
        title="Quantitative learning, taught with rigor."
        description="Clear, structured instruction in the methods and tools of systematic finance — designed to build genuine understanding, not just familiarity."
        links={sections}
      />

      {/* Curriculum as a syllabus: ruled rows, numbered, read like a prospectus. */}
      <Section id="subjects" labelledBy="subjects-heading">
        <SectionHeading
          id="subjects-heading"
          eyebrow="Curriculum"
          title="Subjects we teach"
          description="A foundation across the disciplines that underpin systematic, quantitative work in finance."
        />

        <ol className="mt-8 divide-y divide-rule border-y border-rule">
          {educationTopics.map((topic, index) => (
            <li
              key={topic.title}
              className="grid gap-1.5 py-5 sm:grid-cols-[2.5rem_14rem_1fr] sm:items-baseline sm:gap-6 sm:py-6"
            >
              <span aria-hidden="true" className="font-display text-lg leading-none text-gold-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg leading-snug text-forest-900 sm:text-xl">
                {topic.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{topic.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* The teaching philosophy, set as an editorial statement. */}
      <Section id="approach" tone="navy" spacing="compact" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          tone="dark"
          align="center"
          eyebrow="Our approach"
          title="An educational, not promotional, tone"
        />
        <p className="mx-auto mt-7 max-w-2xl text-center font-display text-[1.375rem] leading-snug text-on-dark sm:text-[1.5rem]">
          We teach because better quantitative literacy leads to better decisions. Learning is built
          on first principles, worked examples, and honest discussion of limitations.
        </p>
      </Section>

      <CTASection />
    </>
  );
}
