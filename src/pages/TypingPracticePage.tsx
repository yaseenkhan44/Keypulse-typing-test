import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PRACTICE_MODULES } from '../data/practiceData';
import { PracticeExercise } from '../types';
import { KeyboardVisualizer } from '../components/KeyboardVisualizer';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { CheckCircle2, RotateCcw, Lightbulb, BookOpen, ArrowRight, Sparkles, Clock, Target } from 'lucide-react';

interface TypingPracticePageProps {
  onNavigate: (route: string) => void;
}

export const TypingPracticePage: React.FC<TypingPracticePageProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(PRACTICE_MODULES[0].id);
  const currentModule = PRACTICE_MODULES.find((m) => m.id === selectedId) || PRACTICE_MODULES[0];

  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const resetPractice = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setInputVal('');
    setStartTime(null);
    setIsCompleted(false);
    setElapsedSeconds(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    resetPractice();
  }, [selectedId, resetPractice]);

  useEffect(() => {
    if (startTime && !isCompleted) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;
    const val = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (val.length <= currentModule.text.length) {
      setInputVal(val);
      if (val.length === currentModule.text.length) {
        setIsCompleted(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  // Calculations
  const totalTyped = inputVal.length;
  let correctCount = 0;
  for (let i = 0; i < totalTyped; i++) {
    if (inputVal[i] === currentModule.text[i]) {
      correctCount++;
    }
  }
  const accuracy = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 1000) / 10 : 100;
  const elapsedMinutes = Math.max(elapsedSeconds, 1) / 60;
  const currentWpm = Math.round((totalTyped / 5) / elapsedMinutes);

  // Active key calculation for keyboard visualizer
  const nextTargetChar = currentModule.text[inputVal.length] || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Targeted Skill Drills
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Interactive Typing Practice
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Sharpen specific keyboard mechanics with our structured drills. Choose a category below
          to isolate home row foundations, awkward row reaches, numeric sequences, or high-frequency vocabulary.
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {PRACTICE_MODULES.map((mod) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => setSelectedId(mod.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedId === mod.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {mod.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Practice Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Exercise */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Difficulty: {currentModule.difficulty}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {currentModule.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">{currentModule.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={resetPractice}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Exercise
            </button>
          </div>

          {/* Instructions Box */}
          <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-sky-900 block mb-1">Exercise Instructions:</strong>
            {currentModule.instructions}
          </div>

          {/* Live Metrics Header */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-mono tabular-nums text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Time: <strong className="text-slate-900">{elapsedSeconds}s</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Speed: <strong className="text-slate-900">{currentWpm} WPM</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Accuracy: <strong className={accuracy >= 97 ? 'text-emerald-600' : 'text-slate-900'}>{accuracy}%</strong></span>
            </div>
          </div>

          {/* Interactive Text Display */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200 font-mono text-lg sm:text-xl leading-relaxed select-none cursor-text min-h-[140px]"
          >
            {currentModule.text.split('').map((char, index) => {
              let charStyle = 'text-slate-400';
              let isCurrent = index === inputVal.length;

              if (index < inputVal.length) {
                if (inputVal[index] === char) {
                  charStyle = 'text-slate-900 bg-sky-100/70';
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
                    <span className="inline-block w-[2px] h-5 bg-sky-600 animate-cursor -mr-[2px] align-middle" />
                  )}
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            disabled={isCompleted}
            className="absolute opacity-0 pointer-events-none -left-9999px"
            autoFocus
            aria-label="Practice input field"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />

          {isCompleted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-emerald-900">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                Exercise Completed! Speed: {currentWpm} WPM | Accuracy: {accuracy}%
              </span>
              <button
                type="button"
                onClick={resetPractice}
                className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
              >
                Practice Again
              </button>
            </div>
          )}

          {/* Interactive Keyboard Visualizer */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-500 block mb-2 uppercase tracking-wider">
              On-Screen Finger Guide (Target Key: <kbd className="text-amber-600 font-bold">{nextTargetChar === ' ' ? 'Space' : nextTargetChar || 'Done'}</kbd>)
            </span>
            <KeyboardVisualizer
              targetKey={nextTargetChar}
              activeKey={inputVal[inputVal.length - 1] || ''}
              highlightHomeRow={true}
            />
          </div>
        </div>

        {/* Right Column: Tips, Target Keys & Related Lessons */}
        <div className="lg:col-span-4 space-y-6">
          {/* Helpful Tips Card */}
          <div className="p-6 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
              <Lightbulb className="w-4 h-4" /> Instructor Tips for This Module
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              {currentModule.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Lesson Link */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Theoretical Foundation
            </span>
            <h3 className="text-sm font-bold text-slate-900">Recommended Accompanying Lesson</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complement your practical repetitions with structured biomechanical instruction from our curriculum.
            </p>
            <a
              href="#/typing-lessons"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/typing-lessons');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 pt-1"
            >
              Open Typing Lessons <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="practice-bottom-banner" format="leaderboard" />
    </div>
  );
};
