import DisciplinesStrip from '@/components/home/DisciplinesStrip';
import Hero from '@/components/home/Hero';
import Capabilities from '@/components/home/Capabilities';
import ResearchPreview from '@/components/home/ResearchPreview';
import AnalyticsPreview from '@/components/home/AnalyticsPreview';
import TechnologyPreview from '@/components/home/TechnologyPreview';
import EducationPreview from '@/components/home/EducationPreview';
import Methodology from '@/components/home/Methodology';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <DisciplinesStrip />
      <Capabilities />
      <ResearchPreview />
      <AnalyticsPreview />
      <TechnologyPreview />
      <EducationPreview />
      <Methodology />
      <CTASection />
    </>
  );
}

