/**
 * In-page index.
 *
 * Interior pages run to several bands; a compact index of anchor links under the
 * hero is what turns that into something a visitor can navigate and scan rather
 * than a long column they have to read top to bottom. It sits inside the hero so
 * it costs one hairline and one line of small caps.
 */
export default function PageIndex({
  items,
  className = '',
}: {
  items: Array<{ label: string; href: string }>;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={`mt-8 border-t border-rule-dark pt-5 ${className}`}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-on-dark-muted transition-colors hover:text-gold-300"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
