import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { ReactNode } from "react";

const OnBoardingLayout = async ({
  pro,
  client,
}: {
  pro: ReactNode;
  client: ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.isPro) {
    return <>{pro}</>;
  }

  return <>{client}</>;
};

export default OnBoardingLayout;
