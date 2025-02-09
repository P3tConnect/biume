import { json, Outlet, useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import DashboardProLayout from '@/components/dashboard/pro/dashboard-layout'

export async function loader({ params }: LoaderFunctionArgs) {
  const { organizationId } = params
  return json({ organizationId })
}

const DashboardOrganizationLayout = () => {
  const { organizationId } = useLoaderData<typeof loader>()

  if (!organizationId) {
    throw new Error('L\'identifiant de l\'organisation ne peut pas être défini');
  }

  return (
    <DashboardProLayout companyId={organizationId}>
      <Outlet />
    </DashboardProLayout>
  )
}

export default DashboardOrganizationLayout
