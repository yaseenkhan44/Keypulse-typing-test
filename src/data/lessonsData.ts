import { LessonContent } from '../types';

export const TYPING_LESSONS: LessonContent[] = [
  {
    id: 'lesson-1',
    slug: 'finger-placement',
    number: 1,
    title: 'Correct Finger Placement: The Ergonomic Foundation',
    tagline: 'Master the universal home row anchor and columnar reach zones',
    summary:
      'Every key on a modern QWERTY keyboard is strictly assigned to one specific finger. Learning this division of labor eliminates unnecessary hand travel and prevents fatigue.',
    readTime: '4 min read',
    keyConcepts: [
      'Left Hand Home: A (Pinky), S (Ring), D (Middle), F (Index)',
      'Right Hand Home: J (Index), K (Middle), L (Ring), ; (Pinky)',
      'Index Finger Reach: Left covers F, G, R, T, V, B; Right covers J, H, U, Y, M, N',
      'Thumbs: Rest gently on the Spacebar without downward pressure',
    ],
    sections: [
      {
        heading: 'Why Finger Anchors Matter',
        content: [
          'Most self-taught typists rely on two or three fingers, forcing their hands to hover and dart frantically across the keyboard like birds pecking at seeds. While this "hunt-and-peck" method can reach 30 to 40 words per minute through sheer effort, it creates an impenetrable speed ceiling and causes severe wrist strain.',
          'Touch typing solves this by creating stationary pivot points. When your fingers consistently rest on the home row, every other key is located within a precise mechanical arc of motion. Your brain does not need to compute coordinates; it simply fires a specific muscle twitch.',
        ],
        callout:
          'Pro Tip: Feel the small raised ridges on the F and J keys. These tactile landmarks allow you to locate home position instantly without ever taking your eyes off your screen.',
      },
      {
        heading: 'The Columnar Assignment Rule',
        content: [
          'Visualize the keyboard not as rows, but as diagonal columns mapped directly to your ten fingers. The pinky finger handles the outer columns (A, Q, Z and Shift on the left; ;, P, / and Enter on the right). Ring fingers control S, W, X and L, O, .. Middle fingers take D, E, C and K, I, ,.',
          'Index fingers are the workhorses: each index finger controls two full vertical columns. The left index manages 4, 5, R, T, F, G, V, B. The right index manages 6, 7, U, Y, J, H, M, N.',
        ],
      },
      {
        heading: 'Wrist Alignment & Ergonomics',
        content: [
          'Keep your wrists completely straight and level with your forearms. Avoid resting your wrists on the desk surface or a hard wrist rest while typing; wrist rests are designed for resting between typing bursts, not during active keystrokes. Planting your palms anchors the tendons and causes repetitive strain injury (RSI).',
        ],
      },
    ],
    drillPrompt: 'Practice anchoring your hands and alternating home row keystrokes.',
    targetKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'],
    practiceText: 'fff jjj fff jjj ddd kkk ddd kkk sss lll sss lll aaa ;;; aaa ;;; fj dk sl a; fj dk sl a; glad fall ask lad flask salsa',
  },
  {
    id: 'lesson-2',
    slug: 'home-row-keys',
    number: 2,
    title: 'Home Row Keys: The Center of Touch Typing Gravity',
    tagline: 'Deepen automatic tactile awareness of A-S-D-F and J-K-L-;',
    summary:
      'The home row is your starting point, resting station, and return target. Developing rock-solid confidence on the home row is the essential prerequisite for high-speed typing.',
    readTime: '3 min read',
    keyConcepts: [
      'Tactile ridges on F and J provide continuous spatial reference',
      'Minimizing vertical finger lift saves milliseconds per keystroke',
      'Word patterns built entirely on the home row cement finger independence',
    ],
    sections: [
      {
        heading: 'The Sensory Feedback Loop',
        content: [
          'Before touching the keyboard, close your eyes and let your hands hover over the keys. Lower your index fingers until you feel the small bumps on F and J. Once those are established, your remaining fingers will naturally settle onto A, S, D and K, L, ;.',
          'Notice how each finger stays curved, like holding a fresh peach or tennis ball. If your fingers are flat and stiff, reach speed drops and accuracy suffers dramatically.',
        ],
      },
      {
        heading: 'Isolating Finger Independence',
        content: [
          'The human hand is anatomically wired so that the ring and pinky fingers share tendons. In beginner typists, pressing the ring finger often involuntarily drags the pinky along. Home row drills specifically isolate and strengthen these smaller extensor muscles so each finger moves with autonomy.',
        ],
        callout:
          'Exercise: Rest all eight fingers on the home row. Without moving any other finger, tap your left ring finger (S) five times cleanly. Repeat with your right ring finger (L).',
      },
    ],
    drillPrompt: 'Type these genuine English words constructed entirely from home row keys.',
    targetKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
    practiceText: 'all fall salad flash glad half glass hall dash flag flash gas alas asks flask shall fall flags alfalfa Dallas',
  },
  {
    id: 'lesson-3',
    slug: 'touch-typing-beginners',
    number: 3,
    title: 'Touch Typing for Beginners: Eye Position, Cadence & Posture',
    tagline: 'The psychological and physical habits that separate novices from experts',
    summary:
      'Learn how proper eye fixation, breathing control, and rhythmic pacing unlock effortless keyboard mastery in less than thirty days.',
    readTime: '5 min read',
    keyConcepts: [
      'Eyes strictly on the screen: never glance at your physical fingers',
      'Metronome typing: equal time intervals between all keystrokes',
      'Neutral spinal posture: 90-degree elbows, relaxed shoulders, flat feet',
    ],
    sections: [
      {
        heading: 'Breaking the Peeking Habit',
        content: [
          'The most critical barrier for beginners is the urge to check their hands. When you look at the keyboard, you interrupt the formation of kinesthetic motor memory. Your visual cortex takes over, preventing your motor cortex from encoding muscle memory.',
          'If you make a mistake, do not look down. Keep looking at the screen, feel for the F or J bump with your index finger, backtrack using the Backspace key with your right pinky, and try again purely by feel.',
        ],
        callout:
          'Tip: If you cannot resist glancing down, place a light cardboard cover or hand towel over your hands for the first 10 days of practice.',
      },
      {
        heading: 'The Metronome Pacing Technique',
        content: [
          'Fast typing is not about violent bursts; it is about smooth, uninterrupted continuity. Novice typists type three letters very quickly, pause for two seconds to locate the next letter, and type another burst. This erratic rhythm is exhausting and slow.',
          'Instead, aim to strike every key with the calm cadence of a clock ticking: tick, tick, tick, tick. Even if the speed is only 25 words per minute, consistent cadence prevents mental fatigue and produces clean muscle memory.',
        ],
      },
    ],
    drillPrompt: 'Maintain a steady, slow rhythm without pausing between words.',
    targetKeys: ['A-Z', 'Space'],
    practiceText: 'keep your eyes on the screen at all times while your fingers move smoothly across the keys like water flowing over stones',
  },
  {
    id: 'lesson-4',
    slug: 'typing-accuracy',
    number: 4,
    title: 'Typing Accuracy: Why Precision Must Precede Speed',
    tagline: 'Understand the mathematical penalty of backspacing and why 98% is the golden standard',
    summary:
      'Every single typo costs approximately 4 to 6 keystrokes in wasted correction time. Uncover why prioritizing accuracy above raw speed will make you faster in the long run.',
    readTime: '4 min read',
    keyConcepts: [
      'The Cost of an Error: 1 error = 1 backspace + mental pause + retype + resumption lag',
      'Target Benchmark: 98% to 100% accuracy before pushing for higher speed',
      'Muscle Memory Pollution: Repeatedly typing mistakes reinforces erroneous neural circuits',
    ],
    sections: [
      {
        heading: 'The Math Behind the Backspace Key',
        content: [
          'Consider what happens when you type the word "teh" instead of "the". You have typed three incorrect characters. You notice the red underline or error alert. You stop. You move your right pinky to Backspace and strike it three times. You re-read the word, type "the", and relocate your place in the sentence.',
          'A single mistake costs between 1.5 and 2.5 seconds. If you type at 70 WPM but commit 6 errors in a minute, your effective net speed plummets below 45 WPM! Speed without accuracy is an illusion.',
        ],
        callout:
          'Golden Rule: Whenever your accuracy drops below 96%, immediately reduce your typing tempo by 20% until you achieve three consecutive error-free sessions.',
      },
      {
        heading: 'Preventing Bad Motor Patterns',
        content: [
          'Every time you press the wrong key and immediately correct it, your nervous system stores both the mistake and the correction. If you practice at high speed while sloppy, you are actively training yourself to make mistakes. Slow down, get every letter right, and speed will follow automatically.',
        ],
      },
    ],
    drillPrompt: 'Focus on absolute zero-error perfection. Do not rush.',
    targetKeys: ['Full Text'],
    practiceText: 'Accuracy is the quiet mother of true speed. When every letter strikes true, velocity emerges without strain.',
  },
  {
    id: 'lesson-5',
    slug: 'improving-typing-speed',
    number: 5,
    title: 'Improving Typing Speed: Advanced Burst Training & Cadence',
    tagline: 'Transition from conscious letter processing to subconscious n-gram automation',
    summary:
      'How typists break through the 60 WPM, 80 WPM, and 100 WPM plateaus using chunking, preview reading, and finger roll optimization.',
    readTime: '6 min read',
    keyConcepts: [
      'N-Grams & Bigrams: Automating pairs like "th", "he", "in", "er", "on", "re"',
      'Buffer Reading: Looking 2 to 4 words ahead of the active cursor',
      'Finger Rolls: Smooth inward rolling motions like piano chords',
    ],
    sections: [
      {
        heading: 'The Secret of Chunking',
        content: [
          'At 30 WPM, your brain thinks: "t... h... e... space... c... a... t". Each letter is a separate conscious decision. At 80+ WPM, your brain thinks in chunks: "the", "cat", "walked", "down". The entire sequence of letters is fired as a single coordinated neuromuscular macro.',
          'To unlock higher speeds, practice high-frequency bigrams (two-letter pairs) and trigrams (three-letter sequences). When combinations like "ing", "tion", and "ment" become second nature, words flow effortlessly.',
        ],
      },
      {
        heading: 'Buffer Reading (Lookahead)',
        content: [
          'Watch elite 120 WPM typists: their eyes are consistently scanning words that are half a line ahead of what their fingers are currently striking. This lookahead buffer allows your brain to pre-calculate finger movements, eliminating hesitations at word boundaries.',
        ],
        callout:
          'Speed Drill: Read the entire sentence in your head first, take a breath, and type it in a sustained, continuous burst.',
      },
    ],
    drillPrompt: 'Type common word prefixes and suffixes in fluid rolls.',
    targetKeys: ['Prefixes & Suffixes'],
    practiceText: 'action relation station national direction condition perfection connection reaction collection interaction inspection',
  },
  {
    id: 'lesson-6',
    slug: 'common-typing-mistakes',
    number: 6,
    title: 'Common Typing Mistakes: Diagnosis & Permanent Fixes',
    tagline: 'Identify and correct the subtle biomechanical errors holding back your speed',
    summary:
      'From flying pinky syndrome to thumb confusion and desk height errors, discover how to diagnose and resolve the most persistent typing pitfalls.',
    readTime: '5 min read',
    keyConcepts: [
      'Flying Pinky Syndrome: Raising outer fingers into the air during reaches',
      'Thumb Stagnation: Using the wrong hand for the spacebar',
      'Improper Chair & Desk Height: Shoulder shrugging and arm fatigue',
    ],
    sections: [
      {
        heading: 'Mistake 1: Flying Pinkies',
        content: [
          'When stretching for letters with the index or middle fingers (such as T, G, or B), many typists unconsciously flare their pinkies high into the air. This introduces muscular tension across the entire hand and doubles the time required to hit the next punctuation key.',
          'Remedy: Focus on keeping all unused fingers relaxed and hovering no more than half an inch above their home row resting stations.',
        ],
      },
      {
        heading: 'Mistake 2: Single-Handed Capitalization',
        content: [
          'Hitting the Shift key and a letter on the same hand (for example, using the left pinky for Shift and the left index for T) contorts the wrist into an extreme angle and causes typos.',
          'Remedy: Always use the opposite hand for Shift. If you need a capital T, hold Right Shift with your right pinky. If you need a capital O, hold Left Shift with your left pinky.',
        ],
        callout:
          'Rule: Right-hand capital = Left Shift. Left-hand capital = Right Shift. Never violate this rule.',
      },
      {
        heading: 'Mistake 3: Slouching and Wrist Drag',
        content: [
          'Typing with elbows angled acute (<90 degrees) or slouching forward cuts off blood circulation and strains the trapezius and forearm flexor muscles. Adjust your seat so your elbows rest at an open 90 to 100-degree angle.',
        ],
      },
    ],
    drillPrompt: 'Practice alternating capital letters using opposite-hand Shift keys.',
    targetKeys: ['Shift', 'Capitals'],
    practiceText: 'The Quick Brown Fox Jumped Over The Lazy Dog In London New York Rome Paris Sydney Toronto Berlin Madrid',
  },
  {
    id: 'lesson-7',
    slug: 'daily-typing-practice',
    number: 7,
    title: 'Daily Typing Practice: The 15-Minute Mastery Regimen',
    tagline: 'How 15 minutes of structured, daily deliberate practice beats 3 hours of weekly cramming',
    summary:
      'A proven daily routine balancing warm-ups, accuracy drills, speed sprints, and cool-down paragraph transcription.',
    readTime: '4 min read',
    keyConcepts: [
      'Consistency over volume: daily neurological consolidation',
      'The 4-phase practice protocol: Warm-up, Accuracy, Sprint, Endurance',
      'Tracking progress with Net WPM and error logs',
    ],
    sections: [
      {
        heading: 'The 4-Phase 15-Minute Protocol',
        content: [
          'Phase 1: Warm-up (3 Minutes). Begin with slow home row drills and common word lists. Do not focus on speed. Simply awaken finger coordination and establish tactile landmarks.',
          'Phase 2: Targeted Accuracy (5 Minutes). Pick a challenging text with punctuation and numbers. Aim for 99%+ accuracy. If you make a mistake, stop and analyze which finger failed.',
          'Phase 3: Speed Sprints (4 Minutes). Run two or three 60-second typing tests. Push past your comfortable pace and focus on smooth chunking and buffer reading.',
          'Phase 4: Fluid Paragraph Reading (3 Minutes). Type a peaceful literary or scientific paragraph at 85% maximum effort. Emphasize relaxed breathing and clean posture.',
        ],
        callout:
          'Pro Tip: Practice early in the day or before intense typing work. Your neuroplasticity is highest when your mind and hands are fresh.',
      },
    ],
    drillPrompt: 'Complete this balanced endurance paragraph as part of your daily routine.',
    targetKeys: ['Full Text'],
    practiceText: 'Consistency is the silent architect of mastery. Fifteen minutes of focused, mindful practice repeated each day will build faster, more enduring keyboard skill than hours of unfocused repetition.',
  },
  {
    id: 'lesson-8',
    slug: 'keyboard-familiarity',
    number: 8,
    title: 'Keyboard Familiarity: Mastering Modifiers, Numbers & Symbols',
    tagline: 'Unshackle yourself from keyboard anxiety when coding, calculating, or writing equations',
    summary:
      'Tackle the top row symbols (@, #, $, %, &, *), brackets, backslashes, and navigation keys without breaking touch typing discipline.',
    readTime: '5 min read',
    keyConcepts: [
      'Top row symbol finger pairing: matching digits with their shifted characters',
      'Bracket & brace navigation for developers and technical professionals',
      'Navigation keys and shortcut muscle memory',
    ],
    sections: [
      {
        heading: 'The Shift-Number Matrix',
        content: [
          'Typists often dread hitting symbols like %, &, or @ because they feel unfamiliar. However, every symbol key is simply the shifted partner of its base digit.',
          'Left pinky controls ! (1), left ring controls @ (2), left middle controls # (3), left index handles $ (4) and % (5). Right index handles ^ (6) and & (7), right middle handles * (8), right ring handles ( (9), and right pinky handles ) (0).',
        ],
      },
      {
        heading: 'Coding and Mathematical Brackets',
        content: [
          'Square brackets [ ], curly braces { }, and angle brackets < > are common in modern technical correspondence and code. The right pinky stretches one key to the right for [ and ], and two keys for Enter.',
        ],
        callout:
          'Exercise: Hold Shift with your left pinky and use your right fingers to type: & * ( ) _ + cleanly without looking.',
      },
    ],
    drillPrompt: 'Practice common symbols, digits, and formula combinations.',
    targetKeys: ['1-0', 'Symbols'],
    practiceText: 'Total: $4,580.95 (discount: 15% off). Contact support@keypulse.org for invoice #982-A & #982-B.',
  },
];
