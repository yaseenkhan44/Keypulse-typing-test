import { PracticeExercise } from '../types';

export const PRACTICE_MODULES: PracticeExercise[] = [
  {
    id: 'beginner-home-row',
    category: 'beginner',
    title: 'Beginner: Home Row Mastery',
    subtitle: 'Build the foundational anchor positions for both hands',
    difficulty: 'Beginner',
    targetKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'],
    instructions:
      'Rest your left fingers gently on A-S-D-F and your right fingers on J-K-L-;. Feel for the tiny raised tactile bumps on F and J under your index fingertips. Never look down at the keyboard. Focus on light, consistent finger taps while keeping your wrists slightly elevated above your desk.',
    tips: [
      'Keep thumbs resting loosely over the spacebar.',
      'Only move the specific finger assigned to each key; keep remaining fingers lightly poised.',
      'Maintain a calm, unhurried cadence: 100% accuracy builds speed far faster than rushed typing.',
    ],
    text: 'asdf jkl; asdf jkl; a sad lad; fall salads; ask dad; a flask falls; glad lads ask; all salads fall; dad asks a lad; salad flask; a sad fall; asks all lads;',
    recommendedDurationSeconds: 45,
  },
  {
    id: 'intermediate-shifts-rows',
    category: 'intermediate',
    title: 'Intermediate: Upper & Lower Rows with Shift Keys',
    subtitle: 'Coordinate smooth reaches to Q-W-E-R-T and Z-X-C-V-B',
    difficulty: 'Intermediate',
    targetKeys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Shift'],
    instructions:
      'Reach upward to the top row or downward to the bottom row, and immediately return each finger to its home row anchor. To capitalize a letter on the right hand, press and hold the Left Shift key with your left pinky; to capitalize a left-hand letter, use the Right Shift key.',
    tips: [
      'Never press Shift with the same hand that presses the letter key.',
      'Curve your fingers like holding a small tennis ball; strike downward rather than sliding.',
      'Notice how the letter E is struck by the left middle finger and O by the right ring finger.',
    ],
    text: 'The quick brown fox jumped high over the river. Quiet white clouds floated across Great Britain and Europe. Every bright morning brings fresh clarity and renewed determination.',
    recommendedDurationSeconds: 60,
  },
  {
    id: 'advanced-punctuation-syntax',
    category: 'advanced',
    title: 'Advanced: Punctuation, Quotes & Complex Syntax',
    subtitle: 'Navigate quotation marks, commas, hyphens, and brackets smoothly',
    difficulty: 'Advanced',
    targetKeys: [',', '.', ';', ':', '"', "'", '?', '!', '-', '(', ')'],
    instructions:
      'Professional transcription and programming require lightning-fast punctuation accuracy. Keep your right pinky agile for semicolons, apostrophes, and quotation marks, while using your left pinky for Shift where needed.',
    tips: [
      'Resist the temptation to look down when reaching for the quote key or question mark.',
      'Keep your wrists floating naturally; do not plant your palms firmly on the desk.',
      'Pay close attention to spacing rules: one space after commas and periods.',
    ],
    text: '“Precision,” the senior editor remarked, “is not an accident; it is the predictable outcome of deliberate, disciplined habit.” Did you notice the subtle rhythm in her advice? (Indeed, we all did.)',
    recommendedDurationSeconds: 60,
  },
  {
    id: 'common-english-words',
    category: 'words',
    title: 'Common English Words: High-Frequency 100 Words',
    subtitle: 'Automate the top words that comprise over 50% of written English',
    difficulty: 'Beginner',
    targetKeys: ['Space', 'All letter keys'],
    instructions:
      'In everyday English prose, approximately 100 high-frequency words account for more than half of all written text. By converting these words into automatic motor patterns (muscle memory chunks), your overall typing speed will surge naturally.',
    tips: [
      'Treat each small word as a single rhythmic hand gesture rather than individual letters.',
      'Tap the spacebar immediately after the last letter without hesitation.',
      'Alternate thumbs for spacebar only if comfortable, or choose your dominant thumb consistently.',
    ],
    text: 'the and that have with this from they will would there their what about which when make like time just know take people into year your good some could them see other than then look only come over think also after work first well even want because give most',
    recommendedDurationSeconds: 60,
  },
  {
    id: 'english-paragraph-flow',
    category: 'paragraphs',
    title: 'English Paragraph Practice: Fluent Reading & Typing',
    subtitle: 'Cultivate buffer reading: reading 2 to 3 words ahead of your fingers',
    difficulty: 'Intermediate',
    targetKeys: ['Capitalization', 'Full Stops', 'Commas'],
    instructions:
      'Top typists look ahead at the next phrase while their fingers finish typing the current word. This buffer reading technique eliminates micro-pauses at word boundaries and keeps your typing output seamless and relaxed.',
    tips: [
      'Never pause between words; maintain a constant, steady metronome rhythm.',
      'Breathe normally and unclench your jaw; physical tension slows muscular reaction times.',
      'If you make a typo, acknowledge it smoothly without breaking your postural alignment.',
    ],
    text: 'Effective communication requires both empathy and precision. When writing professional correspondence, we balance clarity of thought with courteous phrasing. As sentences unfold across the screen, each thought connects to the next, building a persuasive narrative that colleagues and clients can readily appreciate.',
    recommendedDurationSeconds: 90,
  },
  {
    id: 'number-row-sequences',
    category: 'numbers',
    title: 'Number Typing Practice: Top Row Precision',
    subtitle: 'Conquer the top numeric row without losing home row orientation',
    difficulty: 'Advanced',
    targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    instructions:
      'The number row is the most common cause of typing slowdowns because the keys are furthest from the home row. Practice extending your fingers straight up along their assigned columns: left pinky for 1, left ring for 2, left middle for 3, left index for 4 and 5, right index for 6 and 7, right middle for 8, right ring for 9, and right pinky for 0.',
    tips: [
      'Always keep at least one finger of each hand resting on the home row as an anchor.',
      'Notice how 4 and 5 share the left index finger, while 6 and 7 share the right index finger.',
      'Practice financial and inventory sequences to prepare for real-world workplace data entry.',
    ],
    text: 'In 2024, our team processed 1,480 orders totaling $98,750 across 36 regional facilities. By 2025, projected volume increased by 28% to 1,894 units, maintaining a 99.4% quality rating across all 12 fiscal months.',
    recommendedDurationSeconds: 60,
  },
  {
    id: 'touch-typing-muscle-memory',
    category: 'touch',
    title: 'Touch Typing Practice: Blind Muscle Memory Drills',
    subtitle: 'Eliminate visual reliance completely with paired finger transitions',
    difficulty: 'Intermediate',
    targetKeys: ['Full Keyboard'],
    instructions:
      'This exercise trains tricky cross-hand letter combinations and double-letter transitions (such as "tt", "ee", "ss", "ll"). Keep your eyes strictly locked on the prompt line on your display screen. If you feel lost, use the F and J bumps to re-center without glancing down.',
    tips: [
      'Cover your hands with a light sheet of paper if you catch yourself peeking at the keyboard.',
      'Trust your fingers; muscle memory forms faster when visual interference is completely removed.',
      'Celebrate consistent rhythmic typing over frantic burst speed.',
    ],
    text: 'Commitment to continuous improvement produces extraordinary compounding returns. Small daily sessions of focused attention sharpen neural pathways, turning once difficult mechanical motions into effortless, reflexive second nature.',
    recommendedDurationSeconds: 60,
  },
];
