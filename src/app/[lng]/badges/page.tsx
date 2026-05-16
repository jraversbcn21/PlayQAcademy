"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/lib/hooks/useGamification";
import { getLevelFromPoints } from "@/lib/gamification/levels";
import { BADGES_BY_ID, BADGES_SORTED_BY_RARITY } from "@/lib/constants/badges";
import type { Badge, EarnedBadge } from "@/types/gamification";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

/* ------------------------------------------------------------------ */
/*  Rarity filter tabs                                                 */
/* ------------------------------------------------------------------ */

type RarityFilter = "all" | "common" | "rare" | "epic" | "legendary";

const FILTERS: { value: RarityFilter; labelEs: string; labelEn: string }[] = [
  { value: "all", labelEs: "Todas", labelEn: "All" },
  { value: "common", labelEs: "Común", labelEn: "Common" },
  { value: "rare", labelEs: "Raro", labelEn: "Rare" },
  { value: "epic", labelEs: "Épico", labelEn: "Epic" },
  { value: "legendary", labelEs: "Legendario", labelEn: "Legendary" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface BadgesPageProps {
  params: { lng: string };
}

export default function BadgesPage({ params: { lng } }: BadgesPageProps) {
  const { t: _t } = useTranslation("common");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: gData, loading: gLoading } = useGamification(user?.uid);
  const [filter, setFilter] = useState<RarityFilter>("all");

  useEffect(() => {
    if (!authLoading && !user) router.push(`/${lng}/auth/sign-in`);
  }, [authLoading, user, lng, router]);

  if (authLoading || !user || gLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue-500 border-t-transparent" />
      </div>
    );
  }

  const earnedIds = new Set((gData?.earnedBadges ?? []).map((b: EarnedBadge) => b.badgeId));
  const earnedBadges = BADGES_SORTED_BY_RARITY.filter((b) => earnedIds.has(b.id));
  const unearnedBadges = BADGES_SORTED_BY_RARITY.filter((b) => !earnedIds.has(b.id));

  const totalLessons = gData?.earnedBadges ? 44 : 0; // Curriculum total
  const earnedBadgeCount = earnedBadges.length;
  const totalBadgeCount = BADGES_SORTED_BY_RARITY.length;

  const filteredBadges = (section: Badge[]) =>
    section.filter((b) => filter === "all" || b.rarity === filter);

  const rarityGlowClass = (badge: Badge) => {
    const map: Record<string, string> = {
      common: "border-slate-500/20",
      rare: "border-brand-blue-500/20",
      epic: "border-purple-500/20",
      legendary: "border-yellow-500/30",
    };
    return map[badge.rarity] ?? "";
  };

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-5xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {lng === "es" ? "Insignias" : "Badges"}
        </h1>
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          {earnedBadgeCount} / {totalBadgeCount} {lng === "es" ? "ganadas" : "earned"}
        </p>

        {/* Stats bar */}
        <div className="mb-6">
          <ProgressBar value={Math.round((earnedBadgeCount / totalBadgeCount) * 100)} size="md" showLabel barColor="bg-gradient-to-r from-brand-blue-500 to-purple-500" />
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-brand-blue-600 text-white"
                  : "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
              ].join(" ")}
            >
              {lng === "es" ? f.labelEs : f.labelEn}
            </button>
          ))}
        </div>

        {/* Earned badges */}
        {filteredBadges(earnedBadges).length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
              {lng === "es" ? "Ganadas" : "Earned"}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBadges(earnedBadges).map((badge) => {
                const earned = (gData?.earnedBadges ?? []).find(
                  (b: EarnedBadge) => b.badgeId === badge.id
                );
                return (
                  <div
                    key={badge.id}
                    className={[
                      "rounded-xl border bg-[var(--color-bg-secondary)] p-4 transition-shadow hover:shadow-md",
                      rarityGlowClass(badge),
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-elevated)] text-2xl">
                        {badge.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {badge.name[lng as "es" | "en"] ?? badge.name.en}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                          {badge.description[lng as "es" | "en"] ?? badge.description.en}
                        </p>
                        {earned && (
                          <p className="mt-1 text-[10px] text-[var(--color-text-muted)] uppercase">
                            {new Date(earned.earnedAt).toLocaleDateString(lng === "es" ? "es-ES" : "en-US")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Unearned badges */}
        {filteredBadges(unearnedBadges).length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
              {lng === "es" ? "Por Desbloquear" : "Locked"}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBadges(unearnedBadges).map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/60 p-4 opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-elevated)] text-2xl blur-[2px]">
                      {badge.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        ???
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {lng === "es" ? "Sigue aprendiendo para desbloquear esta insignia" : "Keep learning to unlock this badge"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
