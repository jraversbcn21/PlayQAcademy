"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
/*  Creator social/portfolio links                                      */
/* ------------------------------------------------------------------ */

const CREATOR_LINKS = [
  {
    href: "https://www.linkedin.com/in/jorge-carre%C3%B1o-dam/",
    labelKey: "curriculum.creator.linkedinLabel",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/jraversbcn21",
    labelKey: "curriculum.creator.githubLabel",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/jraversbcn21/MyCampusISTQB_26",
    labelKey: "curriculum.creator.istqbLabel",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
    ),
  },
  {
    href: "https://github.com/jraversbcn21/A11yGo",
    labelKey: "curriculum.creator.a11ygoLabel",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
    ),
  },
  {
    href: "https://github.com/jraversbcn21/PixelRuler",
    labelKey: "curriculum.creator.pixelrulerLabel",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
    ),
  },
];

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

  function skillKey(kind: "title" | "description", key: string) {
    return `curriculum.skills.${key}.${kind}`;
  }

  function whyKey(section: string) {
    return `curriculum.whyThis.${section}`;
  }

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
      {/*  SECTION 2 — About the Creator                                   */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
        <div className="container-app">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.creator.sectionTitle")}
          </h2>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Photo */}
            <div className="shrink-0">
              <Image
                src="/jorge-profile.png"
                alt={t("curriculum.creator.name")}
                width={280}
                height={280}
                className="rounded-2xl ring-2 ring-brand-blue-500/30 shadow-xl shadow-brand-blue-500/10"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                {t("curriculum.creator.name")}
              </h3>
              <p className="mt-1 text-sm text-brand-blue-400">
                {t("curriculum.creator.role")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t("curriculum.creator.description")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t("curriculum.creator.portfolio")}
              </p>

              {/* Social / project links */}
              <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                {CREATOR_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(link.labelKey)}
                    className="rounded-lg border border-[var(--color-border)] p-2.5 text-[var(--color-text-muted)] transition-colors hover:border-brand-blue-500/40 hover:text-brand-blue-400 hover:bg-brand-blue-500/10"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3 — Module Grid                                         */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
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
                  <Card variant="highlight" className="group transition-transform hover:-translate-y-0.5">
                    <div className="mb-3 flex items-start justify-between">
                      <span className="rounded-md bg-brand-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-brand-blue-400">
                        M{mod.order}
                      </span>
                      <Badge variant={data.difficultyColor} size="sm">
                        {data.difficultyLabel}
                      </Badge>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
                      {data.title}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {data.description}
                    </p>
                    <p className="mb-4 text-xs text-[var(--color-text-muted)]">
                      {data.statsText}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleExpand(mod.order)}
                      className="flex items-center gap-1 text-sm font-medium text-brand-blue-400 transition-colors hover:text-brand-blue-300"
                    >
                      {isExpanded ? t("curriculum.modules.collapseLessons") : t("curriculum.modules.expandLessons")}
                      <svg
                        className={["h-4 w-4 transition-transform", isExpanded ? "rotate-180" : ""].join(" ")}
                        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

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
                              <span className="text-[var(--color-text-secondary)]">{lesson.title}</span>
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
      {/*  SECTION 4 — Skills                                              */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
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
      {/*  SECTION 5 — Certification path                                  */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
        <div className="container-app">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.certification.title")}
          </h2>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
            {examRows.map((exam) => (
              <div key={exam.number} className="flex-1">
                <Card variant="achievement" className="relative h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-500/20 text-sm font-bold text-brand-blue-400">
                      {exam.number}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{exam.title}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <p>{exam.questionsLabel}</p>
                    <p>{exam.timeLabel}</p>
                    <p>{exam.passingLabel}</p>
                  </div>
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
      {/*  SECTION 6 — Why This Campus                                     */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
        <div className="container-app">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.whyThis.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card variant="achievement">
              <div className="mb-3 text-2xl">👨‍💼</div>
              <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                {t(whyKey("creator.title"))}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t(whyKey("creator.description"))}
              </p>
            </Card>
            <Card variant="achievement">
              <div className="mb-3 text-2xl">🌍</div>
              <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                {t(whyKey("bilingual.title"))}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t(whyKey("bilingual.description"))}
              </p>
            </Card>
            <Card variant="achievement">
              <div className="mb-3 text-2xl">🛠️</div>
              <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                {t(whyKey("playground.title"))}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t(whyKey("playground.description"))}
              </p>
            </Card>
            <Card variant="achievement">
              <div className="mb-3 text-2xl">🆓</div>
              <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                {t(whyKey("free.title"))}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t(whyKey("free.description"))}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 7 — Final CTA                                           */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
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
