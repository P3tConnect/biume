import { redirect } from 'next/navigation'
import React, { PropsWithChildren, ReactNode } from 'react'

const DashboardLayout = ({ children, admin, pro, client }: PropsWithChildren<{ admin: ReactNode, pro: ReactNode, client: ReactNode }>) => {
  redirect('/')
  return (
    <>{children}{admin}{pro}{client}</>
  )
}

export default DashboardLayout