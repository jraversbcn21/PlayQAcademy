import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import PartitioningDrillClient from "./PartitioningDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/partitioning");
}

export default function Page(props: PageProps) {
  return <PartitioningDrillClient params={props.params} />;
}
