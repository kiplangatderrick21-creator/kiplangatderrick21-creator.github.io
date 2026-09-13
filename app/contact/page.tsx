import type { Metadata } from 'next';
import { site } from '@/lib/site';
import ContactForm from '@/components/contact/ContactForm';
import EmailActions from '@/components/contact/EmailActions';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Nivavale about research, analytics, technology, or education.',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-950 py-20 text-ink-100 sm:py-28">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight sm:text-5xl">
            Start a conversation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            Whether your interest is research, analytics, technology, or education, we would be glad
            to hear from you.
          </p>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif text-2xl text-ink-900">How to reach us</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Use the form to send us a message, or reach out directly by email.
            </p>
            {site.email ? (
              <EmailActions />
            ) : (
              <p className="mt-6 text-sm text-ink-500">
                Direct contact details will be published here soon.
              </p>
            )}
            <div className="mt-10 border-t border-ink-200 pt-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
                What to expect
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                We review messages carefully and respond as promptly as we can. Please include as
                much context as possible so we can direct your inquiry to the right place.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-ink-200 bg-paper p-6 sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
