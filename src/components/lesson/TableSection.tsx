"use client";

import type { Bilingual, TableSection } from "@/types/lesson";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface TableSectionProps {
  headers: Bilingual[];
  rows: TableSection["rows"];
  caption?: Bilingual;
  lng: string;
}

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function tText(bi: Bilingual, lng: string): string {
  return (bi as unknown as Record<string, string>)[lng] ?? bi.en;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TableSection({
  headers,
  rows,
  caption,
  lng,
}: TableSectionProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full border-collapse text-sm">
        {caption && (
          <caption className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-left font-medium text-[var(--color-text-primary)]">
            {tText(caption, lng)}
          </caption>
        )}
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-[var(--color-text-primary)]"
              >
                {tText(header, lng)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={[
                "border-b border-[var(--color-border)] transition-colors",
                rowIdx % 2 === 1 ? "bg-[var(--color-bg-elevated)]/30" : "",
                "hover:bg-[var(--color-bg-elevated)]/50",
              ].join(" ")}
            >
              {row.cells.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-4 py-3 text-[var(--color-text-secondary)]"
                >
                  {tText(cell, lng)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
