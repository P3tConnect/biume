import { ReactNode } from "react";
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";

export default function DashboardLayout({
  pro,
  client,
  admin,
}: {
  pro: ReactNode;
  client: ReactNode;
  admin: ReactNode;
}) {
  return <DashboardLayoutComponents>{pro}</DashboardLayoutComponents>;
}
