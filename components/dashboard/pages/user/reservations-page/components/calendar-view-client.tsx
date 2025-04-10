"use client"

import { Appointment } from "@/src/db/appointments"
import { CalendarGrid } from "@/components/calendar/components/calendar-grid"
import { CalendarSidebarClient } from "./calendar-sidebars-client"
import { ViewMode } from "@/src/types/view-mode"
import { WeekView } from "@/components/calendar/components/week-view"
import { useState } from "react"

interface CalendarViewProps {
  className?: string
  appointments?: Appointment[]
  onNewAppointment?: () => void
}

export function CalendarViewClient({ className, appointments = [], onNewAppointment }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())

  const getSelectedDayEvents = () => {
    if (!selectedDate) return []
    return appointments.filter(appointment => {
      const eventDate = new Date(appointment.slot.start)
      return eventDate.toDateString() === selectedDate.toDateString()
    })
  }

  const handleNewAppointment = () => {
    if (onNewAppointment) {
      onNewAppointment()
    } else {
      console.log("Nouveau rendez-vous")
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <div className="lg:order-2 w-full lg:w-[350px] min-h-[400px] lg:min-h-0">
          <CalendarSidebarClient
            selectedDate={selectedDate}
            appointments={getSelectedDayEvents()}
            onNewAppointment={handleNewAppointment}
          />
        </div>
        <div className="lg:order-1 flex-1 min-h-0 overflow-hidden">
          {viewMode === "month" ? (
            <CalendarGrid
              appointments={appointments}
              onDateSelect={setSelectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          ) : viewMode === "week" ? (
            <WeekView
              appointments={appointments}
              onDateSelect={setSelectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          ) : (
            <WeekView
              appointments={appointments.filter(apt => {
                if (!selectedDate || !apt.slot?.start) return false
                const aptDate = new Date(apt.slot.start)
                return aptDate.toDateString() === selectedDate.toDateString()
              })}
              onDateSelect={setSelectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          )}
        </div>
      </div>
    </div>
  )
}
