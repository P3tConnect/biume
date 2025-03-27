"use client"

import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({ children, companyId }: { children: React.ReactNode; companyId: string }) {
  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar companyId={companyId} />
      <SidebarInset className="flex h-full w-full flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto px-2">{children}</div>
      </SidebarInset>
    </div>
  )
}
