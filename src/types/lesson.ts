/**
 * Lesson content type definitions.
 *
 * A LessonContent is a sequence of typed sections that the LessonRenderer
 * component maps to the appropriate React component at render time.
 */

/* ------------------------------------------------------------------ */
/*  Bilingual text helper                                              */
/* ------------------------------------------------------------------ */

export interface Bilingual {
  es: string;
  en: string;
}

/* ------------------------------------------------------------------ */
/*  Section discriminated union                                        */
/* ------------------------------------------------------------------ */

export interface HeadingSection {
  type: "heading";
  level: 1 | 2 | 3;
  content: Bilingual;
}

export interface ParagraphSection {
  type: "paragraph";
  content: Bilingual;
}

export interface CodeSection {
  type: "code";
  language: string;
  code: string;
  caption?: Bilingual;
}

export interface CalloutSection {
  type: "callout";
  variant: "info" | "warning" | "tip" | "important";
  content: Bilingual;
}

export interface ImageSection {
  type: "image";
  src: string;
  alt: Bilingual;
}

export interface VideoSection {
  type: "video";
  src: string;
  provider: "youtube" | "vimeo" | "local";
}

export interface ListSection {
  type: "list";
  ordered: boolean;
  items: Bilingual[];
}

export interface QuizSection {
  type: "quiz";
  questionId: string; // unique id for tracking
  question: Bilingual;
  options: QuizOption[];
  correctOptionId: string;
  explanation: Bilingual;
}

export interface QuizOption {
  id: string;
  text: Bilingual;
}

export interface ExerciseSection {
  type: "exercise";
  exerciseId: string; // unique id for tracking
  instructions: Bilingual;
  starterCode: string;
  solution: string;
  hints: Bilingual[];
}

export interface FlashcardSection {
  type: "flashcard";
  flashcardId: string; // unique id for tracking
  front: Bilingual;
  back: Bilingual;
}

export interface TableRow {
  cells: Bilingual[];
}

export interface TableSection {
  type: "table";
  headers: Bilingual[];
  rows: TableRow[];
  caption?: Bilingual;
}

export type LessonSection =
  | HeadingSection
  | ParagraphSection
  | CodeSection
  | CalloutSection
  | ImageSection
  | VideoSection
  | ListSection
  | QuizSection
  | ExerciseSection
  | FlashcardSection
  | TableSection;

/* ------------------------------------------------------------------ */
/*  Lesson content                                                     */
/* ------------------------------------------------------------------ */

export interface LessonContent {
  id: string;
  moduleId: string;
  sections: LessonSection[];
  resources?: LessonResource[];
}

export interface LessonResource {
  title: Bilingual;
  url: string;
}

/* ------------------------------------------------------------------ */
/*  Lesson metadata (from curriculum + progress)                       */
/* ------------------------------------------------------------------ */

export interface LessonMeta {
  id: string;
  moduleId: string;
  moduleTitle: Bilingual;
  title: Bilingual;
  description: Bilingual;
  estimatedMinutes: number;
  lessonNumber: number; // 1-based within module
  totalInModule: number;
}
