// ---------------------------------------------------------------------------
// Email helpers.
//
// A plain mailto: link does nothing for visitors who have no mail client wired
// up (common on phones, tablets, and locked-down work machines). These helpers
// build the same enquiry as a mailto: link and as webmail compose links, so the
// site can always offer a destination that actually opens.
// ---------------------------------------------------------------------------

import { site } from './site';

export const DEFAULT_SUBJECT = 'Enquiry from the Nivavale website';

/** Opens the visitor's own mail client, when one is configured. */
export function mailtoHref(subject: string = DEFAULT_SUBJECT): string {
  const address = site.email;
  if (!address) return '';
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}

/** Webmail fallback: opens a Gmail compose window addressed to us. */
export function gmailComposeHref(subject: string = DEFAULT_SUBJECT): string {
  const address = site.email;
  if (!address) return '';
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    address,
  )}&su=${encodeURIComponent(subject)}`;
}

/** Webmail fallback: opens an Outlook.com compose window addressed to us. */
export function outlookComposeHref(subject: string = DEFAULT_SUBJECT): string {
  const address = site.email;
  if (!address) return '';
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    address,
  )}&subject=${encodeURIComponent(subject)}`;
}
