import { Suspense } from "react"
import DashboardOrganizationTimetableLoading from "./loading"
import { CalendarView } from "@/components/calendar"
import { getConfirmedAndAboveAppointments } from "@/src/actions/appointments.action"
import { Appointment } from "@/src/db/appointments"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agenda | Dashboard",
  description: "Agenda",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default async function DashboardOrganizationTimetablePage() {
  const appointments = await getConfirmedAndAboveAppointments({})

  return (
    <div className="h-full w-full flex flex-col">
      <Suspense fallback={<DashboardOrganizationTimetableLoading />}>
        <CalendarView appointments={appointments.data as Appointment[]} />
      </Suspense>
    </div>
  )
}
