"use client"

import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils"

import { Appointment } from "@/src/db/appointments"
import { CalendarCell } from "./calendar-cell"
import { CalendarHeader } from "./calendar-header"
import { ViewMode } from "@/src/types/view-mode"
import { cn } from "@/src/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

interface CalendarGridProps {
  appointments: Appointment[]
  onDateSelect: (date: Date) => void
  currentDate: Date
  onDateChange: (date: Date) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function CalendarGrid({
  appointments,
  onDateSelect,
  currentDate,
  onDateChange,
  viewMode,
  onViewModeChange,
}: CalendarGridProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)

  const handlePrevMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleToday = () => {
    const today = new Date()
    onDateChange(today)
    setSelectedDate(today)
    onDateSelect(today)
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
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onPrevious={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
      />

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
    </motion.div>
  )
}
