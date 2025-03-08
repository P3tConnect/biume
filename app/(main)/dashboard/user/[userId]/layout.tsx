import DashboardClientLayout from "@/components/dashboard/layout/client/dashboard-client-layout";
import { ReactNode } from "react";

const ClientDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
};

export default ClientDashboardLayout;
