"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import type { CurriculumModule } from "@/lib/constants/curriculum";
import type { ModuleProgressInfo } from "@/lib/hooks/useProgress";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ModuleCardProps {
  info: ModuleProgressInfo;
  lng: string;
  index: number; // for staggered animation delay
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function LockIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty: CurriculumModule["difficulty"];
}) {
  const variantMap: Record<CurriculumModule["difficulty"], "success" | "warning" | "error"> = {
    beginner: "success",
    intermediate: "warning",
    advanced: "error",
  };

  return <Badge variant={variantMap[difficulty]} size="sm">{difficulty}</Badge>;
}

function getModuleIcon(order: number): string {
  const icons = ["📘", "🎭", "🔍", "⚡", "📦", "⚙️", "🌐", "🚀"];
  return icons[(order - 1) % icons.length] ?? "📘";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ModuleCard({ info, lng, index }: ModuleCardProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { module, status, percentComplete, completedLessonCount, totalLessonCount } = info;
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const title = module.title[lng as "es" | "en"] ?? module.title.en;
  const description = module.description[lng as "es" | "en"] ?? module.description.en;

  function handleClick() {
    if (!isLocked) {
      router.push(`/${lng}/learn/${module.id}`);
    }
  }

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border transition-all duration-300",
        "animate-fade-in-up opacity-0",
        isLocked
          ? "cursor-not-allowed border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50"
          : "cursor-pointer border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-brand-forest-500/30 hover:shadow-lg hover:shadow-brand-forest-500/5",
      ].join(" ")}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      role={isLocked ? "presentation" : "button"}
      tabIndex={isLocked ? -1 : 0}
    >
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--color-bg-secondary)]/70 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
            <LockIcon />
            <span className="text-sm font-medium">{t("dashboard.locked")}</span>
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Header row */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              {getModuleIcon(module.order)}
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                {description}
              </p>
            </div>
          </div>
          <DifficultyBadge difficulty={module.difficulty} />
        </div>

        {/* Stats row */}
        <div className="mb-3 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span>
            {totalLessonCount} {t("dashboard.lessons")}
          </span>
          <span>
            ~{module.estimatedMinutes} min
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <ProgressBar
            value={percentComplete}
            size="sm"
            showLabel
            barColor={isCompleted ? "bg-brand-gold-500" : "bg-brand-forest-500"}
          />
        </div>

        {/* CTA button */}
        {!isLocked && (
          <Button
            variant={isCompleted ? "secondary" : "primary"}
            size="sm"
            className={[
              "w-full justify-center",
              !isCompleted ? "!bg-brand-terra-500 hover:!bg-brand-terra-400" : "",
            ].join(" ")}
          >
            {isCompleted
              ? t("dashboard.reviewModule")
              : completedLessonCount > 0
                ? t("dashboard.continueModule")
                : t("dashboard.startModule")}
          </Button>
        )}
      </div>
    </div>
  );
}
