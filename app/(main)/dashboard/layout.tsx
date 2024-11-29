import { auth } from "@/src/lib/auth";
import { getSession } from "@/src/lib/auth-client";
import { headers } from "next/headers";
import { ReactNode } from "react";

const DashboardLayout = async ({
  company,
  client,
}: {
  company: ReactNode;
  client: ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.isPro) {
    return <>{company}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
