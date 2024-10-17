import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";

const DashboardCompanyLayout = ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: { companyId: string };
}) => {
  return (
    <DashboardLayoutComponents companyId={params.companyId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardCompanyLayout;
