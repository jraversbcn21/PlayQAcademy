"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { CURRICULUM } from "@/lib/constants/curriculum";
import { EXAMS } from "@/lib/constants/exams";
import type { Difficulty, CurriculumModule } from "@/lib/constants/curriculum";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

/* ------------------------------------------------------------------ */
/*  Difficulty config                                                  */
/* ------------------------------------------------------------------ */

const DIFFICULTY_CONFIG: Record<Difficulty, { color: "success" | "warning" | "error" }> = {
  beginner: { color: "success" },
  intermediate: { color: "warning" },
  advanced: { color: "error" },
};

/* ------------------------------------------------------------------ */
/*  Skill icons                                                        */
/* ------------------------------------------------------------------ */

const SKILLS = [
  { key: "typescript", icon: "🎯" },
  { key: "playwright", icon: "🎭" },
  { key: "locators", icon: "🔍" },
  { key: "pom", icon: "🏗️" },
  { key: "api", icon: "🔌" },
  { key: "cicd", icon: "🚀" },
] as const;

/* ------------------------------------------------------------------ */
/*  Module card data factory                                            */
/* ------------------------------------------------------------------ */

function moduleCardData(mod: CurriculumModule, lng: string, t: (k: string, opts?: Record<string, unknown>) => string) {
  const lang = lng === "es" ? "es" : "en";
  const totalMin = mod.estimatedMinutes;
  const lessonsCount = mod.lessons.length;
  const diffCfg = DIFFICULTY_CONFIG[mod.difficulty];

  return {
    order: mod.order,
    title: mod.title[lang],
    description: mod.description[lang],
    difficultyLabel: t(`curriculum.modules.${mod.difficulty}`),
    difficultyColor: diffCfg.color,
    statsText: `${t("curriculum.modules.lessonsCount", { count: lessonsCount })} · ${totalMin} ${t("curriculum.modules.minutes")}`,
    lessons: mod.lessons.map((l, idx) => ({
      number: `${mod.order}.${idx + 1}`,
      title: l.title[lang],
      minutes: l.estimatedMinutes,
    })),
  };
}

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function CurriculumPage() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const { user } = useAuth();

  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  function toggleExpand(order: number) {
    setExpandedModule((prev) => (prev === order ? null : order));
  }

  /* ---- Skill i18n helper ---- */
  function skillKey(kind: "title" | "description", key: string) {
    return `curriculum.skills.${key}.${kind}`;
  }

  /* ---- Exams data ---- */
  const examRows = EXAMS.map((exam) => {
    const lang = lng === "es" ? "es" : "en";
    return {
      number: EXAMS.indexOf(exam) + 1,
      title: exam.title[lang],
      questionsLabel: t("curriculum.certification.questions", { count: exam.questionCount }),
      timeLabel: t("curriculum.certification.timeLimit", { time: Math.floor(exam.timeLimit / 60) }),
      passingLabel: t("curriculum.certification.passing", { percent: exam.passingScore }),
      isFinal: exam.type === "final",
    };
  });

  return (
    <>
      {/* ================================================================ */}
      {/*  SECTION 1 — Hero                                                */}
      {/* ================================================================ */}
      <section className="flex min-h-[40vh] items-center justify-center px-4 py-20">
        <div className="container-app text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="animate-gradient bg-gradient-to-r from-brand-blue-400 via-brand-green-400 to-brand-orange-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              {t("curriculum.hero.title")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
            {t("curriculum.hero.subtitle")}
          </p>

          {/* Stat badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-brand-blue-500/10 px-4 py-1.5 text-sm font-medium text-brand-blue-400 ring-1 ring-inset ring-brand-blue-500/20">
              {t("curriculum.hero.stats.lessons")}
            </span>
            <span className="rounded-full bg-brand-green-500/10 px-4 py-1.5 text-sm font-medium text-brand-green-400 ring-1 ring-inset ring-brand-green-500/20">
              {t("curriculum.hero.stats.modules")}
            </span>
            <span className="rounded-full bg-brand-orange-500/10 px-4 py-1.5 text-sm font-medium text-brand-orange-400 ring-1 ring-inset ring-brand-orange-500/20">
              {t("curriculum.hero.stats.bilingual")}
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2 — Module grid                                         */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-20">
        <div className="container-app">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.modules.title")}
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {CURRICULUM.map((mod, idx) => {
              const data = moduleCardData(mod, lng, t);
              const isExpanded = expandedModule === mod.order;

              return (
                <div
                  key={mod.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Card variant="highlight" className="group">
                    <div className="mb-3 flex items-start justify-between">
                      {/* Module number */}
                      <span className="rounded-md bg-brand-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-brand-blue-400">
                        M{mod.order}
                      </span>
                      {/* Difficulty */}
                      <Badge variant={data.difficultyColor} size="sm">
                        {data.difficultyLabel}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
                      {data.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {data.description}
                    </p>

                    {/* Stats */}
                    <p className="mb-4 text-xs text-[var(--color-text-muted)]">
                      {data.statsText}
                    </p>

                    {/* Expand toggle */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(mod.order)}
                      className="flex items-center gap-1 text-sm font-medium text-brand-blue-400 transition-colors hover:text-brand-blue-300"
                    >
                      {isExpanded
                        ? t("curriculum.modules.collapseLessons")
                        : t("curriculum.modules.expandLessons")}
                      <svg
                        className={["h-4 w-4 transition-transform", isExpanded ? "rotate-180" : ""].join(" ")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Lesson list */}
                    {isExpanded && (
                      <div className="mt-4 space-y-2 border-t border-[var(--color-border)] pt-4">
                        {data.lessons.map((lesson) => (
                          <div
                            key={lesson.number}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--color-bg-elevated)]"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-medium text-brand-blue-400 shrink-0">
                                {lesson.number}
                              </span>
                              <span className="text-[var(--color-text-secondary)]">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)] shrink-0">
                              {lesson.minutes} {t("curriculum.modules.minutes")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3 — Skills                                              */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-20">
        <div className="container-app">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.skills.title")}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map(({ key, icon }) => (
              <Card key={key} variant="lesson">
                <div className="mb-3 text-3xl">{icon}</div>
                <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                  {t(skillKey("title", key))}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {t(skillKey("description", key))}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 4 — Certification path                                  */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-20">
        <div className="container-app">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.certification.title")}
          </h2>

          {/* Timeline: horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
            {examRows.map((exam) => (
              <div key={exam.number} className="flex-1">
                <Card variant="achievement" className="relative h-full">
                  {/* Exam number badge */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-500/20 text-sm font-bold text-brand-blue-400">
                      {exam.number}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {exam.title}
                    </h3>
                  </div>

                  {/* Exam details */}
                  <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <p>{exam.questionsLabel}</p>
                    <p>{exam.timeLabel}</p>
                    <p>{exam.passingLabel}</p>
                  </div>

                  {/* Final exam unlock badge */}
                  {exam.isFinal && (
                    <p className="mt-4 rounded-lg bg-brand-blue-500/10 px-3 py-2 text-sm font-medium text-brand-blue-400">
                      {t("curriculum.certification.unlocksBadge")}
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 5 — CTA                                                 */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-20">
        <div className="container-app text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.cta.title")}
          </h2>
          <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
            {t("curriculum.cta.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {user ? (
              <Link href={`/${lng}/dashboard`}>
                <Button variant="primary" size="lg" className="!bg-brand-orange-500 hover:!bg-brand-orange-400">
                  {t("curriculum.cta.goToDashboard")}
                </Button>
              </Link>
            ) : (
              <>
                <Link href={`/${lng}/auth/sign-up`}>
                  <Button variant="primary" size="lg" className="!bg-brand-orange-500 hover:!bg-brand-orange-400">
                    {t("curriculum.cta.signUp")}
                  </Button>
                </Link>
                <Link href={`/${lng}/auth/sign-in`}>
                  <Button variant="secondary" size="lg">
                    {t("curriculum.cta.haveAccount")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
