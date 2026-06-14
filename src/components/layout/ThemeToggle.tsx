"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useTranslation } from "@/lib/i18n/client";

function SunIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MoonIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

/**
 * Light/dark theme toggle. The app defaults to light mode (see the inline
 * no-flash script in src/app/layout.tsx); this button flips the `.light`
 * class on <html> and persists the choice in localStorage["theme"].
 */
export default function ThemeToggle(): ReactNode {
  const { t } = useTranslation("common");
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = useCallback(() => {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
    setIsLight(next);
  }, [isLight]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
      aria-label={isLight ? t("nav.themeToDark") : t("nav.themeToLight")}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
