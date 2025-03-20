"use client"

import { useState } from "react"
import { Appointment } from "@/src/db/appointments"
import { CalendarHeader } from "./calendar-header"
import { CalendarGrid } from "./calendar-grid"
import { CalendarSidebar } from "./calendar-sidebar"

interface CalendarViewProps {
  className?: string
  appointments?: Appointment[]
}

export function CalendarView({ className, appointments = [] }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getSelectedDayEvents = () => {
    if (!selectedDate) return []
    return appointments.filter(appointment => {
      const eventDate = new Date(appointment.slot.start)
      return eventDate.toDateString() === selectedDate.toDateString()
    })
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <CalendarHeader />
      <div className="flex gap-4 flex-1">
        <CalendarGrid appointments={appointments} onDateSelect={setSelectedDate} />
        <CalendarSidebar selectedDate={selectedDate} appointments={getSelectedDayEvents()} />
      </div>
    </div>
  )
}
