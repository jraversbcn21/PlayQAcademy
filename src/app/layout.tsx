import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/*
 * Inter is the recommended Google Font for a technical learning platform:
 * - Excellent legibility at both small UI sizes and large headings
 * - Clean, modern, neutral character — does not distract from content
 * - Broad language support & active maintenance by Rasmus Andersson
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* JetBrains Mono for code snippets / terminal-style content in lessons */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | PlayQAcademy",
    default: "PlayQAcademy — Domina el QA de software",
  },
  description:
    "Aprende QA desde cero hasta la automatización: Fundamentos de QA, certificación ISTQB CTFL y automatización con Playwright y TypeScript, todo en una sola plataforma.",
  keywords: [
    "QA",
    "testing de software",
    "ISTQB",
    "ISTQB CTFL",
    "Playwright",
    "TypeScript",
    "automatización de pruebas",
    "PlayQAcademy",
  ],
  openGraph: {
    title: "PlayQAcademy — Domina el QA de software",
    description:
      "Fundamentos de QA, certificación ISTQB CTFL y automatización con Playwright. Tu carrera en QA comienza aquí.",
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayQAcademy",
    description:
      "Master software QA: Fundamentals, ISTQB CTFL certification, and Playwright automation — all in one platform.",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
