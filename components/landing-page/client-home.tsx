import { Suspense } from "react";
import { ClientHomeContent } from "@/components/landing-page/client-home-content";
import HomeLoading from "@/app/(main)/loading";

export default function Home({ searchParams }: { searchParams: { version?: string } }) {
  const version = searchParams.version || "user";

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden">
      <Suspense fallback={<HomeLoading />}>
        <ClientHomeContent version={version} />
      </Suspense>
    </div>
  );
}
