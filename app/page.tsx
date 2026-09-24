import DisciplinesStrip from '@/components/home/DisciplinesStrip';
import Hero from '@/components/home/Hero';
import ResearchPreview from '@/components/home/ResearchPreview';
import AnalyticsPreview from '@/components/home/AnalyticsPreview';
import TechnologyPreview from '@/components/home/TechnologyPreview';
import EducationPreview from '@/components/home/EducationPreview';
import Methodology from '@/components/home/Methodology';
import CTASection from '@/components/home/CTASection';

/**
 * Homepage.
 *
 * Eight bands, each one a distinct idea, on a single spacing rhythm: the hero,
 * the capability index, then one section per discipline, the firm's methodology,
 * and the closing call to action. Nothing is described twice.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DisciplinesStrip />
      <ResearchPreview />
      <AnalyticsPreview />
      <TechnologyPreview />
      <EducationPreview />
      <Methodology />
      <CTASection />
    </>
  );
}

