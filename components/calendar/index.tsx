"use client"

import { useState } from "react"
import { Appointment } from "@/src/db/appointments"
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
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <div className="flex-1 min-h-0 overflow-hidden">
          <CalendarGrid appointments={appointments} onDateSelect={setSelectedDate} />
        </div>
        <div className="w-full lg:w-[400px] min-h-[400px] lg:min-h-0">
          <CalendarSidebar selectedDate={selectedDate} appointments={getSelectedDayEvents()} />
        </div>
      </div>
    </div>
  )
}
