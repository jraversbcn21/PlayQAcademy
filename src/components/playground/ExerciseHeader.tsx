"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ExerciseHeaderProps {
  title: string;
  description: string;
  linkedLessons: string[];
  locatorStrategies: string[];
  testTemplate: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ExerciseHeader({
  title,
  description,
  linkedLessons,
  locatorStrategies,
  testTemplate,
}: ExerciseHeaderProps) {
  const [showHints, setShowHints] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
        {title}
      </h1>
      <p className="leading-relaxed text-[var(--color-text-secondary)]">
        {description}
      </p>

      {/* Linked lessons */}
      <div className="flex flex-wrap gap-1.5">
        {linkedLessons.map((l) => (
          <Badge key={l} variant="info" size="sm">{l}</Badge>
        ))}
      </div>

      {/* Hints section */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors"
        >
          <span>💡 Hints for Testing</span>
          <span className="text-xs text-[var(--color-text-muted)]">{showHints ? "▲" : "▼"}</span>
        </button>
        {showHints && (
          <div className="border-t border-[var(--color-border)] p-4 space-y-2">
            <p className="text-xs font-medium text-[var(--color-text-muted)]">Locator strategies to practice:</p>
            <ul className="list-disc pl-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
              {locatorStrategies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Test template modal trigger */}
      <Button variant="secondary" size="sm" onClick={() => setShowTemplate(true)}>
        📋 View Suggested Test Skeleton
      </Button>

      {/* Template modal */}
      {showTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowTemplate(false)}>
          <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Suggested Test Skeleton</h3>
              <button onClick={() => setShowTemplate(false)} className="rounded p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)]">✕</button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-sm leading-relaxed text-[#c9d1d9]">
              <code>{testTemplate}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
