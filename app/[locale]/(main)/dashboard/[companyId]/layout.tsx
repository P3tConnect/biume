import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import Loader from "@/components/loader";
import { currentUser } from "@/src/lib";
import { redirect } from "next/navigation";

const DashboardCompanyLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: { companyId: string; locale: string };
}) => {
  const user = await currentUser();

  console.log(user.publicMetadata.isPro, "isPro");

  if (
    user.publicMetadata.isPro == false ||
    user.publicMetadata.isPro == undefined
  ) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutComponents companyId={params.companyId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardCompanyLayout;
