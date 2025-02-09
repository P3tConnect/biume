import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import SidebarHeaderPro from "./sidebar-header"
import SidebarContentPro from "./sidebar-content"
import SidebarFooterPro from "./sidebar-footer"

const DashboardSidebarPro = ({ companyId }: { companyId: string }) => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderPro />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentPro companyId={companyId} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterPro />
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebarPro