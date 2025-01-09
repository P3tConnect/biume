import { currentUser } from "@/src/lib";
import { ReactNode } from "react";

const DashboardLayout = async ({
  company,
  client,
}: {
  company: ReactNode;
  client: ReactNode;
}) => {
  const user = await currentUser();

  if (user.isPro) {
    return <>{company}</>;
  }

  return <>{client}</>;
};

export default DashboardLayout;
