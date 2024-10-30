import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";

const DashboardCompanyLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: Promise<{ companyId: string; locale: string }>;
}) => {
  const { companyId } = await params;

  return (
    <DashboardLayoutComponents companyId={companyId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardCompanyLayout;
