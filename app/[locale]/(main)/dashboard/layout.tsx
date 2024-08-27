import { redirect } from 'next/navigation'
import { PropsWithChildren, ReactNode } from 'react'
import DashboardLayoutComponents from '@/components/dashboard/layout/dashboard-layout';

export default function DashboardLayout({ pro, client, admin }: { pro: ReactNode, client: ReactNode, admin: ReactNode })  {
  // redirect('/')
  console.log("bonjour")
  return (
    <DashboardLayoutComponents>{pro}</DashboardLayoutComponents>
  )
}