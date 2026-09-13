import Link from 'next/link';
import { footerDescription, nav, site } from '@/lib/site';
import Logo from '../ui/Logo';
import Container from './Container';

/**
 * Site footer.
 *
 * Closes the page on Deep Forest Green with the same gold hairline that opens
 * the header, so the site is visibly bounded top and bottom. Brand, navigation,
 * and contact only — no newsletter chrome, no social filler.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-on-dark-muted">
      <div aria-hidden="true" className="h-px w-full bg-gold-400/30" />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex text-on-dark transition-colors hover:text-gold-200"
              aria-label={`${site.name} — home`}
            >
              <Logo markSize={26} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{footerDescription}</p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-forest-300">
              Research · Analytics · Technology · Education
            </p>
          </div>

          <nav aria-label="Company">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-on-dark">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/contact" className="transition-colors hover:text-on-dark">
                  Contact us
                </Link>
              </li>
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all transition-colors hover:text-on-dark"
                  >
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule-dark pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Quantitative intelligence and technology.</p>
        </div>
      </Container>
    </footer>
  );
}
