export type TestDuration = 15 | 30 | 60 | 120;

export interface TypingStats {
  elapsedSeconds: number;
  totalCharsTyped: number;
  correctChars: number;
  incorrectChars: number;
  errorCount: number;
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  cpm: number; // Characters per minute
}

export interface PracticeExercise {
  id: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'words' | 'paragraphs' | 'numbers' | 'touch';
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetKeys?: string[];
  instructions: string;
  tips: string[];
  text: string;
  recommendedDurationSeconds?: number;
}

export interface LessonContent {
  id: string;
  slug: string;
  number: number;
  title: string;
  tagline: string;
  summary: string;
  readTime: string;
  keyConcepts: string[];
  sections: {
    heading: string;
    content: string[];
    callout?: string;
  }[];
  drillPrompt: string;
  targetKeys: string[];
  practiceText: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  summary: string;
  tableOfContents: {
    id: string;
    title: string;
  }[];
  contentSections: {
    id: string;
    heading: string;
    subheadings?: {
      title: string;
      body: string[];
    }[];
    paragraphs: string[];
    keyTakeaway?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  imagePlaceholder: {
    alt: string;
    caption: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedArticles: string[]; // slugs
}

export interface GameWordTarget {
  id: string;
  word: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  speed: number;
}
