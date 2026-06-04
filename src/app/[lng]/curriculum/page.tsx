"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { CAMPUSES, getModulesForCampus } from "@/lib/constants/campuses";
import { CURRICULUM } from "@/lib/constants/curriculum";
import { EXAMS } from "@/lib/constants/exams";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

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
  { key: "istqb", icon: "📜" },
  { key: "staticTesting", icon: "📄" },
  { key: "testDesign", icon: "🎯" },
] as const;

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function CurriculumPage() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const { user } = useAuth();

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
              {t("curriculum.hero.stats.campuses")}
            </span>
            <span className="rounded-full bg-brand-purple-500/10 px-4 py-1.5 text-sm font-medium text-brand-purple-400 ring-1 ring-inset ring-brand-purple-500/20">
              {t("curriculum.hero.stats.bilingual")}
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2 — Campus Selector                                      */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
        <div className="container-app">
          <h2 className="mb-4 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.campuses.title")}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            {t("curriculum.campuses.subtitle")}
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {CAMPUSES.map((campus, idx) => {
              const lang = lng === "es" ? "es" : "en";
              const moduleIds = getModulesForCampus(campus.id);
              const modules = moduleIds
                .map((id) => CURRICULUM.find((m) => m.id === id))
                .filter((m): m is NonNullable<typeof m> => m !== undefined);
              const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
              const totalMinutes = modules.reduce((sum, mod) => sum + mod.estimatedMinutes, 0);

              return (
                <Link
                  key={campus.id}
                  href={`/${lng}/campus/${campus.id}`}
                  className="animate-fade-in-up block"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Card variant="highlight" className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 flex items-start justify-between">
                      <span className="rounded-md bg-brand-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-brand-blue-400">
                        {t("curriculum.campuses.modulesCount", { count: modules.length })}
                      </span>
                      <Badge variant={campus.status === "active" ? "success" : "warning"} size="sm">
                        {campus.status === "active" ? t("curriculum.campuses.active") : t("curriculum.campuses.comingSoon")}
                      </Badge>
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)] group-hover:text-brand-blue-400">
                      {campus.title[lang]}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {campus.description[lang]}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
                      <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1">
                        {t("curriculum.campuses.lessonsCount", { count: totalLessons })}
                      </span>
                      <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1">
                        {t("curriculum.campuses.minutesCount", { minutes: totalMinutes })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-brand-blue-400">
                      {t("curriculum.campuses.explore")}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3 — Skills                                              */}
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
      {/*  SECTION 4 — Certification path                                  */}
      {/* ================================================================ */}
      <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
        <div className="container-app">
          <h2 className="mb-4 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("curriculum.certification.title")}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            {t("curriculum.certification.subtitle")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      {/*  SECTION 5 — Why This Campus                                     */}
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
      {/*  SECTION 6 — Final CTA                                           */}
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
