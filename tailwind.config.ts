import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: "class" lets us toggle themes manually; dark is the default
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PlayQ Academy custom palette
        brand: {
          forest: {
            50:  "#F0F9F6",
            100: "#DDF4EA",
            200: "#B1E6D0",
            300: "var(--brand-forest-300)",
            400: "var(--brand-forest-400)",
            500: "#1C7A52", // primary — forest green
            600: "#156544",
            700: "#0F5236",
            800: "#0B3D28",
            900: "#072C1D",
          },
          terra: {
            50:  "#F9F2F0",
            100: "#F2DED9",
            200: "#E5B9AE",
            300: "var(--brand-terra-300)",
            400: "var(--brand-terra-400)",
            500: "#BF472D", // accent — terracotta
            600: "#93351D",
            700: "#752815",
            800: "#581D0E",
            900: "#3E1409",
          },
          gold: {
            50:  "#F9F6F0",
            100: "#F2EAD9",
            200: "#E5D3AE",
            300: "var(--brand-gold-300)",
            400: "var(--brand-gold-400)",
            500: "#B6862F", // tertiary — gold (achievements / ISTQB)
            600: "#997224",
            700: "#7A5A1A",
            800: "#5A4211",
            900: "#412F0B",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-chakra-petch)", "var(--font-space-grotesk)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "gradient": "gradient-shift 4s ease infinite",
        "slide-in-right": "slide-in-right 0.25s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        "confetti-fall": "confetti-fall linear forwards",
      },
    },
  },
  plugins: [],
};

export default config;
