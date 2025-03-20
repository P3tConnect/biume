"use client"

import { Clock, Tag } from "lucide-react"
import { Appointment } from "@/src/db/appointments"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AppointmentCardProps {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="rounded-xl border bg-card transition-colors">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-purple-200 dark:border-purple-800">
              {appointment.pets[0]?.pet.image ? (
                <AvatarImage src={appointment.pets[0].pet.image} alt={appointment.pets[0].pet.name} />
              ) : (
                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100">
                  {appointment.pets[0]?.pet.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h4 className="font-semibold text-base">{appointment.pets.map(pet => pet.pet.name).join(", ")}</h4>
              <p className="text-sm text-muted-foreground">{appointment.client.name}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-2">
            {appointment.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {appointment.slot.start.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {appointment.slot.end.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-muted-foreground text-xs">
              Durée : {Math.round((appointment.slot.end.getTime() - appointment.slot.start.getTime()) / 1000 / 60)} min
            </p>
          </div>
        </div>

        {appointment.service && (
          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{appointment.service.name}</p>
              <p className="text-muted-foreground text-xs">{appointment.service.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
