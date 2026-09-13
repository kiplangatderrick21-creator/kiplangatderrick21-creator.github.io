import Link from 'next/link';
import { capabilities } from '@/lib/content';
import Container from '../layout/Container';
import SectionHeading from '../ui/SectionHeading';
import { ArrowRight } from '../ui/Icon';

const links: Record<string, string> = {
  'Quantitative Research': '/research',
  'Financial Analytics': '/analytics',
  'Data & Technology': '/technology',
  'Quantitative Education': '/education',
};

/**
 * Four connected disciplines.
 *
 * A single hairline plate divided into four columns: no drop shadows, no
 * floating cards, no icons. The separator is the border itself, which is what
 * keeps the section feeling engraved rather than assembled.
 */
export default function Capabilities() {
  return (
    <section className="bg-ivory-200 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Quantitative capability across the decision process"
          description="Nivavale's work spans research, analytics, technology, and education — the disciplines needed to turn data into disciplined decisions."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xs border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <div key={item.title} className="flex flex-col bg-ivory-50 p-6 sm:p-7">
              <span aria-hidden="true" className="font-display text-2xl leading-none text-gold-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-xl leading-snug text-forest-900">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              <Link
                href={links[item.title]}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900 transition-colors hover:text-gold-700"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
