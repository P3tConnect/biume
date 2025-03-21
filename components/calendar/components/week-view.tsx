import { useState } from "react"
import { Appointment } from "@/src/db/appointments"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, startOfDay, differenceInMinutes } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { TimeColumn } from "./time-column"
import { DayColumn } from "./day-column"
import { AppointmentDetails } from "./appointment-details"
import { NewAppointmentForm } from "./new-appointment-form"

interface WeekViewProps {
  appointments?: Appointment[]
  onDateSelect?: (date: Date) => void
  onNewAppointment?: (date: Date) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const HOUR_HEIGHT = 80 // hauteur d'une cellule en pixels

export function WeekView({ appointments = [], onDateSelect, onNewAppointment }: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointmentDate, setNewAppointmentDate] = useState<Date | null>(null)

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const handlePrevWeek = () => {
    setCurrentDate(prev => addDays(prev, -7))
  }

  const handleNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7))
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
      {/* En-tête avec navigation */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{format(weekStart, "MMMM yyyy", { locale: fr })}</h3>
          <div className="flex items-center gap-1">
            <Button onClick={handlePrevWeek} variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={handleNextWeek} variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Grille du calendrier */}
      <div className="flex flex-1 overflow-hidden border rounded-lg">
        <ScrollArea className="flex-1 h-full">
          <div className="flex min-w-full">
            {/* Colonne des heures */}
            <TimeColumn hours={HOURS} formatHour={formatHour} />

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
    </motion.div>
  )
}
