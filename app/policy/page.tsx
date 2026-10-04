import Link from 'next/link';

const policies = [
  { title: 'Privacy', body: 'We only collect information needed to process your order, answer your questions and improve your experience. We do not sell your personal information.' },
  { title: 'Cookies', body: 'Small cookies may help us remember preferences and understand how the site is used. You can manage cookies through your browser settings.' },
  { title: 'Your choices', body: 'You can ask to access, correct or delete personal information we hold about you, or unsubscribe from marketing at any time.' },
  { title: 'Get in touch', body: 'For a privacy question or request, contact Avalanche Coffee through the details provided on our website.' },
];

export default function PolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell wrap">
        <Link className="legal-back" href="/">← Back to Avalanche Coffee</Link>
        <p className="eyebrow">Your trust matters</p>
        <h1>Privacy policy</h1>
        <p className="legal-intro">How we look after the information you share with us.</p>
        <p className="legal-updated">Last updated: September 2026</p>
        <div className="legal-content">
          {policies.map((section, index) => (
            <section key={section.title} className="legal-section">
              <span className="legal-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{section.title}</h2><p>{section.body}</p></div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata = { title: 'Privacy Policy — Avalanche Coffee', description: 'Privacy policy for Avalanche Coffee.' };

