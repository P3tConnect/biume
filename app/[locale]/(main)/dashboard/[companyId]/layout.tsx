import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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
    <>
      <SignedIn>
        <DashboardLayoutComponents companyId={params.companyId}>
          {owner}
        </DashboardLayoutComponents>
      </SignedIn>
      <SignedOut>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <Loader />
          <h1>You are now disconnected, redirecting ...</h1>
        </div>
      </SignedOut>
    </>
  );
};

export default DashboardCompanyLayout;
