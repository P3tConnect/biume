"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import type { Appointment } from "@/src/db"

interface AppointmentInfoProps {
  appointment: Appointment
}

export function AppointmentInfo({ appointment }: AppointmentInfoProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {appointment.slot?.start
              ? new Date(appointment.slot.start).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date non définie"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {appointment.slot?.start
              ? new Date(appointment.slot.start).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Horaire non défini"}
          </span>
        </div>
      </div>
      {appointment.pro?.name && (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{appointment.pro.name}</span>
        </div>
      )}
    </div>
  )
}
