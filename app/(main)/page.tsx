import ClientHome from "@/components/landing-page/client-home";
import { Suspense } from "react";
import HomeLoading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <ClientHome />
    </Suspense>
  );
}
