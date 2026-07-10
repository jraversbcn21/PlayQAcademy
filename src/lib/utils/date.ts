/**
 * Date helpers — all day-boundary logic uses the user's LOCAL date, not
 * UTC. `toISOString().slice(0, 10)` flips to "tomorrow" at 00:00 UTC,
 * i.e. mid-evening for Spanish-timezone users, which broke streak logic.
 */

/** Format a Date as "YYYY-MM-DD" in the user's local timezone. */
export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Local "YYYY-MM-DD" for yesterday. */
export function localYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDateStr(d);
}
