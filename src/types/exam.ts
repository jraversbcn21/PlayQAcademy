/**
 * Exam system type definitions.
 */

/* ------------------------------------------------------------------ */
/*  Question types                                                     */
/* ------------------------------------------------------------------ */

export type ExamQuestionType =
  | "single_choice"
  | "multiple_choice"
  | "true_false"
  | "code_output"
  | "code_completion";

export type ExamDifficulty = "easy" | "medium" | "hard";

export interface ExamOption {
  id: string;
  text: { es: string; en: string };
}

export interface ExamQuestion {
  id: string;
  type: ExamQuestionType;
  difficulty: ExamDifficulty;
  moduleIds: string[];
  question: { es: string; en: string };
  codeSnippet?: string;
  options: ExamOption[];
  correctOptionIds: string[];
  explanation: { es: string; en: string };
  points: number;
  timeEstimateSeconds: number;
}

/* ------------------------------------------------------------------ */
/*  Exam definition                                                    */
/* ------------------------------------------------------------------ */

export type ExamType = "module" | "midterm" | "final";

export interface Exam {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  type: ExamType;
  moduleIds: string[];
  questionCount: number;
  timeLimit: number; // seconds
  passingScore: number; // 0-100
  requiresModuleCompletion: string[]; // module ids
}

/* ------------------------------------------------------------------ */
/*  Exam attempt                                                       */
/* ------------------------------------------------------------------ */

export interface ExamAnswer {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  timeSpent: number; // seconds spent on this question
}

export type ExamStatus = "in_progress" | "submitted" | "abandoned";

export interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  startedAt: string; // ISO
  submittedAt: string | null; // ISO
  timeSpent: number; // seconds
  answers: ExamAnswer[];
  score: number; // 0-100
  passed: boolean;
  status: ExamStatus;
  /**
   * Ids of the questions generated for THIS attempt, in display order.
   * Persisted at start so review/scoring always use the exact set the
   * user saw, even if the question bank changes later. Attempts created
   * before this field existed fall back to seeded regeneration.
   */
  questionIds?: string[];
}

/* ------------------------------------------------------------------ */
/*  Point values by difficulty                                         */
/* ------------------------------------------------------------------ */

export const DIFFICULTY_POINTS: Record<ExamDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};
