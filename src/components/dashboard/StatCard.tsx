"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type StatVariant = "default" | "highlight";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  /** Optional trend: positive = up arrow, negative = down arrow */
  trend?: number;
  variant?: StatVariant;
  /** Duration of the count-up animation in ms (default 1000) */
  animationDuration?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                               */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration: number, enabled: boolean): number {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number>(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setCurrent(0);
      return;
    }

    // If target is 0, set immediately
    if (target === 0) {
      setCurrent(0);
      return;
    }

    startTime.current = 0;

    function step(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      }
    }

    raf.current = requestAnimationFrame(step);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, enabled]);

  return current;
}

/* ------------------------------------------------------------------ */
/*  Trend indicator                                                    */
/* ------------------------------------------------------------------ */

function TrendArrow({ trend }: { trend: number }) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  if (!isPositive && !isNegative) return null;

  return (
    <span
      className={[
        "ml-1.5 inline-flex items-center gap-0.5 text-xs font-medium",
        isPositive ? "text-brand-green-400" : "text-red-400",
      ].join(" ")}
    >
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isPositive ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        )}
      </svg>
      {Math.abs(trend)}%
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StatCard({
  icon,
  label,
  value,
  suffix = "",
  trend,
  variant = "default",
  animationDuration = 1000,
  className = "",
}: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const counted = useCountUp(value, animationDuration, visible);

  // Trigger animation on mount via IntersectionObserver
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHighlight = variant === "highlight";

  return (
    <div
      ref={ref}
      className={[
        "rounded-xl border p-5 transition-shadow",
        isHighlight
          ? "border-brand-blue-500/30 bg-brand-blue-500/5 shadow-lg shadow-brand-blue-500/5"
          : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]",
        className,
      ].join(" ")}
    >
      {/* Icon */}
      <div
        className={[
          "mb-3 inline-flex rounded-lg p-2",
          isHighlight ? "bg-brand-blue-500/20 text-brand-blue-400" : "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]",
        ].join(" ")}
      >
        {icon}
      </div>

      {/* Label */}
      <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </p>

      {/* Value + trend */}
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums text-[var(--color-text-primary)]">
          {counted}
          {suffix}
        </span>
        {trend !== undefined && <TrendArrow trend={trend} />}
      </div>
    </div>
  );
}
