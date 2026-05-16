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
          blue: {
            50:  "#E8EEFB",
            100: "#C5D5F5",
            200: "#9DB9EF",
            300: "#759DE8",
            400: "#5888E3",
            500: "#3A73DD", // primary — professional technical blue
            600: "#3365C9",
            700: "#2954B0",
            800: "#214498",
            900: "#162C71",
          },
          green: {
            50:  "#ECFDF5",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#10B981", // secondary — "test passing green"
            600: "#059669",
            700: "#047857",
            800: "#065F46",
            900: "#064E3B",
          },
          orange: {
            50:  "#FFF7ED",
            100: "#FFEDD5",
            200: "#FED7AA",
            300: "#FDBA74",
            400: "#FB923C",
            500: "#F97316", // accent — energetic orange
            600: "#EA580C",
            700: "#C2410C",
            800: "#9A3412",
            900: "#7C2D12",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
