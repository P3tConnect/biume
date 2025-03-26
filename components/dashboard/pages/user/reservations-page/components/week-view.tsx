"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Event } from "@/src/lib"
import { cn } from "@/src/lib/utils"
import { useState } from "react"

interface WeekViewProps {
  selectedDate: Date
  onDayClick: (date: Date) => void
  events: { [date: string]: Event[] }
  className?: string
}

const eventColors = {
  work: "bg-blue-500 text-white",
  personal: "bg-green-500 text-white",
  other: "bg-gray-500 text-white",
  education: "bg-yellow-500 text-black",
  hobbies: "bg-purple-500 text-white",
  health: "bg-red-500 text-white",
  finance: "bg-yellow-400 text-black",
}

export function WeekView({ selectedDate, onDayClick, events, className }: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate)

  // Obtenir le premier jour de la semaine (lundi)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  // Obtenir les jours de la semaine
  const getWeekDays = (start: Date) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekStart = getWeekStart(currentDate)
  const weekDays = getWeekDays(weekStart)

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const getEventsForDay = (date: Date) => {
    return events[date.toDateString()] || []
  }

  const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8h à 20h

  return (
    <div className={cn("h-full w-full", className)}>
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="font-bold text-xl">
          Semaine du{" "}
          {weekStart.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
          })}
        </h2>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrevWeek} variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button onClick={handleNextWeek} variant="ghost" size="icon">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 border-b min-w-[800px]">
          {/* Colonne des heures */}
          <div className="border-r">
            <div className="h-12" /> {/* Espace pour l'en-tête */}
            {hours.map(hour => (
              <div key={hour} className="h-20 border-t px-2 py-1 text-sm text-muted-foreground">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Colonnes des jours */}
          {weekDays.map(date => (
            <div key={date.toISOString()} className="relative">
              {/* En-tête du jour */}
              <div
                className={cn(
                  "h-12 border-r px-2 py-1 text-center",
                  isWeekend(date) && "bg-muted/50",
                  isToday(date) && "bg-primary/5",
                  isSelected(date) && "bg-secondary/5"
                )}
              >
                <div className="font-medium">{date.toLocaleDateString("fr-FR", { weekday: "short" })}</div>
                <div className={cn("text-sm", isToday(date) && "text-primary font-medium")}>{date.getDate()}</div>
              </div>

              {/* Grille horaire */}
              <div className="relative">
                {hours.map(hour => (
                  <div key={hour} className={cn("h-20 border-t border-r", isWeekend(date) && "bg-muted/50")} />
                ))}

                {/* Événements */}
                <div className="absolute inset-0">
                  {getEventsForDay(date).map(event => {
                    const startHour = parseInt(event.startTime.split("T")[1].split(":")[0])
                    const startMinutes = parseInt(event.startTime.split("T")[1].split(":")[1])
                    const endHour = parseInt(event.endTime.split("T")[1].split(":")[0])
                    const endMinutes = parseInt(event.endTime.split("T")[1].split(":")[1])

                    const top = (startHour - 8) * 80 + (startMinutes / 60) * 80
                    const height = (endHour - startHour) * 80 + ((endMinutes - startMinutes) / 60) * 80

                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "absolute left-0 right-1 px-1 py-1 text-xs rounded-md cursor-pointer",
                          eventColors[event.category],
                          "hover:ring-2 hover:ring-secondary/20"
                        )}
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                        }}
                        onClick={() => onDayClick(date)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
