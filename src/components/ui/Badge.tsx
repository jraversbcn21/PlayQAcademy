import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "locked";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success:
    "bg-brand-gold-500/10 text-brand-gold-400 ring-brand-gold-500/20",
  warning:
    "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  error:
    "bg-red-500/10 text-red-400 ring-red-500/20",
  info:
    "bg-brand-forest-500/10 text-brand-forest-400 ring-brand-forest-500/20",
  locked:
    "bg-slate-500/10 text-[var(--color-text-muted)] ring-slate-500/20",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

const dotColors: Record<BadgeVariant, string> = {
  success: "bg-brand-gold-400",
  warning: "bg-amber-400",
  error: "bg-red-400",
  info: "bg-brand-forest-400",
  locked: "bg-[var(--color-text-muted)]",
};

export default function Badge({
  variant = "info",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", dotColors[variant]].join(" ")} />
      {children}
    </span>
  );
}
