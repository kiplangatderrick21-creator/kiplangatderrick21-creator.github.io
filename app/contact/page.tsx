import type { Metadata } from 'next';
import { site } from '@/lib/site';
import ContactForm from '@/components/contact/ContactForm';
import EmailActions from '@/components/contact/EmailActions';
import Container from '@/components/layout/Container';
import PageHero from '@/components/layout/PageHero';

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

      <section className="bg-ivory-200 py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[1.75rem] leading-snug text-forest-900">
              How to reach us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Use the form to send us a message, or reach out directly by email.
            </p>

            {site.email ? (
              <EmailActions />
            ) : (
              <p className="mt-6 text-sm text-ink-muted">
                Direct contact details will be published here soon.
              </p>
            )}

            <div className="mt-10 border-t border-rule-strong pt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
                What to expect
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                We review messages carefully and respond as promptly as we can. Please include as
                much context as possible so we can direct your inquiry to the right place.
              </p>
            </div>
          </div>

          <div className="rounded-xs border border-rule bg-ivory-50 p-6 sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
