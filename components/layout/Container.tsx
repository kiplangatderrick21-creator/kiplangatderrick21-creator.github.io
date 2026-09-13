import type { ReactNode } from 'react';

/**
 * Page gutter and maximum measure.
 *
 * One container governs every section so vertical rhythm and left edges align
 * across the whole site. The measure is wide enough for editorial layouts at
 * desktop and clamps to the viewport on smaller screens.
 */
export default function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[74rem] px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>
  );
}

