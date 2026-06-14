"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { getModulesForCampus, getCampusById, QA_CAMPUS } from "@/lib/constants/campuses";
import { getExamsForCampus, isExamReady } from "@/lib/constants/exams";
import { CURRICULUM } from "@/lib/constants/curriculum";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CampusPageClient() {
  const params = useParams();
  const lng = (params?.lng as string) ?? "es";
  const campusId = params?.campusId as string;
  const { t } = useTranslation("common");

  const campus = getCampusById(campusId);
  const moduleIds = getModulesForCampus(campusId);
  const modules = moduleIds
    .map((id) => CURRICULUM.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);
  const exams = getExamsForCampus(campusId);

  if (!campus) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {t("campus.notFound")}
        </h1>
        <Link href={`/${lng}/dashboard`} className="mt-4 inline-block text-brand-forest-500 hover:underline">
          {t("campus.backToDashboard")}
        </Link>
      </div>
    );
  }

  const lang = lng === "es" ? "es" : "en";
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const totalMinutes = modules.reduce((sum, mod) => sum + mod.estimatedMinutes, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav aria-label="breadcrumb" className="mb-2 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Link href={`/${lng}`} className="hover:text-[var(--color-text-primary)] hover:underline">
            {QA_CAMPUS.title[lang]}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--color-text-primary)]">{campus.title[lang]}</span>
        </nav>

        <Link href={`/${lng}/dashboard`} className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t("campus.backToDashboard")}
        </Link>

        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              {campus.title[lang]}
            </h1>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              {campus.description[lang]}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <Badge variant="info">{t("campus.modules", { count: modules.length })}</Badge>
          <Badge variant="success">{t("campus.lessons", { count: totalLessons })}</Badge>
          <Badge variant="warning">{t("campus.duration", { minutes: totalMinutes })}</Badge>
          {campus.status === "coming_soon" && (
            <Badge variant="error">{t("campus.comingSoon")}</Badge>
          )}
        </div>

        {exams.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-secondary)]">
              {t("campus.takeExam")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {exams.map((exam) =>
                isExamReady(exam) ? (
                  <Link
                    key={exam.id}
                    href={`/${lng}/exams/${exam.id}/start`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-forest-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-forest-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {exam.title[lang]}
                  </Link>
                ) : (
                  <span
                    key={exam.id}
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[var(--color-bg-elevated)] px-5 py-2.5 font-semibold text-[var(--color-text-muted)]"
                    title={t("campus.comingSoon")}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {exam.title[lang]}
                    <span className="ml-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-400">
                      {t("campus.comingSoon")}
                    </span>
                  </span>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress overview */}
      <Card className="mb-8 p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {t("campus.overallProgress")}
          </span>
          <span className="text-sm font-bold text-[var(--color-text-primary)]">
            0%
          </span>
        </div>
        <ProgressBar value={0} size="lg" />
      </Card>

      {/* Modules grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, index) => {
          const isLocked = campus.status === "coming_soon";

          return (
            <Link
              key={mod.id}
              href={isLocked ? "#" : `/${lng}/learn/${mod.id}`}
              className={[
                "group block",
                isLocked ? "cursor-not-allowed opacity-60" : "",
              ].join(" ")}
            >
              <Card className="h-full p-5 transition-all hover:border-brand-forest-500/30 hover:shadow-lg hover:shadow-brand-forest-500/5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
                    {t("campus.module")} {index + 1}
                  </span>
                  {isLocked && (
                    <svg className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>

                <h3 className="mb-2 font-semibold text-[var(--color-text-primary)] group-hover:text-brand-forest-400">
                  {mod.title[lang]}
                </h3>

                <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                  {mod.description[lang]}
                </p>

                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>{t("campus.lessonsCount", { count: mod.lessons.length })}</span>
                  <span>{t("campus.minutesCount", { minutes: mod.estimatedMinutes })}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
