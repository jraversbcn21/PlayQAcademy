"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useTranslation } from "@/lib/i18n/client";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Lesson {
  translationKey: string;
  locked: boolean;
  completed: boolean;
}

interface Module {
  translationKey: string;
  progress: number; // 0-100
  lessons: Lesson[];
}

interface SidebarProps {
  currentLng: string;
  /** Callback when a lesson is selected */
  onLessonSelect?: (moduleIndex: number, lessonIndex: number) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data — 4 modules × 3 lessons each                             */
/* ------------------------------------------------------------------ */

const MOCK_MODULES: Module[] = [
  {
    translationKey: "sidebar.modules.1",
    progress: 100,
    lessons: [
      { translationKey: "sidebar.lessons.1_1", locked: false, completed: true },
      { translationKey: "sidebar.lessons.1_2", locked: false, completed: true },
      { translationKey: "sidebar.lessons.1_3", locked: false, completed: true },
    ],
  },
  {
    translationKey: "sidebar.modules.2",
    progress: 33,
    lessons: [
      { translationKey: "sidebar.lessons.2_1", locked: false, completed: true },
      { translationKey: "sidebar.lessons.2_2", locked: false, completed: false },
      { translationKey: "sidebar.lessons.2_3", locked: true, completed: false },
    ],
  },
  {
    translationKey: "sidebar.modules.3",
    progress: 0,
    lessons: [
      { translationKey: "sidebar.lessons.3_1", locked: true, completed: false },
      { translationKey: "sidebar.lessons.3_2", locked: true, completed: false },
      { translationKey: "sidebar.lessons.3_3", locked: true, completed: false },
    ],
  },
  {
    translationKey: "sidebar.modules.4",
    progress: 0,
    lessons: [
      { translationKey: "sidebar.lessons.4_1", locked: true, completed: false },
      { translationKey: "sidebar.lessons.4_2", locked: true, completed: false },
      { translationKey: "sidebar.lessons.4_3", locked: true, completed: false },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Icons (inline SVGs)                                                */
/* ------------------------------------------------------------------ */

function LockIcon(): ReactNode {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function CheckIcon(): ReactNode {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }): ReactNode {
  return (
    <svg
      className={["h-4 w-4 transition-transform", open ? "rotate-180" : ""].join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ModuleIcon(): ReactNode {
  return (
    <svg className="h-5 w-5 text-brand-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function PlayIcon(): ReactNode {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

export default function Sidebar({ currentLng: _currentLng, onLessonSelect, className = "" }: SidebarProps) {
  const { t } = useTranslation("common");
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const [expandedAll, setExpandedAll] = useState(false);

  const toggleModule = useCallback((index: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (expandedAll) {
      setExpandedModules(new Set());
    } else {
      setExpandedModules(new Set(MOCK_MODULES.map((_, i) => i)));
    }
    setExpandedAll((prev) => !prev);
  }, [expandedAll]);

  return (
    <aside
      className={[
        "flex h-full w-72 flex-col overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)]",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3.5">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {t("sidebar.title")}
        </h2>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-brand-blue-400"
        >
          {expandedAll ? t("sidebar.collapseAll") : t("sidebar.expandAll")}
        </button>
      </div>

      {/* Module list */}
      <ul className="flex-1 space-y-0.5 px-2 py-2">
        {MOCK_MODULES.map((mod, modIdx) => {
          const isExpanded = expandedModules.has(modIdx);
          const completedLessons = mod.lessons.filter((l) => l.completed).length;
          const totalLessons = mod.lessons.length;

          return (
            <li key={mod.translationKey}>
              {/* Module header */}
              <button
                type="button"
                onClick={() => toggleModule(modIdx)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-bg-elevated)]"
              >
                <ModuleIcon />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                      {t(mod.translationKey)}
                    </span>
                    <ChevronIcon open={isExpanded} />
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar
                      value={mod.progress}
                      size="sm"
                      showLabel
                    />
                  </div>
                </div>
              </button>

              {/* Lesson list (expandable) */}
              {isExpanded && (
                <ul className="ml-9 mt-0.5 space-y-0.5 border-l border-[var(--color-border)] pl-3">
                  {mod.lessons.map((lesson, lesIdx) => (
                    <li key={lesson.translationKey}>
                      <button
                        type="button"
                        disabled={lesson.locked}
                        onClick={() => onLessonSelect?.(modIdx, lesIdx)}
                        className={[
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                          lesson.locked
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-[var(--color-bg-elevated)]",
                          lesson.completed
                            ? "text-brand-green-400"
                            : "text-[var(--color-text-secondary)]",
                        ].join(" ")}
                      >
                        {lesson.completed ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-500/20 text-brand-green-400">
                            <CheckIcon />
                          </span>
                        ) : lesson.locked ? (
                          <LockIcon />
                        ) : (
                          <PlayIcon />
                        )}
                        <span className="truncate">{t(lesson.translationKey)}</span>

                        {lesson.locked && (
                          <Badge variant="locked" size="sm">
                            {t("sidebar.locked")}
                          </Badge>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Footer stats */}
      <div className="border-t border-[var(--color-border)] px-4 py-3">
        <p className="text-xs text-[var(--color-text-muted)]">
          {completedLessonsTotal()}/{totalLessonsTotal()} {t("sidebar.lessonsCompleted")}
        </p>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers for summary stats                                          */
/* ------------------------------------------------------------------ */

function completedLessonsTotal(): number {
  return MOCK_MODULES.reduce(
    (sum, mod) => sum + mod.lessons.filter((l) => l.completed).length,
    0
  );
}

function totalLessonsTotal(): number {
  return MOCK_MODULES.reduce((sum, mod) => sum + mod.lessons.length, 0);
}
