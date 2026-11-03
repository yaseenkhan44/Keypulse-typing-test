import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Shield, FileText, AlertTriangle, Cookie, ArrowLeft } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer' | 'cookies';

interface LegalPageProps {
  initialDoc?: LegalDocType;
  onNavigate: (route: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialDoc = 'privacy', onNavigate }) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  useEffect(() => {
    setActiveDoc(initialDoc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialDoc]);

  const navItems = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, href: '#/privacy-policy' },
    { id: 'terms', label: 'Terms and Conditions', icon: FileText, href: '#/terms' },
    { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle, href: '#/disclaimer' },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie, href: '#/cookie-policy' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Tab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeDoc === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveDoc(item.id as LegalDocType);
                onNavigate(item.href);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Render Document */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
        {activeDoc === 'privacy' && <PrivacyPolicyContent />}
        {activeDoc === 'terms' && <TermsContent />}
        {activeDoc === 'disclaimer' && <DisclaimerContent />}
        {activeDoc === 'cookies' && <CookiePolicyContent />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. PRIVACY POLICY
 * ------------------------------------------------------------- */
const PrivacyPolicyContent: React.FC = () => (
  <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
        Transparency & Data Protection
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-500 mt-1">Last Updated: November 2, 2026</p>
    </div>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Overview & Commitment</h2>
      <p>
        KeyPulse ("we", "us", or "our", accessible at {siteConfig.domain}) respects your privacy.
        This Privacy Policy explains how we collect, handle, and safeguard information when you use
        our online typing tests, practice exercises, lessons, and games.
      </p>
      <p>
        Our typing test engine runs <strong>locally on your client device</strong>. We do not transmit,
        log, or store your actual typed keystrokes on remote servers.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Information We Collect</h2>
      <p>
        <strong>A. Usage Data & Device Telemetry:</strong> Like most web services, our web servers and
        analytics providers may collect non-identifying telemetry including your browser type,
        operating system, referring URLs, pages visited, time spent, and approximate geographic
        region (city/country level).
      </p>
      <p>
        <strong>B. Contact Communications:</strong> If you voluntarily contact us via our contact form
        or email ({siteConfig.supportEmail}), we collect your name, email address, and message contents
        solely to respond to your inquiry. We never sell or lease contact information.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Google AdSense & Third-Party Advertising Disclosures</h2>
      <p>
        To keep KeyPulse free and open to students and professionals worldwide without charging subscription
        fees, this website may display advertisements served by Google AdSense and its authorized ad partners.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-xs">
        <li>
          Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads
          based on prior visits to this website and other sites across the internet.
        </li>
        <li>
          Google's use of advertising cookies enables it and its partners to serve ads to users based
          on their visit to our site and/or other sites on the Internet.
        </li>
        <li>
          Users may opt out of personalized advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline font-medium"
          >
            Google Ads Settings
          </a>
          . Alternatively, you can opt out of third-party vendor cookies for personalized advertising by
          visiting{' '}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline font-medium"
          >
            www.aboutads.info
          </a>
          .
        </li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Google Analytics 4 (GA4)</h2>
      <p>
        We may utilize Google Analytics 4 to understand website traffic and improve user experience. GA4
        uses cookies to record aggregate, anonymized interaction patterns. GA4 masks IP addresses and does
        not associate personal identifying details with analytics reports. You can opt out via the{' '}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline font-medium"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">5. European Economic Area (EEA) & UK Privacy Rights (GDPR)</h2>
      <p>
        Under the General Data Protection Regulation (GDPR), visitors from the EEA and UK possess the
        right to access, rectify, or erase personal data, restrict processing, and withdraw consent.
        For advertising served in the EEA and UK, KeyPulse plans for and utilizes a Google-certified
        Consent Management Platform (CMP) integrated with the IAB Transparency and Consent Framework
        (TCF v2.2) to collect valid legal consent.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">6. California Privacy Rights (CCPA / CPRA)</h2>
      <p>
        Under the California Consumer Privacy Act, California residents have the right to know what
        personal information is collected, request its deletion, and opt out of the sale or sharing of
        personal information. KeyPulse does not sell consumer personal information.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">7. Data Protection Officer & Inquiries</h2>
      <p>
        If you have questions or requests regarding your personal data, contact our Privacy Officer at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-sky-600 font-semibold underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </section>
  </div>
);

/* -------------------------------------------------------------
 * 2. TERMS AND CONDITIONS
 * ------------------------------------------------------------- */
const TermsContent: React.FC = () => (
  <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
        Agreement of Service
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
        Terms and Conditions
      </h1>
      <p className="text-xs text-slate-500 mt-1">Last Updated: November 2, 2026</p>
    </div>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
      <p>
        By accessing or using KeyPulse ({siteConfig.domain}), you agree to be bound by these Terms and
        Conditions. If you disagree with any part of these terms, you must discontinue use of the site.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Permitted Use</h2>
      <p>
        KeyPulse grants you a personal, non-exclusive, revocable license to access our typing tests,
        practice modules, lessons, and educational games for non-commercial educational purposes.
        Automated scraping, bot-driven test submissions, denial-of-service attempts, or reverse-engineering
        are strictly prohibited.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
      <p>
        All educational text, lessons, curriculum structures, articles, software scripts, and visual
        designs on KeyPulse are the intellectual property of KeyPulse and protected by copyright and
        intellectual property laws.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Disclaimer of Warranties</h2>
      <p>
        KeyPulse is provided on an "as-is" and "as-available" basis without warranties of any kind.
        While we strive for 100% calculation accuracy and high uptime, we do not guarantee uninterrupted
        or error-free operation.
      </p>
    </section>
  </div>
);

/* -------------------------------------------------------------
 * 3. DISCLAIMER
 * ------------------------------------------------------------- */
const DisclaimerContent: React.FC = () => (
  <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
        Important Notice
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
        Platform Disclaimer
      </h1>
      <p className="text-xs text-slate-500 mt-1">Last Updated: November 2, 2026</p>
    </div>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Not Medical or Ergonomic Advice</h2>
      <p>
        The posture guides, finger placement recommendations, and typing exercise routines published
        on KeyPulse are provided strictly for general educational purposes. They do not constitute
        medical, orthopedic, or ergonomic physical therapy advice.
      </p>
      <p>
        If you experience chronic pain, numbness, tingling, or discomfort in your fingers, wrists, or
        arms, immediately cease typing and consult a licensed physician or certified occupational
        ergonomist.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">2. No Guaranteed Employment or Certification Outcomes</h2>
      <p>
        While KeyPulse utilizes standardized 5-character WPM mathematics aligned with international typing
        norms, scores achieved on our platform do not constitute official civil service or legal certification
        unless explicitly administered by an accredited testing agency.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">3. AdSense Compliance Statement</h2>
      <p>
        KeyPulse operates in strict compliance with Google Publisher Policies. We do not promise,
        guarantee, or claim certified AdSense revenue outcomes, and we maintain an environment free
        from deceptive advertising and deceptive download buttons.
      </p>
    </section>
  </div>
);

/* -------------------------------------------------------------
 * 4. COOKIE POLICY
 * ------------------------------------------------------------- */
const CookiePolicyContent: React.FC = () => (
  <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
        Storage & Cookies
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
        Cookie Policy
      </h1>
      <p className="text-xs text-slate-500 mt-1">Last Updated: November 2, 2026</p>
    </div>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">1. What Are Cookies?</h2>
      <p>
        Cookies and local storage mechanisms are small text files placed on your computer or mobile
        device when you visit a website. They allow the website to recognize your device and remember
        preferences such as preferred test duration, sound settings, and high scores.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">2. How We Use Cookies & Local Storage</h2>
      <div className="space-y-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
            A. Strictly Necessary Storage
          </strong>
          <p className="text-xs text-slate-600 mt-1">
            Enables active typing test state, timer countdowns, and cookie consent records. These
            cannot be disabled in our systems.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
            B. Analytics Cookies
          </strong>
          <p className="text-xs text-slate-600 mt-1">
            Allow us to measure page visits, bounce rates, and traffic sources to evaluate which
            practice exercises are most helpful.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">
            C. Advertising Cookies (Google AdSense)
          </strong>
          <p className="text-xs text-slate-600 mt-1">
            Used by Google to serve ads based on your visits to KeyPulse and other websites. These
            cookies help deliver relevant advertisements and prevent the same ad from reappearing
            continuously.
          </p>
        </div>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">3. How to Manage Cookies</h2>
      <p>
        You can change your cookie preferences at any time by opening the cookie consent tool via our
        footer, or through your browser settings. Most browsers allow you to refuse or delete cookies.
        Note that blocking strictly necessary storage may affect typing engine state.
      </p>
    </section>
  </div>
);
