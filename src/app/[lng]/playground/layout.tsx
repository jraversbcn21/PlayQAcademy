"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Exercise link data                                                 */
/* ------------------------------------------------------------------ */

const EXERCISES = [
  { href: "/playground/login", icon: "🔑", labelEs: "Login", labelEn: "Login" },
  { href: "/playground/signup", icon: "📝", labelEs: "Registro", labelEn: "Sign Up" },
  { href: "/playground/catalog", icon: "🛍️", labelEs: "Catálogo", labelEn: "Catalog" },
  { href: "/playground/cart", icon: "🛒", labelEs: "Carrito", labelEn: "Cart" },
  { href: "/playground/table", icon: "📊", labelEs: "Tabla", labelEn: "Table" },
  { href: "/playground/dynamic", icon: "⏳", labelEs: "Dinámico", labelEn: "Dynamic" },
  { href: "/playground/files", icon: "📁", labelEs: "Archivos", labelEn: "Files" },
  { href: "/playground/frames", icon: "🖼️", labelEs: "iFrames", labelEn: "Frames" },
  { href: "/playground/api", icon: "🌐", labelEs: "API", labelEn: "API" },
];

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

interface PlaygroundLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

export default function PlaygroundLayout({ children, params: { lng } }: PlaygroundLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Sub-nav */}
      <div className="sticky top-16 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-lg">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="container-app flex gap-1 py-2" role="navigation" aria-label="Playground exercises">
            <Link
              href={`/${lng}/playground`}
              className={[
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                pathname === `/${lng}/playground`
                  ? "bg-brand-blue-600 text-white"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]",
              ].join(" ")}
            >
              🏠 {lng === "es" ? "Inicio" : "Home"}
            </Link>
            {EXERCISES.map((ex) => {
              const fullHref = `/${lng}${ex.href}`;
              const isActive = pathname.startsWith(fullHref);
              return (
                <Link
                  key={ex.href}
                  href={fullHref}
                  className={[
                    "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1",
                    isActive
                      ? "bg-brand-blue-600 text-white"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  <span aria-hidden="true">{ex.icon}</span>
                  <span className="hidden sm:inline">{lng === "es" ? ex.labelEs : ex.labelEn}</span>
                </Link>
              );
            })}
            <Link
              href={`/${lng}/playground/setup`}
              className={[
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                pathname === `/${lng}/playground/setup`
                  ? "bg-brand-green-600 text-white"
                  : "text-brand-green-400 hover:bg-brand-green-500/10",
              ].join(" ")}
            >
              ⚙️ {lng === "es" ? "Setup" : "Setup"}
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
