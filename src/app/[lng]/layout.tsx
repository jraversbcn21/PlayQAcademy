import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { GamificationProvider } from "@/context/GamificationContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/*
 * Language-specific layout.
 *
 * Wraps every page under /[lng] with:
 *   AuthProvider → GamificationProvider → Navbar → main → Footer.
 *
 * i18n is handled by the [lng] dynamic segment + middleware cookie.
 * Client components use useTranslation() from @/lib/i18n/client
 * which reads lng from useParams() automatically.
 */

interface LngLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const isEs = lng === "es";

  return {
    title: {
      template: `%s | PlayQAcademy`,
      default: isEs
        ? "PlayQAcademy — Domina el QA de software"
        : "PlayQAcademy — Master Software QA",
    },
    description: isEs
      ? "Fundamentos de QA, certificación ISTQB CTFL y automatización con Playwright y TypeScript, todo en una sola plataforma."
      : "QA Fundamentals, ISTQB CTFL certification, and Playwright + TypeScript automation, all in one platform.",
    openGraph: {
      title: isEs
        ? "PlayQAcademy — Domina el QA de software"
        : "PlayQAcademy — Master Software QA",
      description: isEs
        ? "Fundamentos de QA, certificación ISTQB CTFL y automatización con Playwright. Tu carrera en QA comienza aquí."
        : "QA Fundamentals, ISTQB CTFL certification, and Playwright automation. Your QA career starts here.",
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

// eslint-disable-next-line import/no-unused-modules
export async function generateStaticParams() {
  return [{ lng: "es" }, { lng: "en" }];
}

export default function LngLayout({ children, params }: LngLayoutProps) {
  const { lng } = params;

  return (
    <AuthProvider lng={lng}>
      <GamificationProvider lng={lng}>
        <div className="flex min-h-screen flex-col">
          <Navbar currentLng={lng} />
          <main className="flex-1">{children}</main>
          <Footer currentLng={lng} />
        </div>
      </GamificationProvider>
    </AuthProvider>
  );
}
