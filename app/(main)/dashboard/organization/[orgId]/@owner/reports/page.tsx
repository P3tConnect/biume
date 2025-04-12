import ReportsPageComponent from "@/components/dashboard/pages/pro/reports-page/reports-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rapports | Dashboard",
  description: "Rapports",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const DashboardOrganizationReportsPage = () => {
  return <ReportsPageComponent />
}

export default DashboardOrganizationReportsPage
