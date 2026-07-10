import { Suspense } from "react";
import SignInForm from "./SignInForm";

interface SignInPageProps {
  params: Promise<{ lng: string }>;
}

export default async function SignInPage({ params }: SignInPageProps) {
  const { lng } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
        </div>
      }
    >
      <SignInForm lng={lng} />
    </Suspense>
  );
}
