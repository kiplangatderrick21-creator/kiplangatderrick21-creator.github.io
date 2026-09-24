import type { ReactNode } from 'react';

type Measure = 'default' | 'narrow';

const measures: Record<Measure, string> = {
  /** Editorial width: grids, plates, and split layouts. */
  default: 'max-w-[74rem]',
  /** Reading width: prose and asides that should not run long on a laptop. */
  narrow: 'max-w-[60rem]',
};

/**
 * Page gutter and maximum measure.
 *
 * One container governs every section so vertical rhythm and left edges align
 * across the whole site. The measure is wide enough for editorial layouts at
 * desktop and clamps to the viewport on smaller screens.
 */
export default function Container({
  children,
  size = 'default',
  className = '',
}: {
  children: ReactNode;
  size?: Measure;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${measures[size]} px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

