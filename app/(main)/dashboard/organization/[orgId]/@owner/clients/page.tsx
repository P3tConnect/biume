import ClientsPageComponent from "@/components/dashboard/pages/pro/clients-page/clients-page"
import { getClients } from "@/src/actions/client.action"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clients | Dashboard",
  description: "Clients",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const DashboardorganizationClientsPage = async () => {
  const { data: clients } = await getClients({})

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientsPageComponent clients={clients ?? []} />
    </Suspense>
  )
}

export default DashboardorganizationClientsPage
