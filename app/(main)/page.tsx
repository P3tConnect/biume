import ClientHome from "@/components/landing-page/client-home";
import { Suspense } from "react";
import HomeLoading from "./loading";

export default async function Home({ searchParams }: { searchParams: Promise<{ version?: string }> }) {

  const { version } = await searchParams;

  return (
    <Suspense fallback={<HomeLoading />}>
      <ClientHome searchParams={{ version }} />
    </Suspense>
  );
}
