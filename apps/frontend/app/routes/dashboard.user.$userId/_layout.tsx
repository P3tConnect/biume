import { Outlet } from '@remix-run/react'

const DashboardUserLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardUserLayout