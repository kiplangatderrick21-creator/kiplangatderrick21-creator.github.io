import Link from 'next/link';
import { capabilities } from '@/lib/content';
import Container from '../layout/Container';
import { ArrowUpRight } from '../ui/Icon';

/** Each capability links to the page that expands it. */
const links: Record<string, string> = {
  'Quantitative Research': '/research',
  'Financial Analytics': '/analytics',
  'Data & Technology': '/technology',
  'Quantitative Education': '/education',
};

/**
 * Disciplines ledger.
 *
 * Sits immediately below the hero and gives the homepage its four clear routes —
 * research, analytics, technology, and education — as a ruled index rather than
 * four promotional tiles.
 */
export default function DisciplinesStrip() {
  return (
    <section className="bg-forest-900 pb-16 sm:pb-20">
      <Container>
        <h2 className="sr-only">What we do</h2>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <li key={item.title}>
              <Link
                href={links[item.title]}
                className="group flex items-start justify-between gap-4 border-t border-rule-dark py-6 transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="font-display text-lg text-gold-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[1.35rem] leading-snug text-on-dark transition-colors group-hover:text-gold-200">
                    {item.title}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-1.5 h-4 w-4 shrink-0 text-gold-400/70 transition-colors group-hover:text-gold-200"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
