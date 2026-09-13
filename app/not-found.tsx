import Button from '@/components/ui/Button';
import LatticeGrid from '@/components/data-viz/LatticeGrid';
import Container from '@/components/layout/Container';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <LatticeGrid className="absolute inset-0 opacity-[0.55]" tone="forest" />

      <Container className="relative py-28 text-center sm:py-36">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400">
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
          404
          <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
        </p>

        <h1 className="mt-5 font-display text-[2.5rem] font-medium leading-tight text-on-dark sm:text-[3rem]">
          Page not found.
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-relaxed text-on-dark-muted">
          The page you are looking for does not exist or has moved.
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="/" size="lg" dark withArrow>
            Return home
          </Button>
        </div>
      </Container>
    </section>
  );
}
