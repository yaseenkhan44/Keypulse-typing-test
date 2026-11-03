import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Award, CheckCircle2, AlertCircle, Clock, BarChart3, Shuffle, Share2, Check } from 'lucide-react';
import { TestDuration, TypingStats } from '../types';
import { TYPING_PASSAGES, getRandomPassage, TypingPassage } from '../data/passages';

interface TypingEngineProps {
  initialDuration?: TestDuration;
  autoFocus?: boolean;
  onFinish?: (stats: TypingStats) => void;
  standalone?: boolean;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  initialDuration = 60,
  autoFocus = true,
  onFinish,
  standalone = true,
}) => {
  const [duration, setDuration] = useState<TestDuration>(initialDuration);
  const [passage, setPassage] = useState<TypingPassage>(() => getRandomPassage());
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Live real-time stats
  const [stats, setStats] = useState<TypingStats>({
    elapsedSeconds: 0,
    totalCharsTyped: 0,
    correctChars: 0,
    incorrectChars: 0,
    errorCount: 0,
    grossWpm: 0,
    netWpm: 0,
    accuracy: 100,
    cpm: 0,
  });

  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Stop timer safely
  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset test cleanly
  const resetTest = useCallback(
    (newDuration?: TestDuration, newPassage?: TypingPassage) => {
      stopTimer();
      const dur = newDuration || duration;
      setDuration(dur);
      setTimeLeft(dur);
      setInputText('');
      setStartTime(null);
      setIsActive(false);
      setIsFinished(false);
      setCopied(false);
      if (newPassage) {
        setPassage(newPassage);
      } else {
        setPassage(getRandomPassage(passage.id));
      }
      setStats({
        elapsedSeconds: 0,
        totalCharsTyped: 0,
        correctChars: 0,
        incorrectChars: 0,
        errorCount: 0,
        grossWpm: 0,
        netWpm: 0,
        accuracy: 100,
        cpm: 0,
      });

      // Focus input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    },
    [duration, passage.id, stopTimer]
  );

  // Calculate live stats safely
  const calculateStats = useCallback(
    (typed: string, elapsedSecs: number): TypingStats => {
      const totalChars = typed.length;
      let correct = 0;
      let incorrect = 0;

      for (let i = 0; i < totalChars; i++) {
        if (i < passage.text.length && typed[i] === passage.text[i]) {
          correct++;
        } else {
          incorrect++;
        }
      }

      const elapsedMinutes = Math.max(elapsedSecs, 1) / 60;

      // Standard International Gross WPM: (Total characters / 5) / elapsed minutes
      const rawGrossWpm = totalChars > 0 ? (totalChars / 5) / elapsedMinutes : 0;
      const grossWpm = Math.round(rawGrossWpm);

      // Standard Error Adjustment for Net WPM: Gross WPM - (Errors / elapsed minutes)
      // Clamped to 0 minimum
      const errorPenalty = incorrect / elapsedMinutes;
      const netWpm = Math.max(0, Math.round(rawGrossWpm - errorPenalty));

      // Accuracy % = (Correct characters / Total typed) * 100
      const accuracy =
        totalChars > 0 ? Math.round((correct / totalChars) * 1000) / 10 : 100;

      // CPM (Characters per minute)
      const cpm = Math.round(totalChars / elapsedMinutes);

      return {
        elapsedSeconds: elapsedSecs,
        totalCharsTyped: totalChars,
        correctChars: correct,
        incorrectChars: incorrect,
        errorCount: incorrect,
        grossWpm,
        netWpm,
        accuracy,
        cpm,
      };
    },
    [passage.text]
  );

  // Handle test completion
  const completeTest = useCallback(
    (finalStats?: TypingStats) => {
      stopTimer();
      setIsActive(false);
      setIsFinished(true);

      const final = finalStats || stats;
      if (onFinish) {
        onFinish(final);
      }
    },
    [onFinish, stats, stopTimer]
  );

  // Timer Tick Interval
  useEffect(() => {
    if (isActive && !isFinished) {
      stopTimer(); // Prevent duplicate intervals

      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Reached zero seconds
            stopTimer();
            setIsActive(false);
            setIsFinished(true);

            // Final calculation at full duration
            setInputText((currentTyped) => {
              const finalStats = calculateStats(currentTyped, duration);
              setStats(finalStats);
              if (onFinish) onFinish(finalStats);
              return currentTyped;
            });
            return 0;
          }

          const newTimeLeft = prev - 1;
          const elapsed = duration - newTimeLeft;

          // Update live metrics on tick
          setInputText((currentTyped) => {
            setStats(calculateStats(currentTyped, elapsed));
            return currentTyped;
          });

          return newTimeLeft;
        });
      }, 1000);
    }

    return () => stopTimer();
  }, [isActive, isFinished, duration, calculateStats, onFinish, stopTimer]);

  // Handle user typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const val = e.target.value;

    // Start timer on first keystroke
    if (!isActive && !startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    // Do not exceed passage length
    if (val.length <= passage.text.length) {
      setInputText(val);

      const elapsed = startTime
        ? Math.max(1, Math.floor((Date.now() - startTime) / 1000))
        : 1;

      const currentStats = calculateStats(val, elapsed);
      setStats(currentStats);

      // Check if user completed the entire text perfectly
      if (val.length === passage.text.length) {
        completeTest(currentStats);
      }
    }
  };

  // Switch duration
  const handleDurationChange = (newDur: TestDuration) => {
    resetTest(newDur);
  };

  // Keyboard shortcut: Tab + Enter to restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetTest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetTest]);

  // Copy results summary
  const handleCopyResults = () => {
    const shareText = `KeyPulse Typing Test Results:
• Net Speed: ${stats.netWpm} WPM (Gross: ${stats.grossWpm} WPM)
• Accuracy: ${stats.accuracy}%
• Total Keystrokes: ${stats.totalCharsTyped}
• Duration: ${duration}s
Test your typing speed for free at https://keypulse.org/`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Determine speed tier descriptor
  const getSpeedTier = (wpm: number) => {
    if (wpm >= 100) return { title: 'Master Typist (Top 1%)', color: 'text-indigo-600' };
    if (wpm >= 75) return { title: 'High Speed Specialist', color: 'text-sky-600' };
    if (wpm >= 50) return { title: 'Proficient Professional', color: 'text-emerald-600' };
    if (wpm >= 35) return { title: 'Average Typist', color: 'text-amber-600' };
    return { title: 'Novice / Developing', color: 'text-slate-600' };
  };

  const progressPercent = Math.min(
    100,
    Math.round((inputText.length / passage.text.length) * 100)
  );

  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${standalone ? 'p-6 sm:p-8' : 'p-4 sm:p-6'}`}>
      {/* Top Controls: Duration Selectors & Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Duration:
          </span>
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg">
            {([15, 30, 60, 120] as TestDuration[]).map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => handleDurationChange(dur)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  duration === dur
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Header Bar */}
        <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-4 h-4 text-sky-500" />
            <span className="font-semibold text-slate-900 text-base">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="text-xs text-slate-400 uppercase font-sans">Gross WPM:</span>
            <span className="font-semibold text-slate-900 text-base">{stats.grossWpm}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="text-xs text-slate-400 uppercase font-sans">Net WPM:</span>
            <span className="font-bold text-sky-600 text-base">{stats.netWpm}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="text-xs text-slate-400 uppercase font-sans">Accuracy:</span>
            <span className={`font-semibold text-base ${stats.accuracy >= 97 ? 'text-emerald-600' : stats.accuracy >= 90 ? 'text-amber-600' : 'text-rose-600'}`}>
              {stats.accuracy}%
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => resetTest(duration, getRandomPassage(passage.id))}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Randomize Passage"
            aria-label="Randomize Passage"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => resetTest()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Restart Test (Esc)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
        <div
          className="bg-sky-500 h-full transition-all duration-150 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Interactive Stage */}
      {!isFinished ? (
        <div className="py-6 sm:py-8">
          <div
            ref={scrollContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="relative font-mono text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide select-none cursor-text p-4 sm:p-6 bg-slate-50/60 rounded-xl border border-slate-200/80 min-h-[160px] max-h-[280px] overflow-y-auto"
          >
            {/* Render character-by-character colorization */}
            {passage.text.split('').map((char, index) => {
              let charStyle = 'text-slate-400';
              let isCurrent = index === inputText.length;

              if (index < inputText.length) {
                if (inputText[index] === char) {
                  charStyle = 'text-slate-900 bg-sky-50/60';
                } else {
                  charStyle = 'text-rose-600 bg-rose-100 underline decoration-rose-500 decoration-2';
                }
              }

              return (
                <span
                  key={index}
                  className={`relative transition-colors ${charStyle} ${isCurrent ? 'bg-sky-200/70 text-slate-950 font-semibold' : ''}`}
                >
                  {isCurrent && (
                    <span className="inline-block w-[2px] h-5 bg-sky-600 animate-cursor -mr-[2px] align-middle" />
                  )}
                  {char}
                </span>
              );
            })}
          </div>

          {/* Hidden but focusable real input */}
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            disabled={isFinished}
            autoFocus={autoFocus}
            className="absolute opacity-0 pointer-events-none -left-9999px"
            aria-label="Type the passage displayed above"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Instruction Kicker */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              {!isActive ? (
                <>
                  <Play className="w-3.5 h-3.5 text-sky-500" /> Click the box or start typing to begin
                  countdown.
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Test in progress. Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-800">Esc</kbd> to restart.
                </>
              )}
            </span>
            <span className="text-slate-400">
              Passage: <strong className="text-slate-600 font-medium">{passage.title}</strong> ({passage.category})
            </span>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="py-8 text-center animate-in fade-in duration-200">
          <div className="inline-flex p-3 bg-sky-50 rounded-full text-sky-600 mb-3">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Test Completed!
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Skill Tier: <span className={`font-semibold ${getSpeedTier(stats.netWpm).color}`}>{getSpeedTier(stats.netWpm).title}</span>
          </p>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-8">
            <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl text-center">
              <span className="text-xs uppercase font-semibold text-sky-800">Net WPM</span>
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-600 font-mono tabular-nums mt-1">
                {stats.netWpm}
              </p>
              <span className="text-[11px] text-sky-700">Adjusted for errors</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
              <span className="text-xs uppercase font-semibold text-slate-500">Gross WPM</span>
              <p className="text-3xl sm:text-4xl font-bold text-slate-800 font-mono tabular-nums mt-1">
                {stats.grossWpm}
              </p>
              <span className="text-[11px] text-slate-400">Raw output speed</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
              <span className="text-xs uppercase font-semibold text-slate-500">Accuracy</span>
              <p className={`text-3xl sm:text-4xl font-bold font-mono tabular-nums mt-1 ${stats.accuracy >= 97 ? 'text-emerald-600' : 'text-slate-800'}`}>
                {stats.accuracy}%
              </p>
              <span className="text-[11px] text-slate-400">{stats.errorCount} total errors</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
              <span className="text-xs uppercase font-semibold text-slate-500">Characters</span>
              <p className="text-3xl sm:text-4xl font-bold text-slate-800 font-mono tabular-nums mt-1">
                {stats.totalCharsTyped}
              </p>
              <span className="text-[11px] text-slate-400">{stats.correctChars} correct keystrokes</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => resetTest(duration, getRandomPassage(passage.id))}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors shadow-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again (New Passage)
            </button>
            <button
              type="button"
              onClick={handleCopyResults}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Copy Results
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
