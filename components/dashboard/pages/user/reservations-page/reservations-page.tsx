import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { getAllAppointmentForClient } from "@/src/actions/appointments.action"
import { Appointment } from "@/src/db/appointments"
import { CalendarViewClient } from "./components/calendar-view-client"

export default async function ClientDashboardReservationsComponent() {
  const appointments = await getAllAppointmentForClient({})
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <CalendarViewClient appointments={appointments.data as Appointment[]} />
      </Suspense>
    </div>
  )
}
