import DashboardClientLayout from "@/components/dashboard/layout/dashboard-client-layout";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

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
