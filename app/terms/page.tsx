import Link from 'next/link';

const sections = [
  { title: 'Using this site', body: 'Avalanche Coffee provides this website for discovering and purchasing our café-style sachets. By using the site, you agree to use it lawfully and respectfully.' },
  { title: 'Orders and payment', body: 'Orders are subject to availability and confirmation. Prices are shown in New Zealand dollars and may change without notice. Payment is processed securely by our checkout provider.' },
  { title: 'Intellectual property', body: 'The Avalanche Coffee name, identity, photography, copy and artwork belong to Avalanche Coffee or our licensors. Please do not reproduce or reuse them without written permission.' },
  { title: 'Questions', body: 'If you need help with these terms, contact our team and we will be happy to help.' },
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell wrap">
        <Link className="legal-back" href="/">← Back to Avalanche Coffee</Link>
        <p className="eyebrow">The fine print</p>
        <h1>Terms &amp; conditions</h1>
        <p className="legal-intro">Simple, clear terms for enjoying Avalanche Coffee online.</p>
        <p className="legal-updated">Last updated: September 2026</p>
        <div className="legal-content">
          {sections.map((section) => (
            <section key={section.title} className="legal-section">
              <span className="legal-number">{String(sections.indexOf(section) + 1).padStart(2, '0')}</span>
              <div><h2>{section.title}</h2><p>{section.body}</p></div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata = { title: 'Terms & Conditions — Avalanche Coffee', description: 'Terms and conditions for Avalanche Coffee.' };

