// ---------------------------------------------------------------------------
// Structured site content.
// Kept separate from components so copy is easy to edit without touching UI.
// All copy is capability/philosophy-oriented. No statistics, results, clients,
// or other claims are fabricated.
// ---------------------------------------------------------------------------

export interface Item {
  title: string;
  description: string;
}

export const capabilities: Item[] = [
  {
    title: 'Quantitative Research',
    description:
      'Systematic investigation of market data and statistical relationships to build and refine quantitative models.',
  },
  {
    title: 'Financial Analytics',
    description:
      'Structured analysis of portfolios, risk, performance, and exposures to inform disciplined decisions.',
  },
  {
    title: 'Data & Technology',
    description:
      'Research infrastructure, data pipelines, and algorithmic systems designed for reliability and reproducibility.',
  },
  {
    title: 'Quantitative Education',
    description:
      'Clear, rigorous instruction in the methods and tools of systematic, quantitative finance.',
  },
];

export const researchAreas: Item[] = [
  {
    title: 'Quantitative Research',
    description:
      'A systematic approach to framing financial questions and testing them with data and statistical evidence.',
  },
  {
    title: 'Factor Research',
    description:
      'Studying the drivers of returns and the characteristics that help explain cross-sectional differences.',
  },
  {
    title: 'Alpha Research',
    description:
      'Investigating signals and strategies that may contribute to consistent, explainable performance.',
  },
  {
    title: 'Statistical Modelling',
    description:
      'Applying rigorous statistical techniques to understand relationships, uncertainty, and signal.',
  },
  {
    title: 'Machine Learning',
    description:
      'Using modern learning methods with care for overfitting, interpretability, and out-of-sample validity.',
  },
  {
    title: 'Portfolio Construction',
    description:
      'Turning research insights into portfolios that balance objectives, constraints, and risk.',
  },
  {
    title: 'Optimization',
    description:
      'Formulating allocation problems to satisfy objectives under realistic constraints and uncertainty.',
  },
  {
    title: 'Risk Modelling',
    description:
      'Quantifying and modelling exposures, volatility, tail risk, and portfolio behaviour under stress.',
  },
  {
    title: 'Market Microstructure',
    description:
      'Understanding how orders, liquidity, and execution dynamics shape the data we observe.',
  },
  {
    title: 'Backtesting',
    description:
      'Evaluating strategies against historical data with attention to bias, costs, and robustness.',
  },
];

export const analyticsCapabilities: Item[] = [
  {
    title: 'Portfolio Analytics',
    description: 'A structured view of holdings, exposures, and behaviour across the portfolio.',
  },
  {
    title: 'Risk Analytics',
    description:
      'Measures of volatility, concentration, and tail risk to support informed risk decisions.',
  },
  {
    title: 'Performance Attribution',
    description: 'Decomposing returns to understand where outcomes come from and why.',
  },
  {
    title: 'Factor Analysis',
    description:
      'Examining style, sector, and factor exposures to understand underlying drivers.',
  },
  {
    title: 'Quantitative Screening',
    description:
      'Filtering and ranking universes using transparent, reproducible criteria.',
  },
  {
    title: 'Data Analysis',
    description: 'Turning raw data into clean, structured inputs ready for research and modelling.',
  },
  {
    title: 'Research Infrastructure',
    description:
      'Tooling and pipelines that make research repeatable, versioned, and auditable.',
  },
];

export const technologyStack: Item[] = [
  {
    title: 'Python',
    description: 'The primary language for research, modelling, and analysis across our work.',
  },
  {
    title: 'Data Pipelines',
    description: 'Automated flows that ingest, clean, and structure data for downstream use.',
  },
  {
    title: 'Research Infrastructure',
    description: 'Reproducible environments, versioning, and tooling for systematic research.',
  },
  {
    title: 'Algorithmic Systems',
    description: 'Systems that encode rules and logic into consistent, repeatable processes.',
  },
  {
    title: 'Backtesting',
    description: 'Frameworks for evaluating ideas against history with discipline and care.',
  },
  {
    title: 'APIs',
    description: 'Clean interfaces for integrating data, models, and services.',
  },
  {
    title: 'Broker Connectivity',
    description: 'Integration points for order routing and execution where relevant.',
  },
  {
    title: 'Automated Workflows',
    description: 'Scheduled, monitored processes that reduce manual effort and error.',
  },
];

/**
 * `technologyStack` grouped into the layers of the research stack, from the data
 * at the base to the interfaces at the top. Used by the technology page's stack
 * ledger. Every entry is a title from `technologyStack` — this only arranges
 * existing capability, it does not add claims.
 */
export const technologyLayers: Array<{ label: string; items: string[] }> = [
  { label: 'Data', items: ['Data Pipelines'] },
  { label: 'Research environment', items: ['Research Infrastructure', 'Python'] },
  { label: 'Systems', items: ['Algorithmic Systems', 'Backtesting', 'Automated Workflows'] },
  { label: 'Interfaces', items: ['APIs', 'Broker Connectivity'] },
];

export const educationTopics: Item[] = [
  {
    title: 'Quantitative Finance',
    description: 'Foundations of pricing, returns, and the quantitative lens on markets.',
  },
  {
    title: 'Algorithmic Trading',
    description: 'Designing rule-based strategies and understanding execution.',
  },
  {
    title: 'Statistics',
    description:
      'The statistical toolkit for inference, modelling, and decision-making under uncertainty.',
  },
  {
    title: 'Financial Modelling',
    description: 'Building models that capture financial relationships with clarity.',
  },
  {
    title: 'Python for Finance',
    description: 'Practical programming skills for data, research, and automation.',
  },
  {
    title: 'Systematic Research',
    description: 'A disciplined process for forming, testing, and validating ideas.',
  },
];

export const principles: Item[] = [
  {
    title: 'Evidence over intuition',
    description:
      'Decisions should rest on data and reproducible analysis rather than narrative alone.',
  },
  {
    title: 'Rigor in method',
    description: 'We hold models to a high standard of statistical and computational discipline.',
  },
  {
    title: 'Transparency in process',
    description: 'Research should be explainable, auditable, and honest about its limits.',
  },
  {
    title: 'Discipline in execution',
    description: 'Sound ideas are only as good as the systems that carry them out.',
  },
];

export const researchApproach: Item[] = [
  { title: 'Frame', description: 'Define the question and the decision it supports.' },
  { title: 'Data', description: 'Gather and clean the inputs needed to answer it.' },
  { title: 'Model', description: 'Build a tractable, testable representation of the problem.' },
  { title: 'Test', description: 'Validate against history and out-of-sample data.' },
  { title: 'Iterate', description: 'Refine in light of evidence, with honesty about limitations.' },
];

export const engineeringPrinciples: Item[] = [
  {
    title: 'Reproducibility',
    description: 'Every result should be traceable to its data, code, and parameters.',
  },
  {
    title: 'Reliability',
    description: 'Systems should fail safely and behave predictably under load.',
  },
  {
    title: 'Simplicity',
    description: 'Prefer the simplest design that meets the requirement.',
  },
  {
    title: 'Security',
    description: 'Handle data and credentials with care by default.',
  },
];

