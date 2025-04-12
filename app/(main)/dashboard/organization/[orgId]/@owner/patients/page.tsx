import PatientsPageComponent from "@/components/dashboard/pages/pro/patients-page/patients-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patients | Dashboard",
  description: "Patients",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const DashboardCompanyPatientsPage = () => {
  return <PatientsPageComponent />
}

export default DashboardCompanyPatientsPage
