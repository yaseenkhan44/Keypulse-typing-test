export interface TypingPassage {
  id: string;
  title: string;
  category: 'General' | 'Science' | 'Literature' | 'Workplace' | 'History';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  text: string;
}

export const TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'passage-1',
    title: 'The Art of Deliberate Practice',
    category: 'General',
    difficulty: 'Medium',
    text: 'Deliberate practice is the single most reliable predictor of mastery across any technical discipline. When you learn to type without glancing down at the keyboard, you are training your brain to build direct motor pathways from thought to fingertip. The goal is not merely to press keys faster, but to eliminate hesitations and maintain an even, rhythmic cadence across every row of letters.',
  },
  {
    id: 'passage-2',
    title: 'Echoes of the High Seas',
    category: 'Literature',
    difficulty: 'Medium',
    text: 'A brisk northern breeze whispered through the tall rigging as the morning mist dissolved over the harbor. Down along the stone pier, fishermen coiled thick hemp ropes while merchants checked their cargo manifests. The wooden hull groaned gently against the rhythmic swell of the incoming tide, carrying rumors of distant continents and forgotten trade routes across uncharted waters.',
  },
  {
    id: 'passage-3',
    title: 'Modern Architecture and Light',
    category: 'General',
    difficulty: 'Easy',
    text: 'Great buildings achieve their power through the quiet orchestration of natural illumination and structural balance. Wide glass windows welcome the warmth of early daylight into open workspaces, creating a peaceful atmosphere where creativity and discipline can thrive. When design honors both comfort and utility, the ordinary office becomes a sanctuary of focused endeavor.',
  },
  {
    id: 'passage-4',
    title: 'The Principles of Digital Communication',
    category: 'Workplace',
    difficulty: 'Medium',
    text: 'Clear written expression has become the cornerstone of collaborative commerce in our global economy. Colleagues across North America, Europe, and Australia coordinate complex projects through concise messages, shared documentation, and thoughtful feedback. Cultivating the ability to translate nuanced strategic concepts into brisk, precise prose remains an indispensable professional skill.',
  },
  {
    id: 'passage-5',
    title: 'The Cosmic Horizon',
    category: 'Science',
    difficulty: 'Hard',
    text: 'Astronomers peering into deep celestial voids have unlocked luminous galaxies formed barely a few hundred million years after the birth of the universe. Gravitational lensing bends ancient photons across billions of light years, offering glimpses of superheated primordial gas clouds, colossal neutron stars, and mysterious dark matter filaments that weave the hidden fabric of reality.',
  },
  {
    id: 'passage-6',
    title: 'The Renaissance Workshop',
    category: 'History',
    difficulty: 'Medium',
    text: 'In the bustling bottegas of fifteenth-century Florence, apprentices learned the patient alchemy of ground pigments, linseed oil, and geometric perspective. Masters and pupils worked shoulder to shoulder, drafting anatomical studies by candlelight before applying delicate tempera glazes to wooden altarpieces that would outlast empires and define Western artistic tradition for generations.',
  },
  {
    id: 'passage-7',
    title: 'Quiet Habitats of the Forest Floor',
    category: 'Science',
    difficulty: 'Easy',
    text: 'Beneath the dense canopy of ancient cedar and fir trees, an intricate underground web of fungal threads unites the woodland community. Nutrients pass silently between neighboring roots, sustaining young saplings through harsh winters and dry summer months. Every fallen leaf feeds countless micro-organisms that slowly transform decay into rich forest soil.',
  },
  {
    id: 'passage-8',
    title: 'The Dynamics of Cognitive Flow',
    category: 'General',
    difficulty: 'Hard',
    text: 'When human attention is fully absorbed in a challenging task that matches our competence, consciousness enters a distinct equilibrium known as cognitive flow. In this state, inner self-criticism recedes, time appears to warp, and complex manual executions occur with effortless fluidity. Reaching this zone demands uninterrupted immersion and freedom from reactive distractions.',
  },
  {
    id: 'passage-9',
    title: 'Urban Transit and Clean Energy',
    category: 'Workplace',
    difficulty: 'Medium',
    text: 'Metropolitan centers worldwide are redesigning transit corridors to favor electric light rail, separated bicycle thoroughfares, and walkable public plazas. By curbing vehicular emissions and reducing commute bottlenecks, modern cities foster healthier public environments where citizens move with safety, predictability, and diminished environmental strain.',
  },
  {
    id: 'passage-10',
    title: 'The Philosophy of Written Time',
    category: 'Literature',
    difficulty: 'Hard',
    text: 'Language is humanity’s oldest mechanism for traveling through temporal boundaries. Through printed syllables, ancient stoic meditations console contemporary anxieties, and the humorous reflections of Victorian essayists still prompt laughter across centuries. To type thoughtfully is to join this unbroken human chorus of inquiry, wonder, and mutual discovery.',
  },
];

export function getRandomPassage(excludeId?: string): TypingPassage {
  const available = excludeId
    ? TYPING_PASSAGES.filter((p) => p.id !== excludeId)
    : TYPING_PASSAGES;
  const index = Math.floor(Math.random() * available.length);
  return available[index] || TYPING_PASSAGES[0];
}
