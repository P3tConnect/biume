import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";

const DashboardOrganizationLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: Promise<{ orgId: string }>;
}) => {
  const { orgId } = await params;

  return (
    <DashboardLayoutComponents companyId={orgId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardOrganizationLayout;
