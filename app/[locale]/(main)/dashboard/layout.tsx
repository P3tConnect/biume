import { redirect } from 'next/navigation'
import React, { PropsWithChildren, ReactNode } from 'react'
import DashboardLayoutComponents from '@/components/dashboard/layout/dashboard-layout'

const DashboardLayout = ({ children, admin, pro, client }: PropsWithChildren<{ admin: ReactNode, pro: ReactNode, client: ReactNode }>) => {
  redirect('/')
  return (
    <DashboardLayoutComponents>{children}{admin}{pro}{client}</DashboardLayoutComponents>
  )
}

export default DashboardLayout