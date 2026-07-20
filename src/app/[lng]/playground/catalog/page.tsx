import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import CatalogClient from "./CatalogClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/catalog");
}

export default function Page(props: PageProps) {
  return <CatalogClient params={props.params} />;
}
