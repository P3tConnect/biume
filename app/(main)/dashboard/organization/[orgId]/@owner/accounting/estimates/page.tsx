import { DashboardEstimatesComponent } from "@/components/dashboard/pages/pro/estimates-page/estimates-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Devis | Comptabilité",
  description: "Devis",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const ProDashboardEstimatesPage = () => {
  return <DashboardEstimatesComponent />
}

export default ProDashboardEstimatesPage
