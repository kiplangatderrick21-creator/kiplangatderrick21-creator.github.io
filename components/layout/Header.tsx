'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import Container from './Container';
import { Close, Menu } from '../ui/Icon';

const mainNav = nav.filter((item) => item.href !== '/contact');

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site header.
 *
 * Deep Forest Green, held to the top of the viewport with a single gold hairline
 * along the very top edge, so the brand reads as a rule on the page rather than
 * a coloured bar. The active section is marked with gold text and a hairline
 * underline; the only primary action is Contact.
 *
 * On mobile the menu becomes a full-width panel of display-serif links. It
 * closes on Escape, on any navigation, and restores the body scroll position.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Navigation always dismisses the mobile menu.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-forest-950/95 backdrop-blur-md">
      <div aria-hidden="true" className="h-px w-full bg-gold-400/35" />

      <div className="border-b border-rule-dark">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <Link
            href="/"
            className="flex items-center text-on-dark transition-colors hover:text-gold-200"
            aria-label={`${site.name} — home`}
          >
            <Logo markSize={28} />
          </Link>

          <nav className="hidden items-center md:flex" aria-label="Primary">
            <ul className="flex items-center">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="flex">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex h-[4.5rem] items-center px-3.5 text-sm font-medium transition-colors lg:px-4 ${
                        active ? 'text-gold-300' : 'text-on-dark-muted hover:text-on-dark'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 bottom-0 h-px bg-gold-400"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button href="/contact" variant="primary" dark className="ml-5">
              Contact
            </Button>
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xs text-on-dark-muted transition-colors hover:text-on-dark md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>
      </div>

      {open && (
        <div id="mobile-menu" className="border-b border-rule-dark bg-forest-950 md:hidden">
          <Container className="py-4">
            <nav aria-label="Primary">
              <ul className="divide-y divide-rule-dark border-y border-rule-dark">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-[3rem] items-center gap-3 py-1.5 font-display text-[1.35rem] ${
                          active ? 'text-gold-300' : 'text-on-dark'
                        }`}
                      >
                        {active && (
                          <span aria-hidden="true" className="h-px w-5 bg-gold-400" />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              dark
              className="mt-5 w-full"
              onClick={() => setOpen(false)}
            >
              Contact Nivavale
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
