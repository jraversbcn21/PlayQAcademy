import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";

/**
 * Mirrors middleware.ts's PROTECTED_PATTERNS: auth-gated routes carry no
 * SEO value (Google can't see past the sign-in redirect anyway) and are
 * excluded so crawl budget goes to public content instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/dashboard",
          "/*/learn/",
          "/*/leaderboard",
          "/*/badges",
          "/*/exams",
          "/*/settings",
          "/*/auth/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
