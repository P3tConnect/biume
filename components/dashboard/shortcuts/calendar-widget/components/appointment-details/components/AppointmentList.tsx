"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User as UserIcon } from "lucide-react"
import type { Appointment } from "@/src/db"
import { getInitials } from "../utils"

interface AppointmentListProps {
  appointments: Appointment[]
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className="mt-2 space-y-2 bg-muted/30 rounded-lg p-3">
      <div className="text-sm text-muted-foreground mb-3">Rendez-vous sur ce créneau :</div>
      <div className="grid gap-2">
        {appointments.map(appointment => (
          <div key={appointment.id} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {appointment.pets?.map(pa => (
                  <Avatar key={pa.pet.id} className="h-7 w-7 border-2 border-background">
                    <AvatarImage src={pa.pet.image || ""} alt={pa.pet.name} />
                    <AvatarFallback>{getInitials(pa.pet.name)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="text-sm font-medium">{appointment.pets?.map(pa => pa.pet.name).join(", ")}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <UserIcon className="h-3 w-3" />
                  {appointment.client?.name}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {appointment.service.name}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
