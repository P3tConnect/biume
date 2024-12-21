import DashboardClientLayout from "@/components/dashboard/layout/dashboard-client-layout";
import ClientInformationsStep from "@/components/onboarding/client/informations-step";
import React from "react";

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
};

export default ClientDashboardLayout;
