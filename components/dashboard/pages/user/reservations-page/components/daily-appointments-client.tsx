"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/src/lib/utils"

interface Appointment {
  id: string
  clientName: string
  time: string
  duration: number
  status: "pending" | "confirmed" | "cancelled"
  avatar?: string
  notes?: string
}

interface DailyAppointmentsClientProps {
  appointments: Appointment[]
  selectedDate?: Date
}

export function DailyAppointmentsClient({ appointments, selectedDate }: DailyAppointmentsClientProps) {
  const statusConfig = {
    pending: {
      label: "En attente",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    confirmed: {
      label: "Confirmé",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    cancelled: {
      label: "Annulé",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  }

  return (
    <ScrollArea className="h-[calc(100vh-7rem)]">
      <div className="px-3 py-2">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CalendarIcon className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucun rendez-vous prévu pour{" "}
              {selectedDate ? new Intl.DateTimeFormat("fr-FR").format(selectedDate) : "aujourd'hui"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map(appointment => (
              <div
                key={appointment.id}
                className="group relative flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback className="bg-primary/10">
                        {appointment.clientName
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{appointment.clientName}</p>
                      <div className="mt-1.5 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>
                          {appointment.time} ({appointment.duration} min)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("ml-auto text-xs", statusConfig[appointment.status].className)}>
                    {statusConfig[appointment.status].label}
                  </Badge>
                </div>
                {appointment.notes && (
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{appointment.notes}</p>
                )}
                <div className="absolute right-3 top-3 flex opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Actions buttons could be added here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
