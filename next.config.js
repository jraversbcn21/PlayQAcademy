/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    // Allow placeholder remote patterns — extend when assets are added
    remotePatterns: [],
  },
};

module.exports = nextConfig;
