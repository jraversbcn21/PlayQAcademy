
/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BadgeRarity = "common" | "rare" | "epic";

export interface Achievement {
  id: string;
  icon: string; // emoji
  name: string;
  description: string;
  earnedAt: string; // ISO-8601
  rarity: BadgeRarity;
}

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Rarity styling                                                     */
/* ------------------------------------------------------------------ */

const rarityGlow: Record<BadgeRarity, string> = {
  common: "border-slate-500/20 bg-slate-500/5 text-slate-400",
  rare: "border-brand-forest-500/30 bg-brand-forest-500/5 text-brand-forest-400",
  epic: "border-purple-500/30 bg-purple-500/5 text-purple-400",
};

const rarityLabel: Record<BadgeRarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
};

const rarityDot: Record<BadgeRarity, string> = {
  common: "bg-slate-400",
  rare: "bg-brand-forest-400",
  epic: "bg-purple-400",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AchievementCard({
  achievement,
  className = "",
}: AchievementCardProps) {
  const { icon, name, description, earnedAt, rarity } = achievement;

  const formattedDate = new Date(earnedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={[
        "rounded-xl border p-4 transition-shadow hover:shadow-md",
        rarityGlow[rarity],
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {/* Badge icon */}
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-elevated)] text-2xl"
          aria-hidden="true"
        >
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          {/* Name + rarity dot */}
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
              {name}
            </h4>
            <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className={["h-1.5 w-1.5 rounded-full", rarityDot[rarity]].join(" ")} />
              {rarityLabel[rarity]}
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
            {description}
          </p>

          {/* Date */}
          <p className="mt-2 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}
