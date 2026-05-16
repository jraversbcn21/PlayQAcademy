"use client";

import { useCallback } from "react";
import { db } from "@/lib/firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import type { ExamAttempt, ExamAnswer, Exam } from "@/types/exam";
import { EXAMS_BY_ID } from "@/lib/constants/exams";
import { generateExamQuestions, calculateScore } from "@/lib/exam/scoring";
import { getQuestionBank } from "@/lib/exam/scoring";

/* ------------------------------------------------------------------ */
/*  Start exam attempt                                                 */
/* ------------------------------------------------------------------ */

export async function startExamAttempt(
  uid: string,
  examId: string
): Promise<string> {
  if (!db) throw new Error("Firestore not initialised");

  const attemptId = `attempt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const exam = EXAMS_BY_ID[examId];
  if (!exam) throw new Error("Exam not found");

  const now = new Date().toISOString();
  const attempt: ExamAttempt = {
    id: attemptId,
    userId: uid,
    examId,
    startedAt: now,
    submittedAt: null,
    timeSpent: 0,
    answers: [],
    score: 0,
    passed: false,
    status: "in_progress",
  };

  await setDoc(doc(db, "exam_attempts", attemptId), attempt);
  return attemptId;
}

/* ------------------------------------------------------------------ */
/*  Save answer                                                        */
/* ------------------------------------------------------------------ */

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  selectedIds: string[],
  correctIds: string[],
  timeSpent: number
): Promise<void> {
  if (!db) return;

  const isCorrect =
    selectedIds.length === correctIds.length &&
    selectedIds.every((id) => correctIds.includes(id));

  // Store in local state via the hook; also sync to Firestore
  const ref = doc(db, "exam_attempts", attemptId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data() as DocumentData;
  const answers: ExamAnswer[] = (data["answers"] as ExamAnswer[]) ?? [];

  const existing = answers.findIndex((a) => a.questionId === questionId);
  const answer: ExamAnswer = { questionId, selectedOptionIds: selectedIds, isCorrect, timeSpent };

  if (existing >= 0) {
    answers[existing] = answer;
  } else {
    answers.push(answer);
  }

  await updateDoc(ref, { answers });
}

/* ------------------------------------------------------------------ */
/*  Submit exam                                                        */
/* ------------------------------------------------------------------ */

export async function submitExam(attemptId: string): Promise<ExamAttempt> {
  if (!db) throw new Error("Firestore not initialised");

  const ref = doc(db, "exam_attempts", attemptId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Attempt not found");

  const data = snap.data() as DocumentData;
  const answers: ExamAnswer[] = (data["answers"] as ExamAnswer[]) ?? [];
  const examId = data["examId"] as string;
  const exam = EXAMS_BY_ID[examId];
  if (!exam) throw new Error("Exam not found");

  // Calculate score
  const questions = generateExamQuestions(examId, data["userId"] as string, exam.moduleIds, exam.questionCount);
  const score = calculateScore(answers, questions);

  const passed = score >= exam.passingScore;
  const startedAt = new Date(data["startedAt"] as string).getTime();
  const timeSpent = Math.round((Date.now() - startedAt) / 1000);

  const updated: Partial<ExamAttempt> = {
    submittedAt: new Date().toISOString(),
    timeSpent,
    score,
    passed,
    status: "submitted",
  };

  await updateDoc(ref, updated);

  // Award points if passed
  if (passed && db) {
    const pointsEarned = Math.round(score * 2); // 200 max for perfect score
    const gRef = doc(db, "gamification", data["userId"] as string);
    const gSnap = await getDoc(gRef);
    if (gSnap.exists()) {
      const gData = gSnap.data() as DocumentData;
      const currentPoints = (gData["totalPoints"] as number) ?? 0;
      await updateDoc(gRef, { totalPoints: currentPoints + pointsEarned });
    }
  }

  return {
    ...(data as ExamAttempt),
    ...updated,
    answers,
  } as ExamAttempt;
}

/* ------------------------------------------------------------------ */
/*  Fetch attempt                                                      */
/* ------------------------------------------------------------------ */

export async function getAttempt(attemptId: string): Promise<ExamAttempt | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "exam_attempts", attemptId));
  if (!snap.exists()) return null;
  return snap.data() as ExamAttempt;
}

/* ------------------------------------------------------------------ */
/*  Fetch exam history for a user                                      */
/* ------------------------------------------------------------------ */

export async function getExamHistory(uid: string): Promise<ExamAttempt[]> {
  if (!db) return [];
  const q = query(
    collection(db, "exam_attempts"),
    where("userId", "==", uid),
    orderBy("submittedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as ExamAttempt);
}

/* ------------------------------------------------------------------ */
/*  Abandon attempt (mark as abandoned, keep partial data)             */
/* ------------------------------------------------------------------ */

export async function abandonAttempt(attemptId: string): Promise<void> {
  if (!db) return;
  const ref = doc(db, "exam_attempts", attemptId);
  const now = new Date().toISOString();
  await updateDoc(ref, { status: "abandoned", submittedAt: now });
}
