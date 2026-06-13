"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/lib/hooks/useProgress";
import { EXAMS_BY_ID, isExamReady } from "@/lib/constants/exams";
import { startExamAttempt } from "@/lib/hooks/useExamAttempt";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Format helper                                                      */
/* ------------------------------------------------------------------ */

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return m > 0 ? `${m} min` : `${seconds}s`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface StartPageProps { params: { lng: string; examId: string } }

export default function ExamStartPage({ params: { lng, examId } }: StartPageProps) {
  const { t: _t } = useTranslation("common");
  const router = useRouter();
  const { user } = useAuth();
  const { isModuleUnlocked } = useProgress(user?.uid);

  const exam = EXAMS_BY_ID[examId];
  useEffect(() => {
    if (!user) router.push(`/${lng}/auth/sign-in`);
  }, [user, lng, router]);

  if (!exam || !user) return null;

  const ready = isExamReady(exam);
  const isLocked = exam.requiresModuleCompletion.some((mid) => !isModuleUnlocked(mid));
  const title = exam.title[lng as "es" | "en"] ?? exam.title.en;
  const desc = exam.description[lng as "es" | "en"] ?? exam.description.en;

  async function handleStart() {
    try {
      const attemptId = await startExamAttempt(user!.uid, examId);
      router.push(`/${lng}/exams/${examId}/take/${attemptId}`);
    } catch {
      // Error handling
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <Badge variant="warning" size="md" className="mb-4">{lng === "es" ? "Próximamente" : "Coming Soon"}</Badge>
          <p className="text-[var(--color-text-muted)]">
            {lng === "es" ? "Este examen aún no está disponible. El banco de preguntas se está preparando." : "This exam isn't available yet. Its question bank is being prepared."}
          </p>
          <Link href={`/${lng}/exams`}>
            <Button variant="secondary" size="sm" className="mt-4">{lng === "es" ? "Volver" : "Back"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <Badge variant="locked" size="md" className="mb-4">{lng === "es" ? "Bloqueado" : "Locked"}</Badge>
          <p className="text-[var(--color-text-muted)]">
            {lng === "es" ? "Completa los módulos requeridos para desbloquear este examen." : "Complete the required modules to unlock this exam."}
          </p>
          <Link href={`/${lng}/exams`}>
            <Button variant="secondary" size="sm" className="mt-4">{lng === "es" ? "Volver" : "Back"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-2xl">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">{title}</h1>
          <p className="mb-8 text-sm text-[var(--color-text-muted)]">{desc}</p>
        </div>

        {/* Rules */}
        <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
            {lng === "es" ? "Reglas e Instrucciones" : "Rules & Instructions"}
          </h2>
          <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <li className="flex gap-2">
              <span>⏱</span>
              <span>{lng === "es" ? `Tienes ${fmtTime(exam.timeLimit)} para completar ${exam.questionCount} preguntas.` : `You have ${fmtTime(exam.timeLimit)} to complete ${exam.questionCount} questions.`}</span>
            </li>
            <li className="flex gap-2">
              <span>🎯</span>
              <span>{lng === "es" ? `Necesitas ${exam.passingScore}% para aprobar.` : `You need ${exam.passingScore}% to pass.`}</span>
            </li>
            <li className="flex gap-2">
              <span>⬅</span>
              <span>{lng === "es" ? "Puedes navegar entre preguntas libremente y cambiar tus respuestas." : "You can freely navigate between questions and change your answers."}</span>
            </li>
            <li className="flex gap-2">
              <span>🕐</span>
              <span>{lng === "es" ? "El examen se envía automáticamente al agotarse el tiempo." : "The exam auto-submits when time runs out."}</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>{lng === "es" ? "No cambies de pestaña durante el examen. Se registrará como advertencia." : "Don't switch tabs during the exam. It will be logged as a warning."}</span>
            </li>
          </ul>
        </div>

        {/* Tips */}
        <div className="mb-8 rounded-xl border border-brand-green-500/20 bg-brand-green-500/5 p-5">
          <h3 className="mb-2 text-sm font-semibold text-brand-green-400">
            {lng === "es" ? "Consejos para el éxito" : "Tips for Success"}
          </h3>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>{lng === "es" ? "• Lee cada pregunta con atención. No hay prisa." : "• Read each question carefully. No rush."}</li>
            <li>{lng === "es" ? "• Si no sabes una respuesta, marca la pregunta y vuelve después." : "• If unsure, flag the question and come back later."}</li>
            <li>{lng === "es" ? "• Las explicaciones te enseñarán incluso si fallas." : "• Explanations will teach you even if you get it wrong."}</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" size="lg" className="!bg-brand-orange-500 hover:!bg-brand-orange-400" onClick={handleStart}>
            {lng === "es" ? "¡Estoy listo! — Comenzar Examen" : "I'm Ready — Start Exam"}
          </Button>
          <Link href={`/${lng}/exams`}>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              {lng === "es" ? "Cancelar" : "Cancel"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
