/**
 * Section header: a small gold eyebrow, the editorial display headline, and an
 * optional standfirst.
 *
 * Used on every band of every page, so its type scale and its offset from the
 * content below are fixed here rather than set per section: that is what keeps
 * the pages reading as one document.
 *
 * `tone` selects the palette for the surface the heading sits on: warm ivory
 * pages or deep forest / charcoal navy panels. Pass `id` when the surrounding
 * `<section>` references the heading with aria-labelledby.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  id,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
  className?: string;
}) {
  const dark = tone === 'dark';
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : '';

  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${
            dark ? 'text-gold-400' : 'text-gold-700'
          }`}
        >
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-3.5 font-display text-[1.625rem] font-medium leading-[1.15] sm:text-[2rem] ${
          dark ? 'text-on-dark' : 'text-forest-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3.5 max-w-xl text-base leading-relaxed ${
            dark ? 'text-on-dark-muted' : 'text-ink-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

