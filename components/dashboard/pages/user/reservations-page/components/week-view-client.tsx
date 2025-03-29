import { addDays, format, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Appointment } from "@/src/db/appointments"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ViewMode } from "@/src/types/view-mode"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/src/lib/utils"
import { fr } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppointmentDetails } from "@/components/calendar/components/appointment-details"
import { NewAppointmentForm } from "@/components/calendar/components/new-appointment-form"

interface WeekViewPropsClient {
  appointments?: Appointment[]
  onDateSelect?: (date: Date) => void
  onNewAppointment?: (date: Date) => void
  currentDate: Date
  onDateChange: (date: Date) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

// Heures de 00 à 09
const HOURS = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
// On ajoute les heures de 10 à 23
for (let i = 10; i <= 23; i++) {
  HOURS.push(i.toString())
}

export function WeekView({
  appointments = [],
  onDateSelect,
  onNewAppointment,
  currentDate,
  onDateChange,
  viewMode,
  onViewModeChange,
}: WeekViewPropsClient) {
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointmentDate, setNewAppointmentDate] = useState<Date | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate)

  // Filtrer les rendez-vous pour le jour sélectionné
  const selectedDayAppointments = appointments.filter(appointment => {
    if (!appointment.slot?.start) return false
    const appointmentDate = new Date(appointment.slot.start)
    return (
      appointmentDate.getDate() === selectedDay.getDate() &&
      appointmentDate.getMonth() === selectedDay.getMonth() &&
      appointmentDate.getFullYear() === selectedDay.getFullYear()
    )
  })

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Commence le lundi
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }) // Termine le dimanche
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const handlePrevWeek = () => {
    onDateChange(addDays(currentDate, -7))
  }

  const handleNextWeek = () => {
    onDateChange(addDays(currentDate, 7))
  }

  const handleMonthClick = () => {
    onViewModeChange("month")
  }

  const handleWeekClick = () => {
    onViewModeChange("week")
  }

  const handleDayClick = (date: Date) => {
    setSelectedDay(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const handleNewAppointmentClick = () => {
    setNewAppointmentDate(selectedDay)
    setIsNewAppointmentOpen(true)
  }

  const handleNewAppointmentSubmit = (data: any) => {
    if (onNewAppointment && newAppointmentDate) {
      onNewAppointment(newAppointmentDate)
    }
    setIsNewAppointmentOpen(false)
  }

  const formatDay = (date: Date) => {
    return format(date, "d", { locale: fr })
  }

  const formatWeekDay = (date: Date) => {
    return format(date, "EEEE", { locale: fr }).toUpperCase()
  }

  const formatMonth = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: fr })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelectedDay = (date: Date) => {
    return (
      date.getDate() === selectedDay.getDate() &&
      date.getMonth() === selectedDay.getMonth() &&
      date.getFullYear() === selectedDay.getFullYear()
    )
  }

  return (
    <div className="flex flex-row h-full gap-4">
      {/* Vue principale du calendrier */}
      <div className="flex-1 flex flex-col h-full">
        {/* En-tête avec navigation */}
        <div className="flex justify-between items-center px-2 py-3 mb-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2" />
            <h2 className="font-bold text-xl">{formatMonth(currentDate)}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-9 px-3 py-2" onClick={() => onDateChange(new Date())}>
              Aujourd'hui
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "month" ? "secondary" : "ghost"}
                className="rounded-r-none"
                onClick={handleMonthClick}
              >
                Mois
              </Button>
              <Button
                variant={viewMode === "week" ? "secondary" : "ghost"}
                className="rounded-l-none"
                onClick={handleWeekClick}
              >
                Semaine
              </Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grille du calendrier */}
        <Card className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="min-w-[800px]">
              {/* En-tête des jours */}
              <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b sticky top-0 bg-background z-10">
                <div className="p-2 border-r"></div>
                {daysInWeek.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-2 text-center border-r cursor-pointer",
                      isToday(day) && "bg-accent/10",
                      isSelectedDay(day) && "bg-secondary/10"
                    )}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="font-medium uppercase text-xs text-muted-foreground">{formatWeekDay(day)}</div>
                    <div className={cn("font-bold text-lg", isSelectedDay(day) && "text-primary")}>
                      {formatDay(day)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grille des heures */}
              <div className="grid grid-cols-[50px_repeat(7,1fr)]">
                {/* Colonne des heures */}
                <div className="sticky left-0 z-10">
                  {HOURS.map(hour => (
                    <div key={hour} className="h-16 border-b border-r flex items-center justify-center bg-card p-2">
                      <div className="text-xs text-muted-foreground font-semibold">{hour}</div>
                    </div>
                  ))}
                </div>

                {/* Colonnes des jours */}
                {daysInWeek.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn("relative", isSelectedDay(day) && "bg-secondary/5", isToday(day) && "bg-accent/5")}
                  >
                    {HOURS.map(hour => (
                      <div
                        key={hour}
                        className="h-16 border-b border-r relative"
                        onClick={() => handleDayClick(day)}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Modales */}
      <AppointmentDetails appointments={selectedAppointments} isOpen={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      {newAppointmentDate && (
        <NewAppointmentForm
          date={newAppointmentDate}
          isOpen={isNewAppointmentOpen}
          onOpenChange={setIsNewAppointmentOpen}
          onSubmit={handleNewAppointmentSubmit}
        />
      )}
    </div>
  )
}
