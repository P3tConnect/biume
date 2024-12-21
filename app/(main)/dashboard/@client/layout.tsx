import DashboardClientLayout from '@/components/dashboard/layout/dashboard-client-layout'
import React from 'react'

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardClientLayout>
      {children}
    </DashboardClientLayout>
  )
}

export default ClientDashboardLayout