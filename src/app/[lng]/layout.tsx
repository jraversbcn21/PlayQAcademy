import type { Metadata } from "react";
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
      default: "PlayQAcademy — Test Automation with Playwright",
    },
    description: isEs
      ? "De QA Manual a QA Automatizado. Aprende Playwright y TypeScript con PlayQAcademy."
      : "From Manual QA to Automated QA. Learn Playwright and TypeScript with PlayQAcademy.",
    openGraph: {
      title: "PlayQAcademy — Test Automation with Playwright",
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
