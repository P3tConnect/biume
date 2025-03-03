import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/pro/dashboard-layout";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardOrganizationLayout = async ({
  member,
  owner,
  params,
}: {
  member: ReactNode;
  owner: ReactNode;
  params: Promise<{ orgId: string }>;
}) => {
  redirect("/");

  const { orgId } = await params;

  // Vérifier si l'utilisateur a une organisation active
  const organization = await auth.api.listOrganizations({
    headers: await headers(),
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si l'utilisateur n'a pas d'organisation, le rediriger vers son dashboard
  if (organization.length === 0) {
    redirect(`/dashboard/user/${session?.user.id}`);
  }

  const activeMember = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: orgId,
    userId: session?.user.id,
  });

  return activeMember?.role == "member" ? (
    <DashboardLayoutComponents companyId={orgId}>
      {member}
    </DashboardLayoutComponents>
  ) : (
    <DashboardLayoutComponents companyId={orgId}>
      {owner}
    </DashboardLayoutComponents>
  );
};

export default DashboardOrganizationLayout;
