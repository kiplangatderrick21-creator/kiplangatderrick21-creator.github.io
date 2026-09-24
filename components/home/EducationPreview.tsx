import { educationTopics } from '@/lib/content';
import Button from '../ui/Button';
import Section from '../layout/Section';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';

/**
 * Education, as an editorial syllabus entry.
 *
 * Centred heading on warm ivory, the subjects listed as catalogue tags, and one
 * quiet call to action. No course-marketing language, no pricing, no badges.
 */
export default function EducationPreview() {
  return (
    <Section tone="ivory-alt" labelledBy="education-preview-heading">
      <SectionHeading
        id="education-preview-heading"
        align="center"
        eyebrow="Education"
        title="Quantitative learning, taught with rigor"
        description="Practical, institutional instruction in the methods and tools of systematic finance."
      />

      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {educationTopics.map((topic) => (
          <li key={topic.title}>
            <Tag>{topic.title}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Button href="/education" variant="primary" withArrow>
          Explore education
        </Button>
      </div>
    </Section>
  );
}
