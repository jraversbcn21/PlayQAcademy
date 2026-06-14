"use client";

interface ProgressBarProps {
  /** Value between 0 and 100 */
  value: number;
  /** Show a percentage label to the right of the bar */
  showLabel?: boolean;
  /** Bar thickness */
  size?: "sm" | "md" | "lg";
  /** Animate width changes */
  animated?: boolean;
  /** Custom colour override (Tailwind class, defaults to brand green) */
  barColor?: string;
  className?: string;
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const labelSizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

export default function ProgressBar({
  value,
  showLabel = false,
  size = "md",
  animated = true,
  barColor = "bg-brand-gold-500",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={["flex items-center gap-3", className].join(" ")}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={[
          "w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]",
          sizeClasses[size],
        ].join(" ")}
      >
        <div
          className={[
            "h-full rounded-full",
            barColor,
            animated ? "transition-[width] duration-500 ease-out" : "",
          ].join(" ")}
          style={{ width: `${clamped}%` }}
        />
      </div>

      {showLabel && (
        <span
          className={[
            "min-w-[3ch] text-right tabular-nums text-[var(--color-text-secondary)]",
            labelSizeClasses[size],
          ].join(" ")}
        >
          {clamped}%
        </span>
      )}
    </div>
  );
}
