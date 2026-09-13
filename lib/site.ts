// ---------------------------------------------------------------------------
// Central site configuration.
// Replace placeholder values marked with "TODO" before launch.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Nivavale',
  tagline: 'Quantitative Intelligence. Built for Better Decisions.',
  description:
    'Nivavale is a quantitative intelligence and technology firm focused on quantitative research, financial analytics, data, algorithmic systems, alpha research, and quantitative education.',
  // TODO: replace with your production domain before launch.
  url: 'https://nivavale.com',
  // Professional contact address. It is shown in the footer and on the contact
  // page, and it is the delivery address for the contact form (see
  // functions/api/contact.ts). When null, email links are hidden site-wide.
  email: 'info@nivavale.com' as string | null,
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Technology', href: '/technology' },
  { label: 'Education', href: '/education' },
  { label: 'Contact', href: '/contact' },
];

export const footerDescription =
  'A quantitative intelligence and technology firm. Research, analytics, and systems for better decisions.';
