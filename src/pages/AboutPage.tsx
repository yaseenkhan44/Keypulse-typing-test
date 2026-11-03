import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { AdPlaceholder } from '../components/AdPlaceholder';
import {
  Keyboard,
  ShieldCheck,
  Target,
  Award,
  Users,
  Sparkles,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Keyboard className="w-3.5 h-3.5 text-sky-600" />
          About KeyPulse
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Democratizing Touch Typing Mastery for the Modern Digital Workplace
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          KeyPulse (hosted at{' '}
          <strong className="text-slate-900 font-semibold">{siteConfig.domain}</strong>) was founded
          on a simple conviction: typing is humanity's primary interface with the digital world, yet
          over 60% of computer users remain trapped in inefficient, fatiguing hunt-and-peck habits.
        </p>
      </div>

      {/* Mission & Purpose */}
      <section className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Our Educational Mission
        </h2>
        <p>
          In an era where remote professionals, software developers, medical transcriptionists, and
          students spend 4 to 8 hours daily at keyboards, inefficient typing is not merely a minor
          inconvenience—it represents hundreds of wasted hours per year, fragmented creative
          concentration, and a leading cause of repetitive strain injuries (RSI).
        </p>
        <p>
          KeyPulse exists to provide completely free, mathematically rigorous, and accessible typing
          tools to anyone with a web browser. We do not require registration, we never gate lessons
          behind paywalls, and we do not capture or monetize private keystrokes.
        </p>
      </section>

      {/* 4 Pillars of KeyPulse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Target className="w-5 h-5 text-sky-600" /> Standardized Mathematics
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We adhere strictly to the standardized international 5-character definition of a word.
            We report both Gross WPM and Net WPM with documented error penalties, ensuring your scores
            reflect genuine professional performance.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-sky-600" /> Privacy-First Architecture
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All typing test timing and accuracy calculations run client-side in your local browser
            runtime. Your text input is processed transiently in memory and never transmitted or logged
            on remote servers.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Globe className="w-5 h-5 text-sky-600" /> Natural International English
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our curriculum and passages use natural, authentic English spelling and terminology,
            tailored for typists in the United States, Canada, Australia, Italy, and globally without
            redundant country-specific landing pages.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Award className="w-5 h-5 text-sky-600" /> Publisher Policy Compliance
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We hold ourselves to the highest standards of Google Publisher Policies and user trust.
            We avoid deceptive advertisements, pop-ups, artificial timers, and misleading button
            clones.
          </p>
        </div>
      </div>

      {/* Editorial Standards */}
      <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
        <h2 className="text-lg font-bold text-slate-900">Editorial & Testing Integrity</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          All articles in our knowledge base are original, researched analyses written by qualified
          ergonomics instructors and data analysts. We never publish automatically scraped,
          hallucinated, or deceptive medical claims. For inquiries or suggested curriculum topics,
          reach out to our editorial desk at{' '}
          <a href="mailto:contact@keypulse.org" className="text-sky-600 font-semibold underline">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>

      {/* Compliant Ad Slot */}
      <AdPlaceholder slotId="about-page-bottom-ad" format="leaderboard" />
    </div>
  );
};
