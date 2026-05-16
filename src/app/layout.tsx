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
    template: "%s | PlayQ Academy",
    default: "PlayQ Academy — Test Automation with Playwright",
  },
  description:
    "De QA Manual a QA Automatizado. Aprende Playwright y TypeScript con PlayQ Academy, la plataforma de formación en automatización de pruebas líder en español.",
  keywords: [
    "Playwright",
    "TypeScript",
    "test automation",
    "QA automation",
    "PlayQ Academy",
  ],
  openGraph: {
    title: "PlayQ Academy — Test Automation with Playwright",
    description:
      "De QA Manual a QA Automatizado. Tu transición comienza aquí.",
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayQ Academy",
    description:
      "From Manual QA to Automated QA. Your transition starts here.",
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
