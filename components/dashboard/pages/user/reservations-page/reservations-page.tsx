"use client"

import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import { TimetableViewClient } from "./components/timetable-view-client"

const ClientDashboardReservationsComponent = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <TimetableViewClient appointments={[]} />
      </Suspense>
    </div>
  )
}

export default ClientDashboardReservationsComponent
