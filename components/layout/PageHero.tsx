import type { ReactNode } from 'react';
import LatticeGrid from '../data-viz/LatticeGrid';
import Container from './Container';
import PageIndex from './PageIndex';

/**
 * Interior page hero.
 *
 * Every non-home route opens the same way: Deep Forest Green, the lattice
 * surface at low intensity, a gold eyebrow, an editorial display headline, a
 * single standfirst, and — where the page has more than one band — a compact
 * index of the sections below. Building it once keeps the seven pages visually
 * identical at the top, where consistency earns the most trust.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  links,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Anchor index of the page's sections, in order. */
  links?: Array<{ label: string; href: string }>;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <LatticeGrid className="absolute inset-0 opacity-50" tone="forest" />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400">
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[2rem] font-medium leading-[1.1] text-on-dark sm:text-[2.5rem] lg:text-[2.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-dark-muted sm:text-[1.0625rem]">
            {description}
          </p>
        )}
        {links && links.length > 0 && <PageIndex items={links} />}
        {children}
      </Container>
    </section>
  );
}
