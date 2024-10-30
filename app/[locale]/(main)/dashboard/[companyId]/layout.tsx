import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import Loader from "@/components/loader";
// import { currentUser } from "@/src/lib";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

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
