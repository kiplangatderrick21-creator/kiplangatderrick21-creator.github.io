import LatticeGrid from '../data-viz/LatticeGrid';
import SignalPlot from '../data-viz/SignalPlot';
import Button from '../ui/Button';
import Container from '../layout/Container';
import Panel from '../ui/Panel';

const domains = ['Research', 'Analytics', 'Systems'];

/**
 * Homepage hero.
 *
 * Deepest forest green, the lattice surface barely visible behind it, and a
 * single instrument panel on the right so the page opens on the firm's own
 * language — a research surface, not a photograph of a trading floor.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <LatticeGrid className="absolute inset-0 opacity-[0.6]" tone="forest" />

      <Container className="relative grid gap-16 py-24 sm:py-28 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-32">
        <div className="motion-safe:animate-rise">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400">
            <span aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
            Nivavale — Quantitative Intelligence
          </p>

          <h1 className="mt-6 font-display text-[2.75rem] font-medium leading-[1.05] text-on-dark sm:text-[3.5rem] lg:text-[4rem]">
            Quantitative Intelligence. Built for Better Decisions.
          </h1>

          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark-muted sm:text-lg">
            Nivavale is a quantitative research and technology firm. We bring together rigorous
            research, financial data, analytics, and engineering to support disciplined,
            evidence-based decisions.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/research" size="lg" dark withArrow>
              Explore our research
            </Button>
            <Button href="/contact" size="lg" variant="secondary" dark>
              Start a conversation
            </Button>
          </div>
        </div>

        <div className="motion-safe:animate-rise">
          <Panel
            label="Approach"
            tone="forest"
            footer={
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {domains.map((domain) => (
                  <span key={domain} className="uppercase tracking-[0.18em]">
                    {domain}
                  </span>
                ))}
              </span>
            }
          >
            <SignalPlot className="h-44 w-full sm:h-52" tone="forest" />
            <p className="mt-6 border-t border-rule-dark pt-4 text-xs leading-relaxed text-forest-300">
              Research, analytics, and systems, worked through one method: frame the question,
              gather the data, test the model, and report what the evidence supports.
            </p>
          </Panel>
        </div>
      </Container>
    </section>
  );
}
