"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { GLOSSARY, CHAPTER_TITLES } from "@/lib/constants/glossary";
import type { GlossaryEntry } from "@/lib/constants/glossary";
import Card from "@/components/ui/Card";

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function tText(bi: { es: string; en: string }, lng: string): string {
  return (bi as unknown as Record<string, string>)[lng] ?? bi.en;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GlossaryPage() {
  const params = useParams();
  const lng = (params?.lng as string) ?? "es";
  const { t } = useTranslation("common");

  const [search, setSearch] = useState("");
  const [chapterFilter, setChapterFilter] = useState<string>("all");

  const chapters = useMemo(() => {
    const unique = [...new Set(GLOSSARY.map((e: GlossaryEntry) => e.chapter))].sort();
    return unique;
  }, []);

  const filteredEntries = useMemo(() => {
    return GLOSSARY.filter((entry: GlossaryEntry) => {
      const matchesChapter = chapterFilter === "all" || entry.chapter === chapterFilter;
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        entry.term.toLowerCase().includes(searchLower) ||
        entry.def.es.toLowerCase().includes(searchLower) ||
        entry.def.en.toLowerCase().includes(searchLower);
      return matchesChapter && matchesSearch;
    });
  }, [search, chapterFilter]);

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

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder={t("glossary.search")}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-brand-forest-500 focus:outline-none focus:ring-2 focus:ring-brand-forest-500/20"
          />
        </div>

        {/* Chapter filter */}
        <div className="sm:w-64">
          <select
            value={chapterFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChapterFilter(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-[var(--color-text-primary)] focus:border-brand-forest-500 focus:outline-none focus:ring-2 focus:ring-brand-forest-500/20"
          >
            <option value="all">{t("glossary.allChapters")}</option>
            {chapters.map((ch: string) => (
              <option key={ch} value={ch}>
                {t("glossary.chapter")} {ch}: {CHAPTER_TITLES[ch]?.[lng as "es" | "en"] ?? ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredEntries.length === 0 ? (
        <div className="py-12 text-center text-[var(--color-text-muted)]">
          {t("glossary.noResults")}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry: GlossaryEntry, idx: number) => (
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
                  {t("glossary.chapter")} {entry.chapter}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
