"use client";

import { useTranslation } from "@/lib/i18n/client";

export default function SetupPage({ params: { lng } }: { params: { lng: string } }) {
  const { t: _t } = useTranslation("common");
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://playqacademy.com";
  const playgroundUrl = `${baseUrl}/${lng}/playground`;

  const steps = [
    {
      titleEs: "1. Crea o clona un proyecto Playwright",
      titleEn: "1. Create or clone a Playwright project",
      code: "npm init playwright@latest\n# or in existing project:\nnpm install -D @playwright/test\nnpx playwright install",
      descEs: "Ejecuta este comando en tu terminal. Elige TypeScript cuando pregunte. Esto crea playwright.config.ts, una carpeta tests/ y archivos de ejemplo.",
      descEn: "Run this command in your terminal. Choose TypeScript when prompted. This creates playwright.config.ts, a tests/ folder, and example files.",
    },
    {
      titleEs: "2. Configura baseURL en playwright.config.ts",
      titleEn: "2. Configure baseURL in playwright.config.ts",
      code: `import { defineConfig } from '@playwright/test';\n\nexport default defineConfig({\n  use: {\n    baseURL: '${playgroundUrl}',\n    // other options...\n  },\n});`,
      descEs: "Abre playwright.config.ts y añade la propiedad `baseURL` dentro de `use`. Esto te permite usar rutas relativas en page.goto('/login').",
      descEn: "Open playwright.config.ts and add the `baseURL` property inside `use`. This lets you use relative paths like page.goto('/login').",
    },
    {
      titleEs: "3. Plantilla de tu primer test",
      titleEn: "3. First test template",
      code: `import { test, expect } from '@playwright/test';\n\ntest('login with valid credentials', async ({ page }) => {\n  await page.goto('/login');\n\n  // Find elements by their accessible label\n  await page.getByLabel('Email').fill('student@playq.test');\n  await page.getByLabel('Password').fill('Playwright123!');\n\n  // Find the submit button by its role and accessible name\n  await page.getByRole('button', { name: 'Sign In' }).click();\n\n  // Assert the URL changed to the dashboard\n  await expect(page).toHaveURL(/\\/login\\/dashboard/);\n\n  // Assert the welcome message is visible\n  await expect(page.getByText('Welcome back')).toBeVisible();\n});`,
      descEs: "Copia este test en tests/playground.spec.ts. Usa getByRole, getByLabel y getByText — las estrategias de localización recomendadas por Playwright.",
      descEn: "Copy this test into tests/playground.spec.ts. Use getByRole, getByLabel, and getByText — Playwright's recommended locator strategies.",
    },
    {
      titleEs: "4. Ejecuta tus tests",
      titleEn: "4. Run your tests",
      code: "# Ejecutar todos los tests\nnpx playwright test\n\n# Ejecutar un archivo específico\nnpx playwright test tests/playground.spec.ts\n\n# Modo UI (recomendado para desarrollo)\nnpx playwright test --ui\n\n# Modo headed (ver el navegador)\nnpx playwright test --headed\n\n# Generar reporte HTML\nnpx playwright show-report",
      descEs: "¡Listo! Ejecuta tus tests contra el Playground. Usa --ui para ver el timeline interactivo o --headed para ver el navegador en acción.",
      descEn: "Ready! Run your tests against the Playground. Use --ui for the interactive timeline or --headed to see the browser in action.",
    },
  ];

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {lng === "es" ? "Guía de Configuración" : "Setup Guide"}
        </h1>
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          {lng === "es"
            ? "Sigue estos pasos para empezar a escribir tests de Playwright contra el PlayQ Playground."
            : "Follow these steps to start writing Playwright tests against the PlayQ Playground."}
        </p>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
              <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
                {lng === "es" ? step.titleEs : step.titleEn}
              </h3>
              <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
                {lng === "es" ? step.descEs : step.descEn}
              </p>
              <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-sm leading-relaxed text-[#c9d1d9]">
                <code>{step.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
