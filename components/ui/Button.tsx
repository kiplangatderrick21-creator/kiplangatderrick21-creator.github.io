import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

/**
 * Action element.
 *
 * On dark surfaces the primary action is Muted Antique Gold on Deep Forest
 * Green (6.7:1). On ivory surfaces the primary action inverts to Deep Forest
 * Green on Warm Ivory (12.5:1). Gold is therefore used as an accent where it
 * reads well, and never as a large field on light pages.
 */
const base =
  'inline-flex items-center justify-center gap-2.5 rounded-xs font-semibold tracking-[0.01em] transition-colors duration-200';

const variants: Record<Variant, Record<'dark' | 'light', string>> = {
  primary: {
    dark: 'bg-gold-400 text-forest-950 hover:bg-gold-300',
    light: 'bg-forest-900 text-on-dark hover:bg-forest-800',
  },
  secondary: {
    dark: 'border border-rule-dark-strong text-on-dark hover:border-gold-400 hover:text-gold-300',
    light: 'border border-rule-strong text-ink hover:border-forest-900 hover:text-forest-900',
  },
  ghost: {
    dark: 'px-0 text-on-dark hover:text-gold-300',
    light: 'px-0 text-forest-900 hover:text-gold-700',
  },
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  dark = false,
  withArrow = false,
  className = '',
  onClick,
  type = 'button',
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Set true when the button sits on a dark (forest or navy) background. */
  dark?: boolean;
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const classes = `${base} ${variant === 'ghost' ? '' : sizes[size]} ${variants[variant][dark ? 'dark' : 'light']} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}

