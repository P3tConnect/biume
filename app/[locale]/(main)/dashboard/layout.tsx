import { currentUser } from "@/src/lib";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({
  company,
  client,
}: {
  company: ReactNode;
  client: ReactNode;
}) => {
  const user = await currentUser();

  if (user?.publicMetadata.isPro) {
    return <>{company}</>
  }

  return <>{client}</>;
};

export default DashboardLayout;
