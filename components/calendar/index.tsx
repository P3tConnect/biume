"use client"

import { Appointment } from "@/src/db/appointments"
import { CalendarGrid } from "./components/calendar-grid"
import { CalendarSidebar } from "./components/calendar-sidebar"
import { ViewMode } from "@/src/types/view-mode"
import { WeekView } from "./components/week-view"
import { useState } from "react"

interface CalendarViewProps {
  className?: string
  appointments?: Appointment[]
}

export function CalendarView({ className, appointments = [] }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())

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
        <div className="w-full lg:w-[350px] min-h-[400px] lg:min-h-0">
          <CalendarSidebar selectedDate={selectedDate} appointments={getSelectedDayEvents()} />
        </div>
      </div>
    </div>
  )
}
