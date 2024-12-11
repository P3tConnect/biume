import { auth } from "@/src/lib/auth";
import { getSession } from "@/src/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({
  company,
  client,
}: {
  company: ReactNode;
  client: ReactNode;
}) => {
  redirect("/");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (session?.user.isPro) {
    return <>{company}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
