/**
 * Exam scoring and question generation utilities.
 */

import type { ExamQuestion, ExamAnswer, ExamDifficulty } from "@/types/exam";
import { CURRICULUM } from "@/lib/constants/curriculum";

/* ------------------------------------------------------------------ */
/*  Question bank registry (populated by module question files)         */
/* ------------------------------------------------------------------ */

let QUESTION_BANK: ExamQuestion[] = [];

export function registerQuestions(questions: ExamQuestion[]): void {
  QUESTION_BANK = [...QUESTION_BANK, ...questions];
}

export function getQuestionBank(): ExamQuestion[] {
  return QUESTION_BANK;
}

export function getQuestionsForModules(moduleIds: string[]): ExamQuestion[] {
  return QUESTION_BANK.filter((q) =>
    q.moduleIds.some((id) => moduleIds.includes(id))
  );
}

/* ------------------------------------------------------------------ */
/*  Question generation                                                */
/* ------------------------------------------------------------------ */

/**
 * Generate a random set of questions for an exam attempt.
 * Ensures difficulty distribution: 40% easy, 35% medium, 25% hard.
 * Uses a seed (userId + examId) for deterministic-ish randomization.
 */
export function generateExamQuestions(
  examId: string,
  userId: string,
  moduleIds: string[],
  count: number
): ExamQuestion[] {
  const pool = getQuestionsForModules(moduleIds);
  if (pool.length === 0) return [];

  // Sort into difficulty buckets
  const easy = pool.filter((q) => q.difficulty === "easy");
  const medium = pool.filter((q) => q.difficulty === "medium");
  const hard = pool.filter((q) => q.difficulty === "hard");

  const easyTarget = Math.round(count * 0.4);
  const mediumTarget = Math.round(count * 0.35);
  const hardTarget = count - easyTarget - mediumTarget;

  const seed = hashCode(userId + examId);

  const selected: ExamQuestion[] = [
    ...shuffleAndTake(easy, Math.min(easyTarget, easy.length), seed),
    ...shuffleAndTake(medium, Math.min(mediumTarget, medium.length), seed + 1),
    ...shuffleAndTake(hard, Math.min(hardTarget, hard.length), seed + 2),
  ];

  // Fill remaining from any bucket
  const selectedIds = new Set(selected.map((q) => q.id));
  const remaining = pool.filter((q) => !selectedIds.has(q.id));
  const extra = shuffleAndTake(remaining, count - selected.length, seed + 3);
  selected.push(...extra);

  // Shuffle final list
  return shuffleAndTake(selected, selected.length, seed + 4);
}

/* ------------------------------------------------------------------ */
/*  Scoring                                                            */
/* ------------------------------------------------------------------ */

/**
 * Score an exam attempt using an equal-weight model: every question counts
 * the same, regardless of its `points` value. Returns the percentage of
 * questions answered correctly, rounded to the nearest integer.
 *
 * The denominator is the number of questions in the exam set (`questions`),
 * so unanswered or missing questions count as incorrect. This keeps the
 * headline score consistent with the "correct / total" fraction shown on
 * the results page (no points-weighted vs. equal-weight drift).
 */
export function calculateScore(
  answers: ExamAnswer[],
  questions: ExamQuestion[]
): number {
  if (questions.length === 0) return 0;

  const questionIds = new Set(questions.map((q) => q.id));

  let correct = 0;
  for (const ans of answers) {
    if (ans.isCorrect && questionIds.has(ans.questionId)) correct++;
  }

  return Math.round((correct / questions.length) * 100);
}

export function getQuestionPoints(question: ExamQuestion): number {
  return question.points;
}

/**
 * Identify modules where the user scored below 60% correct.
 * Returns module IDs sorted by weakness (worst first).
 */
export function identifyWeakAreas(
  answers: ExamAnswer[],
  questions: ExamQuestion[]
): string[] {
  const moduleCorrect = new Map<string, number>();
  const moduleTotal = new Map<string, number>();

  const questionMap = new Map<string, ExamQuestion>();
  for (const q of questions) questionMap.set(q.id, q);

  for (const ans of answers) {
    const q = questionMap.get(ans.questionId);
    if (!q) continue;

    for (const modId of q.moduleIds) {
      moduleTotal.set(modId, (moduleTotal.get(modId) ?? 0) + 1);
      if (ans.isCorrect) {
        moduleCorrect.set(modId, (moduleCorrect.get(modId) ?? 0) + 1);
      }
    }
  }

  const weakAreas: { id: string; pct: number }[] = [];
  for (const [modId, total] of moduleTotal) {
    const correct = moduleCorrect.get(modId) ?? 0;
    const pct = total > 0 ? (correct / total) * 100 : 0;
    if (pct < 60) {
      weakAreas.push({ id: modId, pct });
    }
  }

  weakAreas.sort((a, b) => a.pct - b.pct);
  return weakAreas.map((w) => w.id);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function shuffleAndTake<T>(arr: T[], n: number, seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
