import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameWordTarget } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Play,
  Flame,
  Zap,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const TypingGamesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'word' | 'sentence' | 'blitz'>('word');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Gamepad2 className="w-3.5 h-3.5 text-sky-600" />
          Interactive Skill Games
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Educational Typing Games
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Gamify your muscle memory. Practice rapid word interception, sentence pacing against a
          ghost runner, and high-intensity word streaks.
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('word')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'word'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Target className="w-4 h-4" /> Word Challenge
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sentence')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'sentence'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" /> Sentence Challenge (Ghost Racer)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('blitz')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'blitz'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Flame className="w-4 h-4" /> 60s Word Blitz Challenge
        </button>
      </div>

      {/* Game Stage Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {activeTab === 'word' && <WordChallengeGame />}
        {activeTab === 'sentence' && <SentenceChallengeGame />}
        {activeTab === 'blitz' && <TimedBlitzGame />}
      </div>

      {/* Ad slot placed at the bottom, strictly separated from game controls */}
      <AdPlaceholder slotId="typing-games-bottom-ad" format="leaderboard" />
    </div>
  );
};

/* -------------------------------------------------------------
 * GAME 1: Word Challenge (Intercept descending words)
 * ------------------------------------------------------------- */
const WORD_LIST = [
  'focus', 'rhythm', 'velocity', 'swift', 'muscle', 'keystroke', 'cadence',
  'precision', 'clarity', 'effort', 'practice', 'mastery', 'balance',
  'finger', 'keyboard', 'anchor', 'habit', 'stream', 'engine', 'horizon',
  'breeze', 'galaxy', 'signal', 'vector', 'matrix', 'crystal', 'quantum'
];

const WordChallengeGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [lives, setLives] = useState(3);
  const [activeWords, setActiveWords] = useState<GameWordTarget[]>([]);
  const [inputVal, setInputVal] = useState('');

  const gameLoopRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setWordsCleared(0);
    setLives(3);
    setInputVal('');
    setActiveWords([
      { id: '1', word: 'focus', x: 20, y: 5, speed: 0.18 },
      { id: '2', word: 'rhythm', x: 60, y: 15, speed: 0.15 },
    ]);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const stopGame = useCallback(() => {
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    setIsPlaying(false);
  }, []);

  // Spawn new word
  useEffect(() => {
    if (isPlaying && !gameOver) {
      spawnTimerRef.current = window.setInterval(() => {
        setActiveWords((prev) => {
          if (prev.length >= 6) return prev;
          const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
          const newWord: GameWordTarget = {
            id: Math.random().toString(),
            word: randomWord,
            x: Math.floor(Math.random() * 70) + 10,
            y: 0,
            speed: 0.12 + Math.random() * 0.1,
          };
          return [...prev, newWord];
        });
      }, 2400);
    }
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [isPlaying, gameOver]);

  // Main animation frame loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      const updateFrame = () => {
        setActiveWords((prev) => {
          let updatedLives = lives;
          const nextWords: GameWordTarget[] = [];

          for (const w of prev) {
            const nextY = w.y + w.speed;
            if (nextY >= 92) {
              // Word reached bottom boundary
              updatedLives -= 1;
            } else {
              nextWords.push({ ...w, y: nextY });
            }
          }

          if (updatedLives !== lives) {
            setLives(updatedLives);
            if (updatedLives <= 0) {
              setGameOver(true);
              stopGame();
            }
          }

          return nextWords;
        });

        if (!gameOver) {
          gameLoopRef.current = requestAnimationFrame(updateFrame);
        }
      };

      gameLoopRef.current = requestAnimationFrame(updateFrame);
    }

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, lives, stopGame]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setInputVal(e.target.value);

    // Check if typed word matches any falling word
    const match = activeWords.find((w) => w.word.toLowerCase() === val);
    if (match) {
      setActiveWords((prev) => prev.filter((w) => w.id !== match.id));
      setScore((s) => s + match.word.length * 10);
      setWordsCleared((c) => c + 1);
      setInputVal('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Word Challenge: Falling Words</h2>
          <p className="text-xs text-slate-500">
            Type each falling word correctly before it reaches the bottom danger line.
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs sm:text-sm">
          <span>Score: <strong className="text-sky-600 font-bold">{score}</strong></span>
          <span>Cleared: <strong className="text-slate-900 font-bold">{wordsCleared}</strong></span>
          <span className="flex items-center gap-1">
            Lives:
            <span className="text-rose-500 font-bold">
              {'❤️'.repeat(Math.max(0, lives))}
            </span>
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        {/* Danger line at bottom */}
        <div className="absolute bottom-8 inset-x-0 h-[2px] bg-rose-500/60 border-t border-dashed border-rose-400"></div>
        <span className="absolute bottom-2 right-4 text-[10px] font-mono text-rose-400 uppercase tracking-widest">
          Danger Boundary Line
        </span>

        {/* Falling Words */}
        {isPlaying &&
          activeWords.map((w) => (
            <div
              key={w.id}
              className="absolute font-mono text-xs sm:text-sm font-semibold px-2.5 py-1 rounded bg-slate-800/90 text-sky-300 border border-sky-500/50 shadow-md transition-transform duration-75"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {w.word}
            </div>
          ))}

        {/* Start / Game Over Overlays */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <Target className="w-12 h-12 text-sky-400" />
            <h3 className="text-xl font-bold">Ready to Intercept Words?</h3>
            <p className="text-xs text-slate-300 max-w-sm">
              Keep your fingers on the home row and type the words as they descend. Focus on rhythmic speed.
            </p>
            <button
              type="button"
              onClick={startGame}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
            <Trophy className="w-12 h-12 text-amber-400" />
            <h3 className="text-2xl font-bold">Game Over!</h3>
            <p className="text-sm text-slate-300">
              Final Score: <strong className="text-sky-400 font-mono text-lg">{score}</strong> | Words Cleared:{' '}
              <strong className="text-white font-mono">{wordsCleared}</strong>
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}
      </div>

      {/* Input Field Bar */}
      {isPlaying && (
        <div className="max-w-md mx-auto pt-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInput}
            placeholder="Type falling words here..."
            className="w-full px-4 py-3 rounded-xl border-2 border-sky-500 focus:outline-hidden focus:ring-4 focus:ring-sky-100 text-center font-mono text-base tracking-wide"
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * GAME 2: Sentence Challenge (Race against ghost pace)
 * ------------------------------------------------------------- */
const SentenceChallengeGame: React.FC = () => {
  const targetSentences = [
    'Discipline is the bridge between goals and genuine accomplishment.',
    'Clear writing is the signature of a disciplined and organized mind.',
    'Every expert was once a beginner who refused to quit practicing.',
    'Smooth typing flows like water, striking each letter without hesitation.',
  ];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const currentSentence = targetSentences[sentenceIndex];

  const [userTyped, setUserTyped] = useState('');
  const [ghostProgress, setGhostProgress] = useState(0); // 0-100%
  const [targetWpm, setTargetWpm] = useState(50);
  const [isRacing, setIsRacing] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);
  const [userWon, setUserWon] = useState(false);

  const ghostTimerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const startRace = () => {
    setIsRacing(true);
    setRaceFinished(false);
    setUserWon(false);
    setUserTyped('');
    setGhostProgress(0);

    const sentenceLength = currentSentence.length;
    // Calculate seconds needed for targetWpm
    // (chars / 5) / (seconds / 60) = WPM => seconds = (chars * 12) / WPM
    const totalDurationSecs = (sentenceLength * 12) / targetWpm;
    const intervalMs = 100;
    const stepPercent = (intervalMs / (totalDurationSecs * 1000)) * 100;

    let current = 0;
    ghostTimerRef.current = window.setInterval(() => {
      current += stepPercent;
      if (current >= 100) {
        setGhostProgress(100);
        if (ghostTimerRef.current) clearInterval(ghostTimerRef.current);
        setRaceFinished(true);
        setUserWon(false);
      } else {
        setGhostProgress(current);
      }
    }, intervalMs);

    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRacing || raceFinished) return;
    const val = e.target.value;

    if (val.length <= currentSentence.length) {
      setUserTyped(val);
      if (val === currentSentence) {
        if (ghostTimerRef.current) clearInterval(ghostTimerRef.current);
        setRaceFinished(true);
        setUserWon(true);
      }
    }
  };

  const userProgress = Math.min(100, (userTyped.length / currentSentence.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Sentence Challenge: Ghost Racer</h2>
          <p className="text-xs text-slate-500">
            Race your keyboard against a pacing target car calibrated to your selected WPM.
          </p>
        </div>

        {/* Pacer WPM Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Ghost Target:</span>
          <div className="inline-flex bg-slate-100 p-1 rounded-lg">
            {[40, 50, 65, 80].map((wpm) => (
              <button
                key={wpm}
                type="button"
                onClick={() => {
                  setTargetWpm(wpm);
                  if (isRacing) startRace();
                }}
                className={`px-3 py-1 font-semibold rounded ${
                  targetWpm === wpm ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {wpm} WPM
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Race Track Visualization */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-6">
        {/* Ghost Car Lane */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>🤖 Ghost Pacer ({targetWpm} WPM)</span>
            <span className="font-mono">{Math.round(ghostProgress)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-slate-500 h-full transition-all duration-100 ease-linear"
              style={{ width: `${ghostProgress}%` }}
            />
          </div>
        </div>

        {/* Player Lane */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-sky-700">
            <span>🏎️ You (Player)</span>
            <span className="font-mono">{Math.round(userProgress)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full transition-all duration-75 ease-out"
              style={{ width: `${userProgress}%` }}
            />
          </div>
        </div>

        {/* Sentence Prompt Text */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 bg-white rounded-xl border border-slate-200 font-mono text-base sm:text-lg leading-relaxed select-none cursor-text"
        >
          {currentSentence.split('').map((char, index) => {
            let color = 'text-slate-400';
            let isCurrent = index === userTyped.length;

            if (index < userTyped.length) {
              color = userTyped[index] === char ? 'text-slate-900 bg-sky-100' : 'text-rose-600 bg-rose-100';
            }

            return (
              <span key={index} className={`transition-colors ${color} ${isCurrent ? 'bg-amber-100 font-bold' : ''}`}>
                {char}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userTyped}
          onChange={handleInput}
          disabled={!isRacing || raceFinished}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-mono text-sm"
          placeholder={isRacing ? 'Type the sentence to outpace the ghost...' : 'Press Start Race below...'}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Controls & Result */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {!isRacing && !raceFinished ? (
            <button
              type="button"
              onClick={startRace}
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Race Sprint
            </button>
          ) : raceFinished ? (
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${userWon ? 'text-emerald-600' : 'text-rose-600'}`}>
                {userWon ? '🏆 Victory! You outpaced the ghost!' : '🥈 The ghost runner finished first!'}
              </span>
              <button
                type="button"
                onClick={startRace}
                className="px-4 py-2 bg-sky-600 text-white font-semibold text-xs rounded-lg hover:bg-sky-700 transition-colors"
              >
                Race Again
              </button>
              <button
                type="button"
                onClick={() => {
                  setSentenceIndex((sentenceIndex + 1) % targetSentences.length);
                  setUserTyped('');
                  setIsRacing(false);
                  setRaceFinished(false);
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Next Sentence
              </button>
            </div>
          ) : (
            <span className="text-xs text-sky-600 font-medium">Race in progress! Keep your eyes on the text!</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * GAME 3: Timed 60s Word Blitz (Combo multiplier streaks)
 * ------------------------------------------------------------- */
const BLITZ_WORDS = [
  'apple', 'river', 'table', 'silver', 'flight', 'camera', 'yellow', 'stream',
  'window', 'forest', 'planet', 'mirror', 'bridge', 'castle', 'garden',
  'shadow', 'desert', 'rocket', 'island', 'valley', 'candle', 'pocket',
  'ocean', 'guitar', 'circle', 'marble', 'beacon', 'breeze', 'hammer'
];

const TimedBlitzGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('stream');
  const [inputVal, setInputVal] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBlitzing, setIsBlitzing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const startBlitz = () => {
    setIsBlitzing(true);
    setIsFinished(false);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setInputVal('');
    setCurrentWord(BLITZ_WORDS[Math.floor(Math.random() * BLITZ_WORDS.length)]);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (isBlitzing && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsBlitzing(false);
            setIsFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBlitzing, timeLeft]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isBlitzing || isFinished) return;
    const val = e.target.value.trim().toLowerCase();
    setInputVal(e.target.value);

    if (val === currentWord.toLowerCase()) {
      const multiplier = Math.min(4, 1 + Math.floor(streak / 5));
      const addedPoints = currentWord.length * 10 * multiplier;
      setScore((s) => s + addedPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      setInputVal('');
      setCurrentWord(BLITZ_WORDS[Math.floor(Math.random() * BLITZ_WORDS.length)]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">60-Second Word Blitz Challenge</h2>
          <p className="text-xs text-slate-500">
            Rapid-fire word streaks with compounding combo multipliers. How many words can you clear in 60s?
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs sm:text-sm">
          <span>Time: <strong className="text-sky-600 font-bold">{timeLeft}s</strong></span>
          <span>Score: <strong className="text-slate-900 font-bold">{score}</strong></span>
          <span className="flex items-center gap-1 text-amber-600 font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {streak} Streak
          </span>
        </div>
      </div>

      <div className="p-8 sm:p-12 bg-slate-900 text-white rounded-xl text-center space-y-6">
        {!isBlitzing && !isFinished && (
          <div className="space-y-4 max-w-sm mx-auto">
            <Flame className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold">60-Second Word Blitz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain an unbroken streak of correct words to activate 2x, 3x, and 4x score multipliers!
            </p>
            <button
              type="button"
              onClick={startBlitz}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm rounded-lg transition-colors"
            >
              Start 60s Blitz
            </button>
          </div>
        )}

        {isBlitzing && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Target Word ({1 + Math.floor(streak / 5)}x Combo Active)
              </span>
              <p className="font-mono text-4xl sm:text-5xl font-extrabold text-amber-400 tracking-wider">
                {currentWord}
              </p>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-xl bg-slate-800 border-2 border-amber-400 text-center font-mono text-xl text-white focus:outline-hidden focus:ring-4 focus:ring-amber-400/20"
              placeholder="Type target word..."
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        )}

        {isFinished && (
          <div className="space-y-4 max-w-sm mx-auto animate-in fade-in duration-200">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold">Blitz Complete!</h3>
            <div className="p-4 bg-slate-800 rounded-lg text-xs space-y-1 font-mono">
              <p>Final Score: <strong className="text-amber-400 text-base">{score}</strong></p>
              <p>Highest Streak: <strong className="text-white text-base">{bestStreak}</strong> words in a row</p>
            </div>
            <button
              type="button"
              onClick={startBlitz}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors"
            >
              Play Blitz Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
