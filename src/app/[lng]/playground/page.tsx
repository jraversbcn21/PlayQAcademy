"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Exercise card data                                                 */
/* ------------------------------------------------------------------ */

type Difficulty = "beginner" | "intermediate" | "advanced";

interface ExerciseCardData {
  href: string;
  icon: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  modules: string[];
  difficulty: Difficulty;
}

const EXERCISE_CARDS: ExerciseCardData[] = [
  { href: "/playground/login", icon: "🔑", titleEs: "Formulario de Login", titleEn: "Login Form", descEs: "Practica localizadores por rol y label, acciones fill/click y aserciones de URL y visibilidad.", descEn: "Practice role and label locators, fill/click actions, and URL/visibility assertions.", modules: ["M3: Locators", "M4: Actions"], difficulty: "beginner" },
  { href: "/playground/signup", icon: "📝", titleEs: "Asistente de Registro", titleEn: "Sign Up Wizard", descEs: "Formulario multi-paso con validación por etapa, selectores anidados y navegación condicional.", descEn: "Multi-step form with per-stage validation, nested selectors, and conditional navigation.", modules: ["M3: Locators", "M4: Actions"], difficulty: "intermediate" },
  { href: "/playground/catalog", icon: "🛍️", titleEs: "Catálogo E-commerce", titleEn: "E-commerce Catalog", descEs: "Filtros combinados, ordenamiento, paginación y localizadores complejos en un grid de productos.", descEn: "Combined filters, sorting, pagination, and complex locators in a product grid.", modules: ["M3: Locators", "M5: POM"], difficulty: "intermediate" },
  { href: "/playground/cart", icon: "🛒", titleEs: "Carrito de Compras", titleEn: "Shopping Cart", descEs: "Manejo de estado, aserciones de totales, códigos de descuento y estados vacíos.", descEn: "State management, total assertions, discount codes, and empty states.", modules: ["M4: Actions", "M4: Assertions"], difficulty: "intermediate" },
  { href: "/playground/table", icon: "📊", titleEs: "Tabla de Datos", titleEn: "Data Table", descEs: "Tabla con ordenamiento, filtros, paginación, selección de filas y edición inline.", descEn: "Table with sorting, filtering, pagination, row selection, and inline editing.", modules: ["M3: Locators", "M4: Actions"], difficulty: "advanced" },
  { href: "/playground/dynamic", icon: "⏳", titleEs: "Contenido Dinámico", titleEn: "Dynamic Content", descEs: "Practica el auto-waiting con spinners, progress bars, delays aleatorios y toasts.", descEn: "Practice auto-waiting with spinners, progress bars, random delays, and toasts.", modules: ["M4: Auto-waiting"], difficulty: "beginner" },
  { href: "/playground/files", icon: "📁", titleEs: "Subida y Descarga de Archivos", titleEn: "File Upload & Download", descEs: "Ejercicios de file input, drag-and-drop, validación de tipos y descargas.", descEn: "File input exercises, drag-and-drop, type validation, and downloads.", modules: ["M4: Special Actions"], difficulty: "intermediate" },
  { href: "/playground/frames", icon: "🖼️", titleEs: "iFrames y Popups", titleEn: "iFrames & Popups", descEs: "Navegación entre frames, ventanas emergentes y modales con formularios anidados.", descEn: "Frame switching, popup windows, and modals with nested forms.", modules: ["M4: Frames & Windows"], difficulty: "advanced" },
  { href: "/playground/api", icon: "🌐", titleEs: "API Playground", titleEn: "API Playground", descEs: "Endpoints REST reales para practicar API testing con Playwright. GET, POST, PUT, DELETE.", descEn: "Real REST endpoints to practice API testing with Playwright. GET, POST, PUT, DELETE.", modules: ["M7: API Testing"], difficulty: "advanced" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface PageProps { params: { lng: string } }

export default function PlaygroundHomePage({ params: { lng } }: PageProps) {
  const { t: _t } = useTranslation("common");

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-5xl">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Bienvenido al PlayQ Playground" : "Welcome to the PlayQ Playground"}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {lng === "es"
              ? "Tu laboratorio práctico para escribir tests reales de Playwright"
              : "Your hands-on lab to write real Playwright tests"}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Cada sección está diseñada para practicar conceptos específicos del currículum. Ejecuta tus tests de Playwright contra estas páginas desde tu máquina local. Abre la guía de Setup para comenzar."
              : "Each section is designed to practice specific curriculum concepts. Run your Playwright tests against these pages from your local machine. Open the Setup guide to get started."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/${lng}/playground/setup`}>
              <span className="inline-flex items-center rounded-lg bg-brand-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-500 transition-colors">
                ⚙️ {lng === "es" ? "Guía de Setup" : "Setup Guide"}
              </span>
            </Link>
          </div>
        </div>

        {/* Exercise grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXERCISE_CARDS.map((card) => {
            const diffColors: Record<Difficulty, string> = { beginner: "border-brand-green-500/30", intermediate: "border-amber-500/30", advanced: "border-red-500/30" };
            return (
              <Link
                key={card.href}
                href={`/${lng}${card.href}`}
                className={[
                  "group rounded-xl border bg-[var(--color-bg-secondary)] p-5 transition-all hover:shadow-lg",
                  diffColors[card.difficulty],
                  "hover:border-brand-blue-500/40",
                ].join(" ")}
              >
                <div className="mb-3 text-3xl">{card.icon}</div>
                <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)] group-hover:text-brand-blue-400 transition-colors">
                  {lng === "es" ? card.titleEs : card.titleEn}
                </h3>
                <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {lng === "es" ? card.descEs : card.descEn}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.modules.map((m) => (
                    <Badge key={m} variant="info" size="sm">{m}</Badge>
                  ))}
                  <Badge variant={card.difficulty === "beginner" ? "success" : card.difficulty === "intermediate" ? "warning" : "error"} size="sm">
                    {card.difficulty}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
