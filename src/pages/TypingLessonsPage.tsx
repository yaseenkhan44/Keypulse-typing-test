import React, { useState, useEffect, useRef } from 'react';
import { TYPING_LESSONS } from '../data/lessonsData';
import { LessonContent } from '../types';
import { KeyboardVisualizer } from '../components/KeyboardVisualizer';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { BookOpen, CheckCircle2, ArrowRight, RotateCcw, Award, Sparkles, Clock } from 'lucide-react';

interface TypingLessonsPageProps {
  onNavigate: (route: string) => void;
}

export const TypingLessonsPage: React.FC<TypingLessonsPageProps> = ({ onNavigate }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(TYPING_LESSONS[0].slug);

  // Check URL hash for ?lesson=...
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/lesson=([a-z0-9-]+)/);
    if (match) {
      const found = TYPING_LESSONS.find((l) => l.slug === match[1]);
      if (found) setSelectedSlug(found.slug);
    }
  }, []);

  const currentLesson =
    TYPING_LESSONS.find((l) => l.slug === selectedSlug) || TYPING_LESSONS[0];

  // Interactive drill state
  const [drillInput, setDrillInput] = useState('');
  const [drillStartTime, setDrillStartTime] = useState<number | null>(null);
  const [isDrillDone, setIsDrillDone] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resetDrill = () => {
    setDrillInput('');
    setDrillStartTime(null);
    setIsDrillDone(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    resetDrill();
  }, [selectedSlug]);

  const handleDrillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDrillDone) return;
    const val = e.target.value;

    if (!drillStartTime) setDrillStartTime(Date.now());

    if (val.length <= currentLesson.practiceText.length) {
      setDrillInput(val);
      if (val.length === currentLesson.practiceText.length) {
        setIsDrillDone(true);
      }
    }
  };

  // Find next lesson
  const currentIndex = TYPING_LESSONS.findIndex((l) => l.slug === currentLesson.slug);
  const nextLesson = currentIndex < TYPING_LESSONS.length - 1 ? TYPING_LESSONS[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Structured Touch Typing Curriculum
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Touch Typing Lessons & Biomechanics
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Learn the principles of ergonomic touch typing. Master finger placement, eliminate
          repetitive strain, and build reflexive typing speed through our comprehensive eight-part curriculum.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lesson Navigation Syllabus */}
        <aside className="lg:col-span-4 bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2 sticky top-20">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-3 py-1">
            Curriculum Syllabus
          </span>
          <nav className="space-y-1" aria-label="Lessons List">
            {TYPING_LESSONS.map((lesson) => {
              const active = lesson.slug === currentLesson.slug;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedSlug(lesson.slug)}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                    active
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                      active ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    0{lesson.number}
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-semibold truncate">{lesson.title.split(':')[0]}</p>
                    <p
                      className={`text-[11px] truncate ${
                        active ? 'text-sky-100' : 'text-slate-400'
                      }`}
                    >
                      {lesson.readTime} · {lesson.targetKeys.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Column: Active Lesson Content */}
        <article className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
          {/* Lesson Header */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-sky-700">Lesson 0{currentLesson.number} of 08</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {currentLesson.readTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {currentLesson.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {currentLesson.tagline}
            </p>
          </div>

          {/* Key Concepts Callout */}
          <div className="p-5 bg-sky-50/70 border border-sky-100 rounded-xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
              Core Principles in This Lesson
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {currentLesson.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lesson Sections Prose */}
          <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
            {currentLesson.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {sec.heading}
                </h3>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.callout && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 font-medium">
                    {sec.callout}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Keyboard Visualizer for this Lesson */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Keyboard Reference Map for Lesson 0{currentLesson.number}
            </h3>
            <KeyboardVisualizer highlightHomeRow={true} />
          </div>

          {/* Practical Lesson Drill */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Practical Drill
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {currentLesson.drillPrompt}
                </h4>
              </div>
              <button
                type="button"
                onClick={resetDrill}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
                title="Reset Drill"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => inputRef.current?.focus()}
              className="p-4 bg-white rounded-lg border border-slate-200 font-mono text-base sm:text-lg leading-relaxed select-none cursor-text min-h-[90px]"
            >
              {currentLesson.practiceText.split('').map((char, index) => {
                let charStyle = 'text-slate-400';
                let isCurrent = index === drillInput.length;

                if (index < drillInput.length) {
                  if (drillInput[index] === char) {
                    charStyle = 'text-slate-900 bg-sky-100';
                  } else {
                    charStyle = 'text-rose-600 bg-rose-100 underline decoration-rose-500';
                  }
                }

                return (
                  <span
                    key={index}
                    className={`transition-colors ${charStyle} ${isCurrent ? 'bg-amber-100 font-bold text-slate-950' : ''}`}
                  >
                    {isCurrent && (
                      <span className="inline-block w-[2px] h-4 bg-sky-600 animate-cursor -mr-[2px] align-middle" />
                    )}
                    {char}
                  </span>
                );
              })}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={drillInput}
              onChange={handleDrillChange}
              disabled={isDrillDone}
              className="absolute opacity-0 pointer-events-none -left-9999px"
              aria-label="Lesson practice drill input"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {isDrillDone && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Drill completed successfully!
                </span>
                {nextLesson && (
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(nextLesson.slug)}
                    className="px-3 py-1 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    Proceed to Lesson 0{nextLesson.number} <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation to Next Lesson */}
          {nextLesson && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Ready to advance?</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedSlug(nextLesson.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
              >
                Next: Lesson 0{nextLesson.number} ({nextLesson.title.split(':')[0]})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </article>
      </div>

      <AdPlaceholder slotId="lessons-bottom-banner" format="leaderboard" />
    </div>
  );
};
