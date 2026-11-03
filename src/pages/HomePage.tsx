import React, { useState } from 'react';
import {
  Keyboard,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { TypingEngine } from '../components/TypingEngine';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { TYPING_LESSONS } from '../data/lessonsData';
import { BLOG_POSTS } from '../data/blogArticles';
import { PRACTICE_MODULES } from '../data/practiceData';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does KeyPulse calculate my typing speed (WPM)?',
      a: 'KeyPulse implements the standardized international 5-character formula: Gross WPM = (Total Characters Typed ÷ 5) ÷ Elapsed Minutes. We also report Net WPM, which adjusts for uncorrected mistakes by subtracting errors from gross output. This is the exact measurement method used by certification agencies and professional transcription tests.',
    },
    {
      q: 'Do I need to create an account or provide an email to take typing tests?',
      a: 'No. KeyPulse is 100% free and registration-free. You can take as many 15s, 30s, 60s, or 120s typing tests, practice drills, and educational lessons as you wish without signing up or sharing personal data.',
    },
    {
      q: 'What is considered a "good" typing speed for jobs?',
      a: 'The global average for adults is approximately 40 WPM. Most corporate office, customer support, and administrative jobs look for 50 to 65 WPM. Technical roles, transcriptionists, and legal secretaries often target 70 to 85+ Net WPM with at least 98% accuracy.',
    },
    {
      q: 'Can touch typing help prevent wrist pain and carpal tunnel syndrome?',
      a: 'Yes! When you touch type, your wrists remain level and floating in a neutral position, while keystrokes are evenly distributed across all ten fingers. This prevents the repetitive strain caused by pecking at keys with two pointer fingers while planting your palms firmly on a hard desk.',
    },
    {
      q: 'How long does it take to learn to type without looking at the keyboard?',
      a: 'Most learners develop solid tactile confidence on the home row within 10 to 14 days of 15-minute daily practice. Within 4 to 6 weeks, speeds typically climb past 50 WPM with near-perfect accuracy.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Standard 5-Stroke Gross & Net WPM
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Free Online Typing Speed Test
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Measure your true English typing velocity and precision with real-time Gross and Net
              WPM metrics, zero registration required. Practice home-row fundamentals, master lookahead
              buffer reading, and eliminate typing fatigue with structured daily drills.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#/typing-test"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#/typing-test');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors shadow-sm"
              >
                Start Typing Test
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#/typing-lessons"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#/typing-lessons');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                Browse Lessons
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> 15s, 30s, 60s & 120s Timers
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> Standardized Error Penalty
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> 100% Free & Private
              </span>
            </div>
          </div>

          {/* Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
              <img
                src="/src/assets/images/hero_keyboard_minimal_1793687389226.jpg"
                alt="Modern minimalist keyboard on clean white desk with soft lighting"
                className="w-full h-[280px] sm:h-[340px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs">
                  <span className="font-semibold block text-sm">KeyPulse Precision Benchmarks</span>
                  <span>Targeting 98%+ Accuracy for Unbroken Writing Cadence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Live Typing Test Section */}
      <section id="test-stage" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Take the Speed Test Now
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your preferred duration, begin typing the passage below, and receive instant WPM calculations.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Standard: 5 Keystrokes = 1 Word
          </div>
        </div>

        <TypingEngine initialDuration={60} autoFocus={false} />
      </section>

      {/* Compliant Ad Slot 1 */}
      <AdPlaceholder slotId="homepage-middle-leaderboard" format="leaderboard" />

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How KeyPulse Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A scientifically validated testing loop designed to measure and elevate your natural keyboard velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3">
            <span className="w-10 h-10 rounded-xl bg-sky-500 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
              01
            </span>
            <h3 className="text-lg font-semibold text-slate-900">Choose Your Duration</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select a 15-second burst sprint, a 30-second rapid drill, a standard 60-second test, or a 120-second sustained endurance passage.
            </p>
          </div>

          <div className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3">
            <span className="w-10 h-10 rounded-xl bg-sky-500 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
              02
            </span>
            <h3 className="text-lg font-semibold text-slate-900">Type with Rhythmic Focus</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Type the original English passage as it appears on screen. Our real-time engine colorizes correct strikes and flags inaccuracies instantaneously.
            </p>
          </div>

          <div className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3">
            <span className="w-10 h-10 rounded-xl bg-sky-500 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
              03
            </span>
            <h3 className="text-lg font-semibold text-slate-900">Analyze Your Breakdown</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Review your Gross WPM, Net WPM (with standardized error penalties), accuracy percentage, and total keystrokes to target your weak spots.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits of Touch Typing Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="/src/assets/images/touch_typing_hands_1793687390835.jpg"
                alt="Focused typist with hands resting in proper touch typing home row posture"
                className="w-full h-[320px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Cognitive & Physical Advantages
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                The Compounding Benefits of Touch Typing
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
                  <Zap className="w-4 h-4" /> Reclaim 21 Workdays a Year
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Moving from 35 WPM to 70 WPM cuts everyday typing time in half, saving over 300 hours annually.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" /> Ergonomic Health & RSI Relief
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Balanced 10-finger reach prevents wrist anchoring, reducing tendon strain and cervical neck stiffness.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
                  <Target className="w-4 h-4" /> Unbroken Cognitive Flow
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When fingers type subconsciously, your working memory stays 100% focused on ideas, arguments, and clarity.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
                  <Award className="w-4 h-4" /> Career Advantage
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fast, accurate typing signals technical mastery during live meetings, coding sessions, and client correspondence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Practice & Lessons Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Featured Lessons & Practice Drills
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Follow our curriculum designed to transition your hands from hunting keys to automated muscle memory.
            </p>
          </div>
          <a
            href="#/typing-lessons"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/typing-lessons');
            }}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            View all 8 lessons <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TYPING_LESSONS.slice(0, 3).map((lesson) => (
            <div
              key={lesson.id}
              className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-sky-300 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-sky-700">Lesson 0{lesson.number}</span>
                  <span>{lesson.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{lesson.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {lesson.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Keys: {lesson.targetKeys.slice(0, 4).join(' ')}...
                </span>
                <a
                  href={`#/typing-lessons?lesson=${lesson.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`#/typing-lessons?lesson=${lesson.slug}`);
                  }}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  Start Lesson <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Latest Guides & Speed Insights
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Evidence-based tutorials on typing mechanics, speed plateaus, and keyboard ergonomics.
            </p>
          </div>
          <a
            href="#/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/blog');
            }}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            Browse all 10 articles <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-sky-300 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{post.publishedDate}</span>
                <a
                  href={`#/blog/${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`#/blog/${post.slug}`);
                  }}
                  className="font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  Read Article <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Clear, transparent answers about our typing calculations, privacy, and methodologies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliant Ad Slot 2 */}
      <AdPlaceholder slotId="homepage-bottom-banner" format="leaderboard" />
    </div>
  );
};
