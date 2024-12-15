import { auth } from "@/src/lib/auth";
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

  if (session?.user.isPro) {
    return <>{company}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
