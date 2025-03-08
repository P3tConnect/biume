import { ReactNode } from "react"

import DashboardClientLayout from "@/components/dashboard/layout/client/dashboard-client-layout"

const ClientDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return <DashboardClientLayout>{children}</DashboardClientLayout>
}

export default ClientDashboardLayout
