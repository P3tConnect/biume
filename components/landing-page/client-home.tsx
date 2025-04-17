import { Suspense } from "react";
import { Header } from "@/components/landing-page/header";
import { PageSwitch } from "@/components/landing-page/page-switch";
import { ClientHomeContent } from "@/components/landing-page/client-home-content";

export default function Home({ searchParams }: { searchParams: { version?: string } }) {
  const version = searchParams.version || "user";

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
      </div>

      <Header />
      <div className="w-full flex justify-center items-center md:hidden mt-[4.5rem] lg:mt-0 mb-2">
        <PageSwitch />
      </div>

      <Suspense fallback={<div className="flex-1 md:mt-20 w-full overflow-x-hidden"></div>}>
        <ClientHomeContent version={version} />
      </Suspense>
    </div>
  );
}
