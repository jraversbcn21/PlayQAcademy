"use client";

import { useEffect, type ReactNode, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { useProgress, type ModuleProgressInfo } from "@/lib/hooks/useProgress";
import { useGamification } from "@/lib/hooks/useGamification";
import { getLevelFromPoints, getLevelProgress } from "@/lib/gamification/levels";
import { BADGES_BY_ID } from "@/lib/constants/badges";
import { TOTAL_LESSONS, CURRICULUM } from "@/lib/constants/curriculum";
import { CAMPUSES, getCampusForModule } from "@/lib/constants/campuses";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/dashboard/StatCard";
import AchievementCard from "@/components/dashboard/AchievementCard";
import type { Achievement } from "@/components/dashboard/AchievementCard";
import type { EarnedBadge } from "@/types/gamification";
import { CAMPUS_TILES, DEFAULT_TILE } from "@/components/campus/CampusCard";

/* ------------------------------------------------------------------ */
/*  Icons for stat cards — gradient tiles (tech-blue design language) */
/* ------------------------------------------------------------------ */

function PointsIcon(): ReactNode {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-forest-400 to-brand-forest-600 text-white shadow-lg shadow-brand-forest-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

function LessonsIcon(): ReactNode {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 text-white shadow-lg shadow-brand-gold-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    </div>
  );
}

function StreakIcon(): ReactNode {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-terra-400 to-brand-terra-600 text-white shadow-lg shadow-brand-terra-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    </div>
  );
}

function BadgeIcon(): ReactNode {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    </div>
  );
}

function PlayIcon(): ReactNode {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
    </svg>
  );
}

function ArrowIcon(): ReactNode {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function PulsingDot(): ReactNode {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-forest-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-forest-500" />
    </span>
  );
}

function SparkleIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

/**
 * Resume CTA target: the module actually worked on most recently
 * (by `updatedAt`), not just "first unlocked module" — module locking is
 * off platform-wide, so every module across all 3 campuses is "unlocked"
 * and a naive first-unlocked fallback lands on whatever module happens to
 * be first in the global curriculum array, regardless of which campus the
 * user has actually been using.
 *
 * If the most recently touched module is itself now 100% complete,
 * continue with the next incomplete module in the SAME campus (finishing
 * one module shouldn't bounce the user into an unrelated campus); only if
 * that whole campus is done do we fall back to the next incomplete module
 * anywhere. Accounts with literally zero progress fall back to the very
 * first module.
 */
function pickResumeModule(modules: ModuleProgressInfo[]): ModuleProgressInfo | null {
  const touched = modules.filter((m) => m.completedLessonCount > 0);
  if (touched.length === 0) {
    return modules[0] ?? null;
  }

  const mostRecent = [...touched].sort((a, b) => {
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  })[0]!;

  if (mostRecent.status !== "completed") {
    return mostRecent;
  }

  const campus = getCampusForModule(mostRecent.module.id);
  const sameCampusIncomplete = campus
    ? campus.moduleIds
        .map((id) => modules.find((m) => m.module.id === id))
        .find((m): m is ModuleProgressInfo => !!m && m.status !== "completed")
    : undefined;
  if (sameCampusIncomplete) return sameCampusIncomplete;

  return modules.find((m) => m.status !== "completed") ?? mostRecent;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface DashboardPageProps {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ welcome?: string }>;
}

export default function DashboardPage(props: DashboardPageProps) {
  const searchParams = use(props.searchParams);
  const params = use(props.params);

  const {
    lng
  } = params;

  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const {
    progressData,
    loading: _progressLoading,
  } = useProgress(user?.uid);
  const { data: gData } = useGamification(user?.uid);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${lng}/auth/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [authLoading, user, lng, router, pathname]);

  const showWelcomeToast = searchParams?.welcome === "1";

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
      </div>
    );
  }

  // Format today's date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(
    lng === "es" ? "es-ES" : "en-US",
    dateOptions
  );

  const completedLessons = progressData?.totalCompletedLessons ?? 0;
  const overallPercent = progressData?.overallPercent ?? 0;
  const unlockedModules = (progressData?.modules ?? []).filter(
    (m) => m.status !== "locked"
  );

  const resumeModule = pickResumeModule(unlockedModules);

  // Real gamification data
  const gPoints = gData?.totalPoints ?? 0;
  const gStreak = gData?.currentStreak ?? 0;
  const gBadgeCount = (gData?.earnedBadges ?? []).length;
  const levelInfo = getLevelFromPoints(gPoints);
  const levelTitle = levelInfo.title[lng as "es" | "en"] ?? levelInfo.title.en;
  const levelPct = getLevelProgress(gPoints);

  // Map earned badges to AchievementCard format (last 3)
  const earnedAchievements: Achievement[] = (gData?.earnedBadges ?? [])
    .map((eb: EarnedBadge) => {
      const badge = BADGES_BY_ID[eb.badgeId];
      if (!badge) return null;
      return {
        id: badge.id,
        icon: badge.icon,
        name: badge.name[lng as "es" | "en"] ?? badge.name.en,
        description: badge.description[lng as "es" | "en"] ?? badge.description.en,
        earnedAt: eb.earnedAt,
        rarity: badge.rarity,
      };
    })
    .filter((a): a is Achievement => a !== null)
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 3);

  return (
    <div className="px-4 py-8">
      <div className="container-app">
        {/* Welcome banner (only on first sign-up) */}
        {showWelcomeToast && (
          <div className="mb-8 animate-fade-in-up rounded-xl border border-brand-gold-500/20 bg-brand-gold-500/10 p-4">
            <p className="text-sm font-medium text-brand-gold-400">
              {t("dashboard.welcomeMessage", { name: user.displayName ?? user.email })}
            </p>
          </div>
        )}

        {/* ── Welcome header ────────────────────────────────── */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                {t("dashboard.greeting", { name: user.displayName?.split(" ")[0] ?? "" })}
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {formattedDate}
              </p>
            </div>
            {/* Level badge */}
            <div className="flex items-center gap-3 rounded-xl border border-brand-terra-500/20 bg-brand-terra-500/5 px-4 py-2.5">
              <div className="text-right">
                <p className="text-xs text-[var(--color-text-muted)]">
                  {lng === "es" ? "Nivel" : "Level"} {levelInfo.level}
                </p>
                <p className="text-sm font-semibold text-brand-terra-400">
                  {levelTitle}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-terra-400 to-brand-terra-600 text-lg font-bold text-white shadow-lg shadow-brand-terra-500/30">
                {levelInfo.level}
              </div>
            </div>
          </div>
          {/* Level progress mini bar */}
          <div className="mt-3 max-w-xs">
            <ProgressBar value={levelPct} size="sm" barColor="bg-gradient-to-r from-brand-terra-400 to-brand-terra-600" />
          </div>
        </div>

        {/* ── Resume learning CTA ────────────────────────────── */}
        {resumeModule && (
          <div
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" as const }}
          >
            <div className="rounded-xl border border-brand-forest-500/20 bg-brand-forest-500/5 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-forest-400 to-brand-forest-600 text-white shadow-lg shadow-brand-forest-500/30">
                    <PlayIcon />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-forest-500/10 px-3 py-1 text-xs font-semibold text-brand-forest-400">
                      <PulsingDot />
                      {t("dashboard.resumeLearning")}
                    </span>
                    <p className="mt-1.5 text-sm font-semibold text-[var(--color-text-primary)]">
                      {resumeModule.module.title[lng as "es" | "en"] ??
                        resumeModule.module.title.en}
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="group !rounded-2xl !bg-gradient-to-br !from-brand-forest-500 !to-brand-forest-700 !shadow-lg !shadow-brand-forest-500/30 !transition-all hover:-translate-y-0.5 hover:!shadow-xl hover:shadow-brand-forest-500/40"
                  rightIcon={<ArrowIcon />}
                  onClick={() =>
                    router.push(`/${lng}/learn/${resumeModule.module.id}`)
                  }
                >
                  {t("dashboard.continue")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Stats row ─────────────────────────────────────── */}
        <div
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up"
          style={{ animationDelay: "150ms", animationFillMode: "backwards" as const }}
        >
          <StatCard
            icon={<PointsIcon />}
            label={t("dashboard.totalPoints")}
            value={gPoints}
            variant="highlight"
          />
          <StatCard
            icon={<LessonsIcon />}
            label={t("dashboard.lessonsCompleted")}
            value={completedLessons}
            suffix={` / ${TOTAL_LESSONS}`}
            trend={completedLessons > 0 ? Math.round((completedLessons / TOTAL_LESSONS) * 100) : undefined}
          />
          <StatCard
            icon={<StreakIcon />}
            label={t("dashboard.currentStreak")}
            value={gStreak}
            suffix={lng === "es" ? " días" : " days"}
            trend={gStreak >= 3 ? 100 : undefined}
          />
          <StatCard
            icon={<BadgeIcon />}
            label={t("dashboard.badgesEarned")}
            value={gBadgeCount}
          />
        </div>

        {/* ── Overall progress ───────────────────────────────── */}
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" as const }}
        >
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {t("dashboard.overallProgress")}
              </h2>
              <span className="text-sm font-bold tabular-nums text-brand-forest-400">
                {overallPercent}%
              </span>
            </div>
            <ProgressBar
              value={overallPercent}
              size="lg"
              barColor="bg-gradient-to-r from-brand-forest-500 to-brand-gold-400"
            />
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              {completedLessons} / {TOTAL_LESSONS} {t("dashboard.lessons")} {t("dashboard.completed").toLowerCase()}
            </p>
          </div>
        </div>

        {/* ── Campus selector ────────────────────────────────── */}
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "250ms", animationFillMode: "backwards" as const }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
              {t("campus.title")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUSES.map((campus, idx) => {
              const campusTitle = campus.title[lng as "es" | "en"] ?? campus.title.en;
              const campusDesc = campus.description[lng as "es" | "en"] ?? campus.description.en;

              // Calculate campus progress
              const campusModuleIds = campus.moduleIds;
              const campusModules = CURRICULUM.filter((m) => campusModuleIds.includes(m.id));
              const campusTotalLessons = campusModules.reduce((sum, m) => sum + m.lessons.length, 0);
              const campusCompletedLessons = (progressData?.modules ?? [])
                .filter((info) => campusModuleIds.includes(info.module.id))
                .reduce((sum, info) => sum + info.completedLessonCount, 0);
              const campusPercent = campusTotalLessons > 0
                ? Math.round((campusCompletedLessons / campusTotalLessons) * 100)
                : 0;
              const tile = CAMPUS_TILES[campus.id] ?? DEFAULT_TILE;

              return (
                <div
                  key={campus.id}
                  className={[
                    "group relative overflow-hidden rounded-xl border transition-all duration-300",
                    "animate-fade-in-up opacity-0 cursor-pointer",
                    campus.status === "active"
                      ? "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-brand-forest-500/30 hover:shadow-lg hover:shadow-brand-forest-500/5"
                      : "cursor-not-allowed border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50",
                  ].join(" ")}
                  style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "forwards" }}
                  onClick={() => {
                    if (campus.status === "active") {
                      router.push(`/${lng}/campus/${campus.id}`);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (campus.status === "active") {
                        router.push(`/${lng}/campus/${campus.id}`);
                      }
                    }
                  }}
                  role={campus.status === "active" ? "button" : "presentation"}
                  tabIndex={campus.status === "active" ? 0 : -1}
                >
                  {/* Coming soon overlay */}
                  {campus.status !== "active" && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--color-bg-secondary)]/70 backdrop-blur-[1px]">
                      <span className="rounded-full bg-brand-terra-500/20 px-3 py-1 text-xs font-medium text-brand-terra-400">
                        {t("campus.comingSoon")}
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    {/* Header */}
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                          tile.gradient,
                          tile.shadow,
                        ].join(" ")}
                      >
                        {tile.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                          {campusTitle}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                          {campusDesc}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-3 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                      <span>{campusModules.length} {t("dashboard.yourModules").toLowerCase()}</span>
                      <span>{campusTotalLessons} {t("dashboard.lessons").toLowerCase()}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-[var(--color-text-muted)]">{t("dashboard.overallProgress")}</span>
                        <span className="font-bold tabular-nums text-brand-forest-400">{campusPercent}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
                        <div
                          className={["h-full rounded-full bg-gradient-to-r transition-all duration-500", tile.gradient].join(" ")}
                          style={{ width: `${campusPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    {campus.status === "active" && (
                      <Button
                        variant="primary"
                        size="sm"
                        className={["group w-full justify-center !bg-gradient-to-br !shadow-md", tile.gradient, tile.shadow].join(" ")}
                        rightIcon={<ArrowIcon />}
                      >
                        {campusPercent > 0 ? t("dashboard.continueModule") : t("dashboard.startModule")}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recent achievements ────────────────────────────── */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" as const }}
        >
          <div className="mb-4 flex items-center gap-2">
            <SparkleIcon />
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
              {t("dashboard.recentAchievements")}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {earnedAchievements.length > 0 ? (
              earnedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  lng={lng}
                />
              ))
            ) : (
              <p className="col-span-full py-4 text-center text-sm text-[var(--color-text-muted)]">
                {lng === "es" ? "Completa lecciones para ganar insignias" : "Complete lessons to earn badges"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
