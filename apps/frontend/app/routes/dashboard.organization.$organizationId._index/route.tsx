import { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    {
      title: "Dashboard",
    },
    {
      name: "description",
      content: "Dashboard",
    },
  ]
}

const DashboardOrganizationHomePage = () => {
  return (
    <div>DashboardOrganizationHomePage</div>
  )
}

export default DashboardOrganizationHomePage