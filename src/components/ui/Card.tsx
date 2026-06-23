import type { ReactNode } from "react";

type CardVariant = "default" | "highlight" | "lesson" | "achievement";

interface CardProps {
  variant?: CardVariant;
  /** Lesson number (only relevant for "lesson" variant) */
  number?: number;
  /** Icon rendered inside the card header (achievement / lesson variants) */
  icon?: ReactNode;
  /** Card heading */
  title?: string;
  children: ReactNode;
  className?: string;
  /** Extra classes for the body wrapper (e.g. to make it a flex column so children can pin to the bottom) */
  bodyClassName?: string;
}

const variantWrapperClasses: Record<CardVariant, string> = {
  default:
    "rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6",
  highlight:
    "rounded-xl border border-brand-forest-500/30 bg-brand-forest-500/5 p-6 shadow-lg shadow-brand-forest-500/5",
  lesson:
    "rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-brand-forest-500/30",
  achievement:
    "rounded-xl border border-brand-gold-500/20 bg-brand-gold-500/5 p-6",
};

export default function Card({
  variant = "default",
  number,
  icon,
  title,
  children,
  className = "",
  bodyClassName = "",
}: CardProps) {
  return (
    <div className={[variantWrapperClasses[variant], className].join(" ")}>
      {/* Lesson number badge */}
      {number !== undefined && (
        <span className="mb-3 inline-block rounded-md bg-brand-forest-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-brand-forest-400">
          {String(number).padStart(2, "0")}
        </span>
      )}

      {/* Header row: icon + title */}
      {(icon !== undefined || title !== undefined) && (
        <div className="mb-3 flex items-center gap-2.5">
          {icon}
          {title !== undefined && (
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Body */}
      <div className={["text-[var(--color-text-secondary)]", bodyClassName].join(" ")}>{children}</div>
    </div>
  );
}
