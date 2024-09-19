import { ReactNode } from "react"
import DashboardLayoutComponents from "@/components/dashboard/layout/dashboard-layout";
import { logger } from "@/src/lib";

const DashboardCompanyLayout = ({ member, owner, params } : { member: ReactNode, owner: ReactNode, params: { companyId: string } }) => {

  logger.info("params", params);

  return (
    <DashboardLayoutComponents companyId={params.companyId}>{owner}</DashboardLayoutComponents>
  )
}

export default DashboardCompanyLayout