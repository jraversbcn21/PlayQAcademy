"use client";

import Link from "next/link";
import type { ReactNode } from "react";
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

/* ------------------------------------------------------------------ */
/*  Campus icon tiles — colored gradient tile + line icon per campus  */
/* ------------------------------------------------------------------ */

function IconBook() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6.5A6 6 0 0 0 4 4v13a6 6 0 0 1 8 1.6A6 6 0 0 1 20 17V4a6 6 0 0 0-8 2.5z" />
      <path d="M12 6.5V19" />
    </svg>
  );
}

function IconCertificate() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5.2" />
      <path d="M8.5 13.2 7 21l5-2.4L17 21l-1.5-7.8" />
    </svg>
  );
}

function IconAutomation() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7.5 9.5 10 12l-2.5 2.5M13 14.5h4" />
    </svg>
  );
}

interface CampusTile {
  icon: ReactNode;
  gradient: string;
  shadow: string;
}

const DEFAULT_TILE: CampusTile = {
  icon: <IconBook />,
  gradient: "from-brand-blue-400 to-brand-blue-600",
  shadow: "shadow-brand-blue-500/30",
};

const CAMPUS_TILES: Record<string, CampusTile> = {
  qaFundamentals: DEFAULT_TILE,
  istqb: {
    icon: <IconCertificate />,
    gradient: "from-brand-green-400 to-brand-green-600",
    shadow: "shadow-brand-green-500/30",
  },
  automation: {
    icon: <IconAutomation />,
    gradient: "from-brand-orange-400 to-brand-orange-600",
    shadow: "shadow-brand-orange-500/30",
  },
};

export default function CampusCard({ campus, lng, t, animationDelay = 0 }: CampusCardProps) {
  const lang = lng === "es" ? "es" : "en";
  const moduleIds = getModulesForCampus(campus.id);
  const modules = moduleIds
    .map((id) => CURRICULUM.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const totalMinutes = modules.reduce((sum, mod) => sum + mod.estimatedMinutes, 0);
  const tile = CAMPUS_TILES[campus.id] ?? DEFAULT_TILE;

  return (
    <Link
      href={`/${lng}/campus/${campus.id}`}
      className="animate-fade-in-up block"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <Card variant="highlight" className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={[
              "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
              tile.gradient,
              tile.shadow,
            ].join(" ")}
          >
            {tile.icon}
          </div>
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
          <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1 font-mono font-semibold">
            {t("campus.card.modulesCount", { count: modules.length })}
          </span>
          <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1">
            {t("campus.card.lessonsCount", { count: totalLessons })}
          </span>
          <span className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1">
            {t("campus.card.minutesCount", { minutes: totalMinutes })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-brand-blue-400 transition-[gap] duration-200 group-hover:gap-3">
          {t("campus.card.explore")}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  );
}
