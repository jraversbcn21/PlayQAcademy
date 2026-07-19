import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

interface SignUpPageProps {
  params: Promise<{ lng: string }>;
}

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { lng } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
        </div>
      }
    >
      <SignUpForm lng={lng} />
    </Suspense>
  );
}
