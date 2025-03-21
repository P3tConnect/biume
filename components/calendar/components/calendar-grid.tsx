"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib/utils"
import { CalendarDays, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarCell } from "./calendar-cell"
import { Appointment } from "@/src/db/appointments"
import { useState } from "react"
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils"
import { Card } from "../../ui"
import { capitalizeFirstLetter } from "../../dashboard/shortcuts/calendar-widget"

interface CalendarGridProps {
  appointments: Appointment[]
  onDateSelect: (date: Date) => void
}

export function CalendarGrid({ appointments, onDateSelect }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
  }

  const isToday = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString() === new Date().toDateString()
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString() === selectedDate.toDateString()
  }

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6
  }

  const getDayEvents = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return appointments.filter(appointment => {
      if (!appointment.slot?.start) return false
      const eventDate = new Date(appointment.slot.start)
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      )
    })
  }

  const getWeeksInMonth = () => {
    const weeks: number[][] = []
    let currentWeek: number[] = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0)
      }
      weeks.push(currentWeek)
    }

    return weeks
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="mb-4 p-4 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={24} className="text-secondary" />
              <h2 className="text-xl sm:text-2xl font-semibold truncate">
                {capitalizeFirstLetter(
                  currentDate.toLocaleString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })
                )}
              </h2>
            </div>
            <Button
              onClick={() => {
                const today = new Date()
                setCurrentDate(today)
                setSelectedDate(today)
                onDateSelect(today)
              }}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 text-secondary hover:text-secondary-foreground"
            >
              <CalendarDays className="h-4 w-4" />
              Aujourd'hui
            </Button>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <Button
              onClick={() => {
                const today = new Date()
                setCurrentDate(today)
                setSelectedDate(today)
                onDateSelect(today)
              }}
              variant="outline"
              size="sm"
              className="sm:hidden flex items-center gap-2 text-secondary hover:text-secondary-foreground flex-1"
            >
              <CalendarDays className="h-4 w-4" />
              Aujourd'hui
            </Button>
            <div className="flex items-center gap-1">
              <Button
                onClick={handlePrevMonth}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-secondary/5 hover:bg-secondary/10 text-secondary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleNextMonth}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-secondary/5 hover:bg-secondary/10 text-secondary transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-2xl border bg-card text-card-foreground shadow-sm flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-7 p-4 pb-2">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(day => (
            <div
              key={day}
              className={cn(
                "text-center font-medium text-xs sm:text-sm p-1",
                day === "Dim" || day === "Sam" ? "text-red-500" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-rows-[repeat(6,1fr)] gap-1 sm:gap-2 p-2 sm:p-4 pt-2 min-h-0 overflow-y-auto">
          {getWeeksInMonth().map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 sm:gap-2 h-full">
              {week.map((day, dayIndex) => (
                <CalendarCell
                  key={`${weekIndex}-${dayIndex}`}
                  day={day}
                  isToday={isToday(day)}
                  isSelected={isSelected(day)}
                  isWeekend={isWeekend(dayIndex)}
                  appointments={getDayEvents(day)}
                  onClick={() => {
                    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                    setSelectedDate(newDate)
                    onDateSelect(newDate)
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
