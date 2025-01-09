import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { currentUser } from "@/src/lib";
import { redirect } from "next/navigation";

const DashboardOrganizationLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: Promise<{ companyId: string; locale: string }>;
}) => {
  const { companyId } = await params;
  const user = await currentUser();

  if (!user.isPro) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutComponents companyId={companyId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardOrganizationLayout;
