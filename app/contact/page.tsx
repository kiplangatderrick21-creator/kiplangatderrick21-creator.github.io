import type { Metadata } from 'next';
import { site } from '@/lib/site';
import ContactForm from '@/components/contact/ContactForm';
import EmailActions from '@/components/contact/EmailActions';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Nivavale about research, analytics, technology, or education.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation."
        description="Whether your interest is research, analytics, technology, or education, we would be glad to hear from you."
      />

      <Section
        labelledBy="contact-heading"
        containerClassName="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
      >
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow="Direct contact"
            title="How to reach us"
            description="Use the form to send us a message, or reach out directly by email."
          />

          {site.email ? (
            <EmailActions />
          ) : (
            <p className="mt-6 text-sm text-ink-muted">
              Direct contact details will be published here soon.
            </p>
          )}

          <div className="mt-8 border-t border-rule-strong pt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
              What to expect
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
              We review messages carefully and respond as promptly as we can. Please include as much
              context as possible so we can direct your inquiry to the right place.
            </p>
          </div>
        </div>

        <div className="rounded-xs border border-rule bg-ivory-50 p-5 sm:p-7">
          <h2 className="font-display text-xl leading-snug text-forest-900">Send a message</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Fields marked with an asterisk are required.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
