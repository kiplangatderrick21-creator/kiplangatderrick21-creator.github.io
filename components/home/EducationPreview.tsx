import { educationTopics } from '@/lib/content';
import Button from '../ui/Button';
import Container from '../layout/Container';
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
    <section className="bg-ivory-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Education"
          title="Quantitative learning, taught with rigor"
          description="Practical, institutional instruction in the methods and tools of systematic finance."
        />

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {educationTopics.map((topic) => (
            <li key={topic.title}>
              <Tag>{topic.title}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Button href="/education" variant="primary" withArrow>
            Explore education
          </Button>
        </div>
      </Container>
    </section>
  );
}
