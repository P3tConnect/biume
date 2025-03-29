import { Suspense } from "react"

import { TimetableView } from "@/components/dashboard/pages/pro/timetable-page/timetable-view"

import DashboardOrganizationTimetableLoading from "./loading"
import { CalendarView } from "@/components/calendar"
import { getAllAppointments, getConfirmedAndAboveAppointments } from "@/src/actions/appointments.action"
import { Appointment } from "@/src/db/appointments"

// Données temporaires pour la démonstration
const mockAppointments = [
  {
    title: "Product Review",
    startTime: "14:00",
    endTime: "15:30",
    date: new Date(2025, 2, 22), // 22 mars 2025
  },
  {
    title: "Product Review",
    startTime: "14:00",
    endTime: "15:30",
    date: new Date(2025, 2, 23), // 22 mars 2025
  },
  {
    title: "Product Review",
    startTime: "14:00",
    endTime: "15:30",
    date: new Date(2025, 2, 24), // 22 mars 2025
  },
]

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
