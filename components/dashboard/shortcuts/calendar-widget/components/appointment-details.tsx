"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib/utils"

import { appointmentColors, appointmentLabels } from "../data/constants"
import type { Appointment } from "../types"

interface AppointmentDetailsProps {
  appointment: Appointment
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <div className="p-5 rounded-lg border border-border space-y-4 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{appointment.petName}</h3>
            <Badge
              variant={appointment.status === "confirmed" ? "default" : "secondary"}
              className="capitalize text-sm px-2.5 py-0.5"
            >
              {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
            </Badge>
          </div>
          <p className="text-base text-muted-foreground">{appointment.ownerName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-base">
        <Badge
          variant="outline"
          className={cn("text-sm px-2.5 py-0.5", appointmentColors[appointment.type].replace("bg-", "border-"))}
        >
          {appointmentLabels[appointment.type]}
        </Badge>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{appointment.time}</span>
          <span>•</span>
          <span>{appointment.duration}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <Button variant="outline" size="default" className="w-full">
          Modifier
        </Button>
        <Button variant="outline" size="default" className="w-full">
          Annuler
        </Button>
      </div>
    </div>
  )
}
