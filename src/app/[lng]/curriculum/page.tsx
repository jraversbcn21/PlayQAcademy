"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { EXAMS } from "@/lib/constants/exams";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CampusGrid from "@/components/campus/CampusGrid";

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
      <CampusGrid
        lng={lng}
        t={t}
        titleKey="curriculum.campuses.title"
        subtitleKey="curriculum.campuses.subtitle"
      />

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
