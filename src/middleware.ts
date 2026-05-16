/**
 * Locale + auth middleware.
 *
 * 1. Redirects requests without a locale prefix to {defaultLocale}/path
 * 2. Protects routes that require authentication (dashboard, learn/*,
 *    leaderboard) by checking for the "auth_token" cookie set by
 *    the AuthProvider on successful sign-in.
 */

import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["es", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: SupportedLocale = "es";

/** Routes that require an authenticated session. */
const PROTECTED_PATTERNS = [
  /^\/[a-z]{2}\/dashboard/,
  /^\/[a-z]{2}\/learn\//,
  /^\/[a-z]{2}\/leaderboard/,
];

function getLocaleFromPath(pathname: string): SupportedLocale | null {
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  if (
    firstSegment &&
    (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment)
  ) {
    return firstSegment as SupportedLocale;
  }
  return null;
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(svg|png|jpe?g|gif|ico|woff2?|ttf|eot|css|js|map)$/.test(pathname)
  );
}

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname, search } = request.nextUrl;

  // Skip static assets and Next.js internals
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // 1. No locale prefix → redirect to default locale
  const locale = getLocaleFromPath(pathname);
  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}${search}`;
    return NextResponse.redirect(url);
  }

  // 2. Protected route check
  const isProtected = PROTECTED_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );

  if (isProtected) {
    const authCookie = request.cookies.get("auth_token");

    if (!authCookie?.value) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth/sign-in`;
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
