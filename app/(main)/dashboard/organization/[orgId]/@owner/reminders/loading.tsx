import { Loader2 } from "lucide-react"
import React from "react"

const DashboardOrganizationRemindersLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  )
}

export default DashboardOrganizationRemindersLoading
