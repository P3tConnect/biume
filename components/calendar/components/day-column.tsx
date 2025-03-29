import { AnimatePresence, motion } from "framer-motion"
import { addHours, format, startOfDay } from "date-fns"

import { Appointment } from "@/src/db/appointments"
import { AppointmentItem } from "./appointment-item"
import { TimeGridCell } from "./time-grid-cell"
import { cn } from "@/src/lib/utils"
import { fr } from "date-fns/locale"
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
  const isToday = format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

  return (
    <motion.div
      className="w-full"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-50">
          <div
            className={cn(
              "h-12 border-b border-border px-3",
              "sticky top-0 bg-card/80 backdrop-blur-sm z-10 transition-colors",
              isToday && "bg-accent/10 backdrop-blur-md"
            )}
          >
            <div className="flex h-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="space-y-0.25">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/70">
                    {format(date, "EEEE", { locale: fr })}
                  </div>
                  <div className={cn("text-md font-semibold tracking-tight", isToday && "text-primary")}>
                    {format(date, "d", { locale: fr })}
                  </div>
                </div>
                {isToday && (
                  <div className="flex flex-col items-end">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1 bg-background/50">
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

          <AnimatePresence mode="popLayout">
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
