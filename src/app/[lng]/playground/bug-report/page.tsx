import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import BugReportDrillClient from "./BugReportDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/bug-report");
}

export default function Page(props: PageProps) {
  return <BugReportDrillClient params={props.params} />;
}
