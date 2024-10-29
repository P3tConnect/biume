import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { currentUser } from "@/src/lib";
import { ReactNode } from "react";

const DashboardLayout = async ({
  children,
  client,
}: {
  children: ReactNode;
  client: ReactNode;
}) => {
  const user = await currentUser();

  if (user.publicMetadata.isPro == true) {
    return <>{children}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
