import { addDays, differenceInMinutes, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"

import { Appointment } from "@/src/db/appointments"
import { AppointmentDetails } from "./appointment-details"
import { CalendarHeader } from "./calendar-header"
import { Card } from "@/components/ui/card"
import { DayColumn } from "./day-column"
import { NewAppointmentForm } from "./new-appointment-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TimeColumn } from "./time-column"
import { ViewMode } from "@/src/types/view-mode"
import { motion } from "framer-motion"
import { useState } from "react"

interface WeekViewProps {
  appointments?: Appointment[]
  onDateSelect?: (date: Date) => void
  onNewAppointment?: (date: Date) => void
  currentDate: Date
  onDateChange: (date: Date) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const HOUR_HEIGHT = 80 // hauteur d'une cellule en pixels

export function WeekView({
  appointments = [],
  onDateSelect,
  onNewAppointment,
  currentDate,
  onDateChange,
  viewMode,
  onViewModeChange,
}: WeekViewProps) {
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointmentDate, setNewAppointmentDate] = useState<Date | null>(null)

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const handlePrevWeek = () => {
    onDateChange(addDays(currentDate, -7))
  }

  const handleNextWeek = () => {
    onDateChange(addDays(currentDate, 7))
  }

  const handleToday = () => {
    onDateChange(new Date())
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      if (!appointment.slot?.start) return false
      const appointmentDate = new Date(appointment.slot.start)
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getAppointmentPosition = (appointment: Appointment) => {
    if (!appointment.slot?.start || !appointment.slot?.end) return null

    const start = new Date(appointment.slot.start)
    const end = new Date(appointment.slot.end)

    const minutesFromMidnight = start.getHours() * 60 + start.getMinutes()
    const durationInMinutes = differenceInMinutes(end, start)

    const top = (minutesFromMidnight / 60) * HOUR_HEIGHT
    const height = (durationInMinutes / 60) * HOUR_HEIGHT

    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  const getAppointmentStatus = (appointment: Appointment) => {
    if (!appointment.status) return { color: "gray", label: "En attente" }

    const statusMap: Record<string, { color: string; label: string }> = {
      confirmed: { color: "emerald", label: "Confirmé" },
      pending: { color: "orange", label: "En attente" },
      cancelled: { color: "red", label: "Annulé" },
      completed: { color: "blue", label: "Terminé" },
    }

    return statusMap[appointment.status] || statusMap.pending
  }

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, "0")}:00`
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    // Trouver tous les rendez-vous liés au même créneau
    const relatedAppointments = appointments.filter(apt => apt.slot?.id === appointment.slot?.id)
    setSelectedAppointments(relatedAppointments)
    setIsDetailsOpen(true)
  }

  const handleNewAppointmentClick = (date: Date) => {
    setNewAppointmentDate(date)
    setIsNewAppointmentOpen(true)
  }

  const handleNewAppointmentSubmit = (data: any) => {
    if (onNewAppointment && newAppointmentDate) {
      onNewAppointment(newAppointmentDate)
    }
    setIsNewAppointmentOpen(false)
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
        onPrevious={handlePrevWeek}
        onNext={handleNextWeek}
        onToday={handleToday}
      />

      <Card className="bg-card text-card-foreground shadow-sm flex-1 flex flex-col min-h-0 p-4 rounded-2xl">
        <ScrollArea className="flex-1 h-full">
          <div className="grid grid-cols-[auto_repeat(7,1fr)]">
            {/* Colonne des heures */}
            <div className="sticky left-0 z-10">
              <TimeColumn hours={HOURS} formatHour={formatHour} />
            </div>

            {/* Colonnes des jours */}
            {daysInWeek.map((date, index) => (
              <DayColumn
                key={date.toISOString()}
                date={date}
                hours={HOURS}
                appointments={getAppointmentsForDate(date)}
                onDateSelect={onDateSelect || (() => {})}
                onNewAppointment={handleNewAppointmentClick}
                getAppointmentStatus={getAppointmentStatus}
                getAppointmentPosition={getAppointmentPosition}
                onAppointmentClick={handleAppointmentClick}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>

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
    </motion.div>
  )
}
