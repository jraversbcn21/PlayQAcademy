import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import HomeClient from "./HomeClient";

interface PageParams {
  params: Promise<{ lng: string }>;
}

/**
 * Only `alternates` is set here — title/description/openGraph are already
 * correct per-locale via [lng]/layout.tsx's generateMetadata and Next merges
 * unset fields from the parent, so redeclaring them here would just be
 * duplication that can drift out of sync.
 */
export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const { lng } = await props.params;

  return {
    alternates: buildAlternates(lng, ""),
  };
}

export default function HomePage() {
  return <HomeClient />;
}
