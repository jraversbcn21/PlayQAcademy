"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";

/**
 * Routes where the floating button must NOT render, because the bottom-right
 * corner already has fixed/sticky UI there (lesson nav bar, the toast
 * exercise) or because it would distract during a timed exam. The 2-letter
 * locale segment is matched generically so this works for every language.
 */
const EXCLUDED_PATH_PATTERNS = [
  /^\/[a-z]{2}\/learn\/[^/]+\/[^/]+$/,
  /^\/[a-z]{2}\/playground\/dynamic$/,
  /^\/[a-z]{2}\/exams\/[^/]+\/take\/[^/]+$/,
];

export default function BuyMeCoffeeButton() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  if (EXCLUDED_PATH_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return null;
  }

  return (
    <a
      href="https://buymeacoffee.com/jorgeborn3m"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-terra-500 px-4 py-3 text-sm font-medium text-white shadow-xl transition-colors hover:bg-brand-terra-400"
    >
      <span aria-hidden="true">☕</span>
      {t("nav.buyMeCoffee")}
    </a>
  );
}
