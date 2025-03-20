"use client"

import { DashboardSidebar } from "./dashboard-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({ children, companyId }: { children: React.ReactNode; companyId: string }) {
  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar companyId={companyId} />
      <SidebarInset className="flex min-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </SidebarInset>
    </div>
  )
}
