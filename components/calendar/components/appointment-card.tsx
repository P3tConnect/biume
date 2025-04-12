"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Tag } from "lucide-react"

import { Appointment } from "@/src/db/appointments"
import { Badge } from "@/components/ui/badge"

interface AppointmentCardProps {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="rounded-xl border bg-card transition-colors">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 shrink-0 border-2 border-purple-200 dark:border-purple-800">
              {appointment.pets[0]?.pet.image ? (
                <AvatarImage src={appointment.pets[0].pet.image} alt={appointment.pets[0].pet.name} />
              ) : (
                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100">
                  {appointment.pets[0]?.pet.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <h4 className="font-semibold text-base truncate">
                {appointment.pets.map(pet => pet.pet.name).join(", ")}
              </h4>
              <p className="text-sm text-muted-foreground truncate">{appointment.client.name}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-2 shrink-0">
            {appointment.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-medium truncate">
              {appointment.slot.start.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {appointment.slot.end.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              Durée : {Math.round((appointment.slot.end.getTime() - appointment.slot.start.getTime()) / 1000 / 60)} min
            </p>
          </div>
        </div>

        {appointment.service && (
          <div className="flex items-start gap-2 text-sm">
            <Tag className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-medium truncate">{appointment.service.name}</p>
              <p className="text-muted-foreground text-xs line-clamp-2">{appointment.service.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
