'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { gmailComposeHref, mailtoHref, outlookComposeHref } from '@/lib/email';
import { Check, Mail } from '../ui/Icon';

const chipClass =
  'inline-flex items-center gap-2 rounded-xs border border-rule-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-forest-900 hover:text-forest-900';

/**
 * The contact email, plus ways to reach it that do not depend on a mail client
 * being installed. mailto: is offered first; Gmail and Outlook are there as
 * redirects for devices where mailto: silently does nothing.
 */
export default function EmailActions() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const address = site.email;
  if (!address) return null;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address as string);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked (older browsers, insecure contexts);
      // the address is visible on screen, so fail quietly.
    }
  }

  return (
    <div className="mt-6">
      <a
        href={mailtoHref()}
        className="inline-flex items-center gap-2 text-base font-medium text-forest-900 transition-colors hover:text-gold-700"
      >
        <Mail className="h-5 w-5" />
        {address}
      </a>

      <p className="mt-3 text-sm text-ink-muted">
        If no mail app opens on this device, write to us from your webmail instead:
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={gmailComposeHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClass}
        >
          Open in Gmail
        </a>
        <a
          href={outlookComposeHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClass}
        >
          Open in Outlook
        </a>
        <button type="button" onClick={copyAddress} className={chipClass} aria-live="polite">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Address copied
            </>
          ) : (
            'Copy address'
          )}
        </button>
      </div>
    </div>
  );
}
