'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { gmailComposeHref, mailtoHref } from '@/lib/email';
import { site } from '@/lib/site';

type FormFields = {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  // Honeypot: hidden from people, tempting to bots. Sent but never shown.
  company: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-connected';

// Messages are delivered by the Cloudflare Pages Function at /api/contact,
// which emails each submission to info@nivavale.com (see
// functions/api/contact.ts). Set NEXT_PUBLIC_CONTACT_ENDPOINT to use an
// external form service instead, for example
// NEXT_PUBLIC_CONTACT_ENDPOINT="https://formspree.io/f/your-form-id".
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || '/api/contact';

const emptyForm: FormFields = {
  name: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
  company: '',
};

const inputClass =
  'w-full rounded-xs border border-rule-strong bg-white px-4 py-3 text-ink placeholder:text-ink-muted focus:border-forest-900';

const errorClass = 'mt-1.5 text-sm text-red-700';

const inlineLinkClass =
  'font-medium text-forest-900 underline decoration-gold-400/60 underline-offset-2 transition-colors hover:text-gold-700';

const labelClass = 'mb-1.5 block text-sm font-medium text-ink';

const requiredMarkClass = 'text-gold-700';

const noticeClass =
  'rounded-xs border border-rule bg-ivory-200 px-4 py-3 text-sm text-ink';

/**
 * Direct-email fallback shown whenever the form cannot deliver. mailto: works
 * when the device has a mail client; the Gmail link covers the devices where it
 * does not, so the visitor is always redirected somewhere they can send from.
 */
function DirectEmailLinks() {
  if (!site.email) return null;
  return (
    <>
      {' '}
      You can email{' '}
      <a href={mailtoHref()} className={inlineLinkClass}>
        {site.email}
      </a>{' '}
      directly, or{' '}
      <a
        href={gmailComposeHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={inlineLinkClass}
      >
        write from Gmail
      </a>
      .
    </>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormFields>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  function update(field: keyof FormFields, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) next.message = 'Please enter a message.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.status === 503) {
        // The endpoint is deployed but no email provider is configured yet.
        setStatus('not-connected');
        return;
      }
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name <span className={requiredMarkClass}>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className={requiredMarkClass}>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-org" className={labelClass}>
            Organization
          </label>
          <input
            id="contact-org"
            name="organization"
            type="text"
            autoComplete="organization"
            value={form.organization}
            onChange={(e) => update('organization', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className={requiredMarkClass}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={inputClass}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      <div aria-live="polite" role="status">
        {status === 'not-connected' && (
          <p className={noticeClass}>
            This form is not connected to an email service yet.
            <DirectEmailLinks />
          </p>
        )}
        {status === 'success' && (
          <p className={noticeClass}>
            Thank you — your message has been sent.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-xs border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            Something went wrong sending your message. Please try again.
            <DirectEmailLinks />
          </p>
        )}
      </div>

      {/* Honeypot: invisible to people and to assistive technology. The Pages
          Function drops any submission that fills it in. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-xs bg-forest-900 px-7 py-3.5 text-base font-semibold text-on-dark transition-colors duration-200 hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
