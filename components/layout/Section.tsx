import type { ReactNode } from 'react';
import LatticeGrid from '../data-viz/LatticeGrid';
import Container from './Container';

export type SectionTone = 'ivory' | 'ivory-alt' | 'forest-deep' | 'forest' | 'navy-deep' | 'navy';
export type SectionSpacing = 'compact' | 'default' | 'flush-top';

const tones: Record<SectionTone, string> = {
  ivory: 'bg-ivory-200',
  'ivory-alt': 'bg-ivory-50',
  'forest-deep': 'bg-forest-950',
  forest: 'bg-forest-900',
  'navy-deep': 'bg-navy-950',
  navy: 'bg-navy-900',
};

/** The lattice is a dark-surface texture; it is never drawn on ivory. */
const latticeTones: Record<SectionTone, 'forest' | 'navy'> = {
  ivory: 'forest',
  'ivory-alt': 'forest',
  'forest-deep': 'forest',
  forest: 'forest',
  'navy-deep': 'navy',
  navy: 'navy',
};

/**
 * The site's vertical rhythm.
 *
 * Every band of every page uses one of these two steps, so the page alternates
 * on a single beat instead of inventing spacing per section. Both are materially
 * tighter than a first-draft layout: a page should breathe, but it should not
 * scroll for a screen and a half of empty colour between two paragraphs.
 *
 *   compact   — asides and single-line strips
 *   default   — every content section
 *   flush-top — a band that sits directly under another band (e.g. the home
 *               capability index under the hero), where a second top gap would
 *               read as a mistake rather than as rhythm
 */
const spacings: Record<SectionSpacing, string> = {
  compact: 'py-10 sm:py-12 lg:py-14',
  default: 'py-14 sm:py-16 lg:py-20',
  'flush-top': 'pb-10 sm:pb-12 lg:pb-14',
};

/**
 * Standard page section.
 *
 * One component owns the background tone, the vertical padding, the container
 * measure, and the optional lattice surface, so structure is identical on every
 * page and there is exactly one place to change the rhythm site-wide.
 */
export default function Section({
  children,
  id,
  tone = 'ivory',
  spacing = 'default',
  lattice = false,
  latticeClassName = 'absolute inset-0 opacity-40',
  labelledBy,
  className = '',
  containerClassName = '',
}: {
  children: ReactNode;
  /** Anchor target for the in-page index in each page hero. */
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  /** Draw the brand lattice behind the content (dark tones only). */
  lattice?: boolean;
  latticeClassName?: string;
  /** id of the heading that labels this section. */
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${lattice ? 'overflow-hidden' : ''} ${spacings[spacing]} ${tones[tone]} ${className}`}
    >
      {lattice && (
        <LatticeGrid
          className={`pointer-events-none ${latticeClassName}`}
          tone={latticeTones[tone]}
        />
      )}
      <Container className={`relative ${containerClassName}`}>{children}</Container>
    </section>
  );
}
