"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui";
import SidebarHeaderComponent from "./sidebar-header";
import SidebarContentComponent from "./sidebar-content";
import SidebarFooterComponent from "./sidebar-footer";

export function SidebarComponent({ companyId }: { companyId: string }) {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarHeaderComponent />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentComponent companyId={companyId} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterComponent />
      </SidebarFooter>
    </Sidebar>
  );
}
