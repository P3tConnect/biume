import AccountingPageComponent from "@/components/dashboard/pages/pro/accounting-page/accounting-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accueil | Comptabilité",
  description: "Accueil de la comptabilité",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const DashboardOrganizationAccoutingPage = () => {
  return <AccountingPageComponent />
}

export default DashboardOrganizationAccoutingPage
