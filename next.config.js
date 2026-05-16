/**
 * Next.js configuration.
 *
 * i18n is handled natively by the App Router via the [lng] dynamic segment
 * and src/middleware.ts (locale detection + cookie). The Pages Router i18n
 * config block has been removed — it is incompatible with App Router.
 *
 * @see src/lib/i18n/settings.ts
 * @see src/middleware.ts
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
