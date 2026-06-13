"use client";

import { CAMPUSES } from "@/lib/constants/campuses";
import CampusCard from "./CampusCard";

interface CampusGridProps {
  lng: string;
  t: (key: string, opts?: Record<string, unknown>) => string;
  titleKey: string;
  subtitleKey: string;
}

export default function CampusGrid({ lng, t, titleKey, subtitleKey }: CampusGridProps) {
  return (
    <section className="border-t border-[var(--color-border)] px-4 py-16 lg:py-20">
      <div className="container-app">
        <h2 className="mb-4 text-center text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {t(titleKey)}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
          {t(subtitleKey)}
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {CAMPUSES.map((campus, idx) => (
            <CampusCard
              key={campus.id}
              campus={campus}
              lng={lng}
              t={t}
              animationDelay={idx * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
