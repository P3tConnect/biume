import { motion, AnimatePresence } from "framer-motion"
import { format, addHours, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/src/lib/utils"
import { Appointment } from "@/src/db/appointments"
import { TimeGridCell } from "./time-grid-cell"
import { AppointmentItem } from "./appointment-item"
import { groupAppointmentsByTimeSlot } from "../utils"

interface DayColumnProps {
  date: Date
  hours: number[]
  appointments: Appointment[]
  onDateSelect: (date: Date) => void
  onNewAppointment: (date: Date) => void
  getAppointmentStatus: (appointment: Appointment) => { color: string; label: string }
  getAppointmentPosition: (appointment: Appointment) => { top: string; height: string } | null
  onAppointmentClick: (appointment: Appointment) => void
}

export function DayColumn({
  date,
  hours,
  appointments,
  onDateSelect,
  onNewAppointment,
  getAppointmentStatus,
  getAppointmentPosition,
  onAppointmentClick,
}: DayColumnProps) {
  const groupedAppointments = groupAppointmentsByTimeSlot(appointments)

  return (
    <motion.div
      className="flex-1 min-w-[200px]"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* En-tête du jour */}
      <div className="flex flex-col h-full">
        {/* Header avec la date */}
        <div className="sticky top-0 bg-background z-50 pb-2">
          <div className={cn("h-12 border-b border-r border-border px-2 py-1", "sticky top-0 bg-background z-10")}>
            <div className="font-medium">{format(date, "EEEE", { locale: fr })}</div>
            <div className="text-sm text-muted-foreground">{format(date, "d MMM", { locale: fr })}</div>
          </div>
        </div>

        {/* Conteneur des rendez-vous */}
        <div className="relative">
          {/* Grille des heures */}
          {hours.map(hour => (
            <TimeGridCell
              key={hour}
              onDateSelect={() => onDateSelect(addHours(startOfDay(date), hour))}
              onAddClick={e => {
                e.stopPropagation()
                onNewAppointment(addHours(startOfDay(date), hour))
              }}
            />
          ))}

          {/* Rendez-vous */}
          <AnimatePresence>
            {groupedAppointments.map(group => {
              const mainAppointment = group[0]
              const position = getAppointmentPosition(mainAppointment)
              if (!position) return null

              return (
                <AppointmentItem
                  key={mainAppointment.slot.id}
                  appointment={mainAppointment}
                  position={position}
                  status={getAppointmentStatus(mainAppointment)}
                  onClick={() => onAppointmentClick(mainAppointment)}
                  isGroup={group.length > 1}
                  totalPets={group.reduce((total, apt) => total + (apt.pets?.length || 0), 0)}
                  relatedAppointments={group}
                />
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
