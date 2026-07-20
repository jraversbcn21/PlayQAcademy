import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import DataTableClient from "./DataTableClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/table");
}

export default function Page(props: PageProps) {
  return <DataTableClient params={props.params} />;
}
