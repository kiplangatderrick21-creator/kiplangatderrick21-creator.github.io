import type { ReactNode } from 'react';
import LatticeGrid from '../data-viz/LatticeGrid';
import Container from './Container';

/**
 * Interior page hero.
 *
 * Every non-home route opens the same way: Deep Forest Green, the lattice
 * surface at low intensity, a gold eyebrow, an editorial display headline, and
 * a single standfirst. Building it once keeps the seven pages visually identical
 * at the top, where consistency earns the most trust.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <LatticeGrid className="absolute inset-0 opacity-[0.55]" tone="forest" />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400">
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[2.5rem] font-medium leading-[1.08] text-on-dark sm:text-[3.25rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-on-dark-muted">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
