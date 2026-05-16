import type { Metadata } from "react";
import { appWithTranslation } from "next-i18next";
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
 * GamificationProvider renders BadgeUnlockedModal / LevelUpModal at the
 * app root so any component can trigger them via useGamificationUI().
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
      template: `%s | PlayQ Academy`,
      default: "PlayQ Academy — Test Automation with Playwright",
    },
    description: isEs
      ? "De QA Manual a QA Automatizado. Aprende Playwright y TypeScript con PlayQ Academy."
      : "From Manual QA to Automated QA. Learn Playwright and TypeScript with PlayQ Academy.",
    openGraph: {
      title: "PlayQ Academy — Test Automation with Playwright",
      description: isEs
        ? "De QA Manual a QA Automatizado. Tu transición comienza aquí."
        : "From Manual QA to Automated QA. Your transition starts here.",
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

// eslint-disable-next-line import/no-unused-modules
export async function generateStaticParams() {
  return [{ lng: "es" }, { lng: "en" }];
}

function LngLayout({ children, params }: LngLayoutProps) {
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

export default appWithTranslation(LngLayout);
