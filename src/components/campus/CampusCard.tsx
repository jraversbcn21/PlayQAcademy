"use client";

import Link from "next/link";
import type { Campus } from "@/types/campus";
import { getModulesForCampus } from "@/lib/constants/campuses";
import { CURRICULUM } from "@/lib/constants/curriculum";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface CampusCardProps {
  campus: Campus;
  lng: string;
  t: (key: string, opts?: Record<string, unknown>) => string;
  animationDelay?: number;
}

export default function CampusCard({ campus, lng, t, animationDelay = 0 }: CampusCardProps) {
  const lang = lng === "es" ? "es" : "en";
  const moduleIds = getModulesForCampus(campus.id);
  const modules = moduleIds
    .map((id) => CURRICULUM.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const totalMinutes = modules.reduce((sum, mod) => sum + mod.estimatedMinutes, 0);

  return (
    <Link
      href={`/${lng}/campus/${campus.id}`}
      className="animate-fade-in-up block"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <Card variant="highlight" className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <span className="rounded-md bg-brand-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-brand-blue-400">
            {t("campus.card.modulesCount", { count: modules.length })}
          </span>
          <Badge variant={campus.status === "active" ? "success" : "warning"} size="sm">
            {campus.status === "active" ? t("campus.card.active") : t("campus.card.comingSoon")}
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
            {t("campus.card.lessonsCount", { count: totalLessons })}
          </span>
          <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1">
            {t("campus.card.minutesCount", { minutes: totalMinutes })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-brand-blue-400">
          {t("campus.card.explore")}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  );
}
