"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import {
  GLOSSARY,
  CHAPTER_TITLES,
  GLOSSARY_CHAPTERS_BY_CAMPUS,
} from "@/lib/constants/glossary";
import type { GlossaryEntry } from "@/lib/constants/glossary";
import { getSubCampuses } from "@/lib/constants/campuses";
import Card from "@/components/ui/Card";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function tText(bi: { es: string; en: string }, lng: string): string {
  return (bi as unknown as Record<string, string>)[lng] ?? bi.en;
}

/** "qaf-3" -> "3", "auto-5" -> "5", "1" -> "1" */
function chapterNumber(chapter: string): string {
  return chapter.replace(/[^0-9]/g, "");
}

function buildChapterToCampus(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [campusId, chapters] of Object.entries(GLOSSARY_CHAPTERS_BY_CAMPUS)) {
    for (const chapter of chapters) {
      map[chapter] = campusId;
    }
  }
  return map;
}

const CHAPTER_TO_CAMPUS = buildChapterToCampus();

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GlossaryClient() {
  const params = useParams();
  const lng = (params?.lng as string) ?? "es";
  const { t } = useTranslation("common");

  const [search, setSearch] = useState("");
  const [openCampusId, setOpenCampusId] = useState<string | null>(null);

  const campuses = useMemo(
    () =>
      getSubCampuses()
        .map((campus) => ({
          campus,
          chapters: GLOSSARY_CHAPTERS_BY_CAMPUS[campus.id] ?? [],
        }))
        .filter(({ chapters }) => chapters.length > 0),
    []
  );

  const searchResults = useMemo(() => {
    if (!search) return [];
    const searchLower = search.toLowerCase();
    return GLOSSARY.filter(
      (entry: GlossaryEntry) =>
        entry.term.toLowerCase().includes(searchLower) ||
        entry.def.es.toLowerCase().includes(searchLower) ||
        entry.def.en.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const resultsByCampus = useMemo(() => {
    if (!search) return [];
    return campuses
      .map(({ campus }) => ({
        campus,
        entries: searchResults.filter(
          (entry) => CHAPTER_TO_CAMPUS[entry.chapter] === campus.id
        ),
      }))
      .filter(({ entries }) => entries.length > 0);
  }, [search, searchResults, campuses]);

  const openEntry = campuses.find(({ campus }) => campus.id === openCampusId);
  const isIstqbOpen = openEntry?.campus.id === "istqb";
  const moduleWord = lng === "es" ? "Módulo" : "Module";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {t("glossary.title")}
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t("glossary.subtitle")}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t("glossary.entryCount", { count: GLOSSARY.length })}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder={t("glossary.search")}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-brand-forest-500 focus:outline-none focus:ring-2 focus:ring-brand-forest-500/20"
        />
      </div>

      {search ? (
        /* ---------------- Search results, grouped by campus ---------------- */
        resultsByCampus.length === 0 ? (
          <div className="py-12 text-center text-[var(--color-text-muted)]">
            {t("glossary.noResults")}
          </div>
        ) : (
          <div className="space-y-8">
            {resultsByCampus.map(({ campus, entries }) => (
              <section key={campus.id}>
                <h2 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
                  {campus.title[lng as "es" | "en"] ?? campus.title.en}
                </h2>
                <div className="space-y-3">
                  {entries.map((entry, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-text-primary)]">
                            {entry.term}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {tText(entry.def, lng)}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
                          {t("glossary.chapter")} {chapterNumber(entry.chapter)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )
      ) : (
        /* ---------------- Browsing: campus accordion ---------------- */
        <>
          <div className="mb-6 flex flex-wrap gap-3">
            {campuses.map(({ campus, chapters }) => {
              const isOpen = openCampusId === campus.id;
              const count = GLOSSARY.filter((e) => chapters.includes(e.chapter)).length;
              return (
                <button
                  key={campus.id}
                  type="button"
                  onClick={() => setOpenCampusId(isOpen ? null : campus.id)}
                  aria-expanded={isOpen}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    isOpen
                      ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
                      : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {campus.title[lng as "es" | "en"] ?? campus.title.en}
                  <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                    {count}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {openEntry && (
            <div className="space-y-8">
              {openEntry.chapters.map((chapter) => {
                const entries = GLOSSARY.filter((e) => e.chapter === chapter);
                if (entries.length === 0) return null;
                const chapterTitle = CHAPTER_TITLES[chapter]?.[lng as "es" | "en"] ?? "";
                const label = isIstqbOpen ? t("glossary.chapter") : moduleWord;
                return (
                  <section key={chapter}>
                    <h2 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
                      {label} {chapterNumber(chapter)} · {chapterTitle}
                    </h2>
                    <div className="space-y-3">
                      {entries.map((entry, idx) => (
                        <Card key={idx} className="p-4">
                          <h3 className="font-semibold text-[var(--color-text-primary)]">
                            {entry.term}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {tText(entry.def, lng)}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
