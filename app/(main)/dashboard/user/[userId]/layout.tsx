import DashboardClientLayout from "@/components/dashboard/layout/client/dashboard-client-layout";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ClientDashboardLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string; locale: string }>;
}) => {
  redirect("/");

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
};

export default ClientDashboardLayout;
