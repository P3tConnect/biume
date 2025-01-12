import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { currentUser } from "@/src/lib";

const DashboardOrganizationLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: Promise<{ orgId: string; locale: string }>;
}) => {
  const { orgId } = await params;
  const user = await currentUser();

  return (
    <DashboardLayoutComponents companyId={orgId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardOrganizationLayout;
