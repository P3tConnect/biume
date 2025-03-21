"use client"

import { CalendarDays, Calendar as CalendarIcon } from "lucide-react"
import { Appointment } from "@/src/db/appointments"
import { capitalizeFirstLetter } from "../../dashboard/shortcuts/calendar-widget"
import { groupAppointmentsByTimeSlot } from "../utils"
import { AppointmentGroup } from "./appointment-group"

interface CalendarSidebarProps {
  selectedDate: Date | null
  appointments: Appointment[]
}

export function CalendarSidebar({ selectedDate, appointments }: CalendarSidebarProps) {
  const groupedAppointments = groupAppointmentsByTimeSlot(appointments)

  return (
    <div className="h-full rounded-2xl border bg-card flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
            <CalendarDays className="w-5 h-5 text-purple-900 dark:text-purple-100" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">
              {selectedDate
                ? capitalizeFirstLetter(
                    selectedDate.toLocaleString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  )
                : "Sélectionnez une date"}
            </h3>
            {selectedDate && appointments.length > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {appointments.length} rendez-vous programmé{appointments.length > 1 ? "s" : ""}
                {groupedAppointments.length < appointments.length && ` (${groupedAppointments.length} créneaux)`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          {selectedDate ? (
            appointments.length > 0 ? (
              groupedAppointments
                .sort((a, b) => {
                  const timeA = new Date(a[0].slot.start).getTime()
                  const timeB = new Date(b[0].slot.start).getTime()
                  return timeA - timeB
                })
                .map((group, index) => <AppointmentGroup key={index} appointments={group} />)
            ) : (
              <div className="text-center py-8">
                <div className="p-3 rounded-full bg-muted/30 w-fit mx-auto mb-3">
                  <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Aucun rendez-vous prévu</p>
                <p className="text-sm text-muted-foreground mt-1">Profitez de cette journée tranquille !</p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="p-3 rounded-full bg-muted/30 w-fit mx-auto mb-3">
                <CalendarIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Sélectionnez une date</p>
              <p className="text-sm text-muted-foreground mt-1">Pour voir les rendez-vous programmés</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
