import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import Loader from "@/components/loader";

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
      <ClerkLoaded>
        {owner}
      </ClerkLoaded>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
    </DashboardLayoutComponents>
  );
};

export default DashboardCompanyLayout;
