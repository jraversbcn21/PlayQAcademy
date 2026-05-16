"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/lib/hooks/useGamification";
import StreakIndicator from "@/components/gamification/StreakIndicator";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  href: string;
  translationKey: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS: NavLink[] = [
  { href: "/", translationKey: "nav.home" },
  { href: "/curriculum", translationKey: "nav.curriculum" },
  { href: "/playground", translationKey: "nav.playground" },
  { href: "/leaderboard", translationKey: "nav.leaderboard" },
  { href: "/about", translationKey: "nav.about" },
];

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

function Logo(): ReactNode {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold text-[var(--color-text-primary)] transition-opacity hover:opacity-80"
    >
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7"
        fill="none"
        aria-hidden="true"
      >
        <path d="M14 2L26 24H2L14 2Z" fill="currentColor" className="text-brand-blue-500" />
      </svg>
      <span>PlayQ</span>
      <span className="text-brand-green-400" aria-hidden="true">
        &#9679;
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Hamburger icon                                                     */
/* ------------------------------------------------------------------ */

function HamburgerIcon({ open }: { open: boolean }): ReactNode {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
      ) : (
        <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Chevron icon (for dropdowns)                                       */
/* ------------------------------------------------------------------ */

function ChevronDown({ open }: { open: boolean }): ReactNode {
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

/* ------------------------------------------------------------------ */
/*  Language switcher                                                  */
/* ------------------------------------------------------------------ */

function LanguageSwitcher({ currentLng }: { currentLng: string }): ReactNode {
  const router = useRouter();

  const switchTo = useCallback(
    (target: string) => {
      const path = window.location.pathname.replace(
        new RegExp(`^/${currentLng}`),
        `/${target}`
      );
      router.push(path);
    },
    [currentLng, router]
  );

  return (
    <div
      className="flex items-center rounded-lg border border-[var(--color-border)] p-0.5 text-xs font-medium"
      role="radiogroup"
      aria-label="Switch language"
    >
      {LOCALES.map(({ code, label }) => {
        const active = code === currentLng;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => !active && switchTo(code)}
            className={[
              "rounded-md px-2.5 py-1 transition-colors",
              active
                ? "bg-brand-blue-600 text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  User avatar (photo or initials fallback)                           */
/* ------------------------------------------------------------------ */

function UserAvatar({
  photoURL,
  displayName,
  size = "sm",
}: {
  photoURL: string | null;
  displayName: string | null;
  size?: "sm" | "md";
}): ReactNode {
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={displayName ?? ""}
        referrerPolicy="no-referrer"
        className={[dimension, "rounded-full object-cover ring-2 ring-brand-blue-500/30"].join(" ")}
      />
    );
  }

  const initials = (displayName ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <span
      className={[
        dimension,
        textSize,
        "flex items-center justify-center rounded-full font-semibold",
        "bg-brand-blue-500/20 text-brand-blue-400 ring-2 ring-brand-blue-500/30",
      ].join(" ")}
    >
      {initials || "?"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

interface NavbarProps {
  currentLng: string;
}

export default function Navbar({ currentLng }: NavbarProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position for backdrop blur activation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* ---------- Auth actions ---------- */

  const handleSignOut = useCallback(async () => {
    await signOut();
    setDropdownOpen(false);
    router.push(`/${currentLng}`);
  }, [signOut, router, currentLng]);

  const navigateTo = useCallback(
    (path: string) => router.push(`/${currentLng}${path}`),
    [router, currentLng]
  );

  /* ---------- Render helpers ---------- */

  const renderAuthArea = () => {
    if (user) {
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-[var(--color-bg-elevated)]"
          >
            <UserAvatar photoURL={user.photoURL} displayName={user.displayName} />
            <span className="hidden max-w-[100px] truncate text-sm font-medium text-[var(--color-text-primary)] sm:inline">
              {user.displayName ?? user.email}
            </span>
            <ChevronDown open={dropdownOpen} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-1.5 shadow-xl">
              <div className="border-b border-[var(--color-border)] px-4 py-2.5">
                <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {user.displayName}
                </p>
                <p className="truncate text-xs text-[var(--color-text-muted)]">
                  {user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigateTo("/dashboard");
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                {t("auth.profile.dashboard")}
              </button>

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigateTo("/settings");
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t("auth.profile.settings")}
              </button>

              <hr className="my-1 border-[var(--color-border)]" />

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                {t("auth.profile.signOut")}
              </button>
            </div>
          )}
        </div>
      );
    }

    // Unauthenticated: Sign In + Start Free buttons
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateTo("/auth/sign-in")}
        >
          {t("nav.signIn")}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="!bg-brand-orange-500 hover:!bg-brand-orange-400"
          onClick={() => navigateTo("/auth/sign-up")}
        >
          {t("nav.startFree")}
        </Button>
      </div>
    );
  };

  const renderMobileAuth = () => {
    if (user) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-[var(--color-bg-elevated)] p-3">
            <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {user.displayName}
              </p>
              <p className="truncate text-xs text-[var(--color-text-muted)]">
                {user.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              closeMobile();
              navigateTo("/dashboard");
            }}
            className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
          >
            {t("auth.profile.dashboard")}
          </button>
          <button
            type="button"
            onClick={() => {
              closeMobile();
              navigateTo("/settings");
            }}
            className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
          >
            {t("auth.profile.settings")}
          </button>
          <button
            type="button"
            onClick={() => {
              closeMobile();
              handleSignOut();
            }}
            className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            {t("auth.profile.signOut")}
          </button>
        </div>
      );
    }

    // Mobile unauthenticated
    return (
      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          size="md"
          className="w-full justify-center"
          onClick={() => {
            closeMobile();
            navigateTo("/auth/sign-in");
          }}
        >
          {t("nav.signIn")}
        </Button>
        <Button
          variant="primary"
          size="md"
          className="w-full justify-center !bg-brand-orange-500 hover:!bg-brand-orange-400"
          onClick={() => {
            closeMobile();
            navigateTo("/auth/sign-up");
          }}
        >
          {t("nav.startFree")}
        </Button>
      </div>
    );
  };

  /* ---------- Main render ---------- */

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-lg"
          : "border-transparent bg-[var(--color-bg-primary)]",
      ].join(" ")}
    >
      <nav className="container-app flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop links (hidden on mobile) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ href, translationKey }) => {
            const isActive = false;
            return (
              <li key={translationKey}>
                <Link
                  href={`/${currentLng}${href}`}
                  className={[
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-brand-green-400"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]",
                  ].join(" ")}
                >
                  {t(translationKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {renderAuthArea()}
          {user && <StreakIndicator uid={user.uid} />}
          <LanguageSwitcher currentLng={currentLng} />

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-1 rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] lg:hidden"
            aria-label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobile}
          />

          <div className="relative ms-auto flex h-full w-full max-w-sm flex-col border-l border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6 overflow-y-auto animate-slide-in-right">
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, translationKey }) => (
                <li key={translationKey}>
                  <Link
                    href={`/${currentLng}${href}`}
                    onClick={closeMobile}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
                  >
                    {t(translationKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-6 border-[var(--color-border)]" />

            {renderMobileAuth()}
          </div>
        </div>
      )}
    </header>
  );
}
