import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui'
import React from 'react'
import SidebarClientHeaderComponent from './sidebar-header'
import SidebarClientContentComponent from './sidebar-content'
import SidebarClientFooterComponent from './sidebar-footer'

const SidebarClientComponent = () => {
  return (
    <Sidebar collapsible='icon' variant='floating'>
        <SidebarHeader>
          <SidebarClientHeaderComponent />
        </SidebarHeader>
        <SidebarContent>
          <SidebarClientContentComponent />
        </SidebarContent>
        <SidebarFooter>
          <SidebarClientFooterComponent />
        </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarClientComponent