import React, { useState, useEffect } from 'react';
import { TypingEngine } from '../components/TypingEngine';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { TestDuration } from '../types';
import { BookOpen, CheckCircle2, HelpCircle, Info, Sparkles } from 'lucide-react';

interface TypingTestPageProps {
  initialDuration?: TestDuration;
}

export const TypingTestPage: React.FC<TypingTestPageProps> = ({ initialDuration = 60 }) => {
  const [duration, setDuration] = useState<TestDuration>(initialDuration);

  // Check URL query parameters for ?time=15/30/60/120
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/time=(\d+)/);
    if (match && [15, 30, 60, 120].includes(Number(match[1]))) {
      setDuration(Number(match[1]) as TestDuration);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header & Meta Intro */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Standardized Speed Assessment
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Online Typing Speed Test (WPM)
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Test your English words-per-minute typing speed, character accuracy, and keystroke consistency.
          Choose between 15-second sprints, 30-second drills, 60-second standard certification tests, or
          120-second endurance passages.
        </p>
      </div>

      {/* Primary Testing Console */}
      <div className="space-y-4">
        <TypingEngine initialDuration={duration} standalone={true} autoFocus={true} />
      </div>

      {/* Standardized Calculation Methodology (High Genuine User Value) */}
      <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Standardization & Standards
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How Your Scores Are Calculated
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold">1</span>
              Gross WPM Formula
            </h3>
            <p className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-800">
              Gross WPM = (Total Characters ÷ 5) ÷ Elapsed Minutes
            </p>
            <p className="text-slate-600 leading-relaxed text-xs">
              Following the universal international typing convention, one "word" equals exactly five physical keystrokes, including spaces and punctuation marks.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold">2</span>
              Net WPM (Error Penalty)
            </h3>
            <p className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-800">
              Net WPM = Gross WPM - (Errors ÷ Elapsed Minutes)
            </p>
            <p className="text-slate-600 leading-relaxed text-xs">
              Errors are penalized directly from gross speed to simulate real-world production loss. If errors exceed output, Net WPM is clamped to 0.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold">3</span>
              Accuracy Percentage
            </h3>
            <p className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-800">
              Accuracy = (Correct Characters ÷ Total Typed) × 100
            </p>
            <p className="text-slate-600 leading-relaxed text-xs">
              Measures your precision ratio. Professional benchmark standards require at least 97% to 98% accuracy for employment certifications.
            </p>
          </div>
        </div>

        {/* Global Benchmarks Table */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Global Typing Speed Benchmarks
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Skill Tier</th>
                  <th className="p-3">Net WPM Range</th>
                  <th className="p-3">Accuracy Benchmark</th>
                  <th className="p-3">Typical Roles & Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Novice / Hunt & Peck</td>
                  <td className="p-3 font-mono">15 – 34 WPM</td>
                  <td className="p-3 font-mono">85% – 93%</td>
                  <td className="p-3">Looks at hands; relies on 2–4 fingers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Average Adult Typist</td>
                  <td className="p-3 font-mono">35 – 49 WPM</td>
                  <td className="p-3 font-mono">94% – 96%</td>
                  <td className="p-3">Standard casual computer user</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Proficient Professional</td>
                  <td className="p-3 font-mono">50 – 69 WPM</td>
                  <td className="p-3 font-mono">97% – 99%</td>
                  <td className="p-3">Meets 95% of corporate office requirements</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">High-Speed Specialist</td>
                  <td className="p-3 font-mono">70 – 89 WPM</td>
                  <td className="p-3 font-mono">98% – 100%</td>
                  <td className="p-3">Transcriptionists, legal secretaries, coders</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Master Typist (Top 1%)</td>
                  <td className="p-3 font-mono">90+ WPM</td>
                  <td className="p-3 font-mono">99% – 100%</td>
                  <td className="p-3">Elite speed typists and stenographers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Compliant Ad Slot kept safe from interactive buttons */}
      <AdPlaceholder slotId="typing-test-bottom-slot" format="leaderboard" />
    </div>
  );
};
