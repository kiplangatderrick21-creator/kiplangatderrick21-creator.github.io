import LatticeGrid from '../data-viz/LatticeGrid';
import Button from '../ui/Button';
import Container from '../layout/Container';

/**
 * Closing call to action, shared by every interior page.
 *
 * Charcoal Navy rather than forest green, so the end of a page is recognisably
 * different from its beginning, and the same two primary routes — contact, or
 * more about the firm — appear in the same place every time.
 */
export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <LatticeGrid className="absolute inset-0 opacity-60" tone="navy" />

      <Container className="relative py-24 text-center sm:py-28">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400">
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
          Start a conversation
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-display text-[2.25rem] font-medium leading-[1.12] text-on-dark sm:text-[2.75rem]">
          Let&rsquo;s put data to work on your decisions.
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-on-dark-muted">
          Whether your interest is research, analytics, technology, or education, we&rsquo;d welcome
          a conversation.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/contact" size="lg" dark withArrow>
            Contact Nivavale
          </Button>
          <Button href="/about" size="lg" variant="secondary" dark>
            Learn more
          </Button>
        </div>
      </Container>
    </section>
  );
}
