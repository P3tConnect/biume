import ClientsPageComponent from "@/components/dashboard/pages/pro/clients-page/clients-page"
import { getClients } from "@/src/actions/client.action"
import { Suspense } from "react"

const DashboardorganizationClientsPage = async () => {
  const { data: clients } = await getClients({})

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientsPageComponent clients={clients ?? []} />
    </Suspense>
  )
}

export default DashboardorganizationClientsPage
