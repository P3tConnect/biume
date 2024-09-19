import { ReactNode } from "react"
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";

const DashboardCompanyLayout = ({ member, owner } : { member: ReactNode, owner: ReactNode }) => {
  return (
    <DashboardLayoutComponents>{owner}</DashboardLayoutComponents>
  )
}

export default DashboardCompanyLayout