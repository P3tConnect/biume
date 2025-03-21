"use client"

import { useState } from "react"
import { Appointment } from "@/src/db/appointments"
import { CalendarGrid } from "./components/calendar-grid"
import { CalendarSidebar } from "./components/calendar-sidebar"
import { WeekView } from "./components/week-view"
import { Button } from "@/components/ui/button"
import { CalendarDays, CalendarIcon, Calendar as CalendarMonth } from "lucide-react"
import { cn } from "@/src/lib/utils"

type ViewMode = "month" | "week" | "day"

interface CalendarViewProps {
  className?: string
  appointments?: Appointment[]
}

export function CalendarView({ className, appointments = [] }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("month")

  const getSelectedDayEvents = () => {
    if (!selectedDate) return []
    return appointments.filter(appointment => {
      const eventDate = new Date(appointment.slot.start)
      return eventDate.toDateString() === selectedDate.toDateString()
    })
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* En-tête avec sélecteur de vue */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-semibold">Calendrier</h2>
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "month" ? "secondary" : "ghost"}
            size="sm"
            className={cn("h-8", viewMode === "month" ? "bg-background shadow-sm" : "")}
            onClick={() => setViewMode("month")}
          >
            <CalendarMonth className="h-4 w-4 mr-2" />
            Mois
          </Button>
          <Button
            variant={viewMode === "week" ? "secondary" : "ghost"}
            size="sm"
            className={cn("h-8", viewMode === "week" ? "bg-background shadow-sm" : "")}
            onClick={() => setViewMode("week")}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Semaine
          </Button>
          <Button
            variant={viewMode === "day" ? "secondary" : "ghost"}
            size="sm"
            className={cn("h-8", viewMode === "day" ? "bg-background shadow-sm" : "")}
            onClick={() => setViewMode("day")}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Jour
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <div className="flex-1 min-h-0 overflow-hidden">
          {viewMode === "month" ? (
            <CalendarGrid appointments={appointments} onDateSelect={setSelectedDate} />
          ) : viewMode === "week" ? (
            <WeekView appointments={appointments} onDateSelect={setSelectedDate} />
          ) : (
            <WeekView
              appointments={appointments.filter(apt => {
                if (!selectedDate || !apt.slot?.start) return false
                const aptDate = new Date(apt.slot.start)
                return aptDate.toDateString() === selectedDate.toDateString()
              })}
              onDateSelect={setSelectedDate}
            />
          )}
        </div>
        <div className="w-full lg:w-[400px] min-h-[400px] lg:min-h-0">
          <CalendarSidebar selectedDate={selectedDate} appointments={getSelectedDayEvents()} />
        </div>
      </div>
    </div>
  )
}
