import { currentUser } from "@/src/lib";
import { getSession } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({
  company,
  client,
}: {
  company: ReactNode;
  client: ReactNode;
}) => {
  const { data: session } = await getSession();

  if (session?.user) {
    return <>{company}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
