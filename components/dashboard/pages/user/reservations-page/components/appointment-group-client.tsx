import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, MapPin, MessageSquare, Phone, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import { Appointment } from "@/src/db/appointments"
import { cn } from "@/src/lib/utils"
import { getAllPetsInGroup } from "@/components/calendar/utils"

interface AppointmentGroupProps {
  appointments: Appointment[]
}

export function AppointmentGroupClient({ appointments }: AppointmentGroupProps) {
  const mainAppointment = appointments[0]
  const allPets = getAllPetsInGroup(appointments)
  const startTime = new Date(mainAppointment.slot.start)
  const endTime = new Date(mainAppointment.slot.end)

  return (
    <Card className="relative border-none ring-1 ring-border/50 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Time banner */}
      <div
        className={cn(
          "px-6 py-4 border-b",
          appointments.length > 1 ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-purple-50 dark:bg-purple-950"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-light">
                {startTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
              <div
                className={cn(
                  "h-[2px] w-12 my-2",
                  appointments.length > 1 ? "bg-emerald-400 dark:bg-emerald-400/70" : "bg-purple-300 dark:bg-purple-700"
                )}
              />
              <span className="text-3xl font-light">
                {endTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="space-y-1 border-l-2 border-border/30 pl-6">
              <p className="text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 inline-block mr-2" />
                <span className="capitalize">
                  {startTime.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </p>
              {appointments.length > 1 && (
                <p className="text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5 inline-block mr-2" />
                  {appointments.length} rendez-vous groupés
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-0 bg-white dark:bg-slate-950">
        {appointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className={cn("group relative", index !== appointments.length - 1 && "border-b border-border/50")}
          >
            {/* Hover indicator */}
            <div
              className={cn(
                "absolute left-0 top-0 w-1 h-full opacity-0 transition-all duration-300 group-hover:opacity-100",
                appointments.length > 1 ? "bg-emerald-400 dark:bg-emerald-400/70" : "bg-purple-400 dark:bg-purple-600"
              )}
            />

            <div
              className={cn(
                "px-6 py-5 space-y-6 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/50",
                appointments.length > 1 ? "bg-white dark:bg-slate-950" : "bg-white dark:bg-slate-950"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex items-center -space-x-2">
                    {appointment.pets?.map(pet => (
                      <Avatar
                        key={pet.pet.id}
                        className="w-11 h-11 border-[3px] border-background shadow-md transition-transform duration-200 hover:scale-105 hover:z-10"
                      >
                        {pet.pet.image ? (
                          <AvatarImage src={pet.pet.image} alt={pet.pet.name} />
                        ) : (
                          <AvatarFallback
                            className={cn(
                              "font-medium shadow-inner",
                              appointments.length > 1
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                                : "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                            )}
                          >
                            {pet.pet.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium tracking-tight">
                      {appointment.pets.map(pet => pet.pet.name).join(", ")}
                    </h4>
                    <p className="text-sm text-muted-foreground">{appointment.pro.name}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-full shadow-sm",
                    appointments.length > 1
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                      : "bg-purple-100 dark:bg-purple-900"
                  )}
                >
                  {appointment.service.price || 0}€
                </div>
              </div>

              {/* Contact info */}
              <div className="gap-4 text-sm text-black dark:text-white">
                <div className="flex text-center gap-2 px-3 py-3 items-center w-full rounded-lg bg-purple-100 dark:bg-slate-900">
                  <Mail className="w-4 h-4" />
                  <span>{appointment.pro?.email}</span>
                </div>
              </div>

              {/* <div className="gap-4 text-sm text-black dark:text-white">
                <div className="flex text-center gap-2 px-3 py-3 items-center w-full rounded-lg bg-purple-100 dark:bg-slate-900">
                  <Phone className="w-4 h-4" />
                  <span>{appointment?.pro?.phoneNumber}</span>
                </div>
              </div> */}

              {/* Notes */}
              {appointment.observation?.content && (
                <div
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm shadow-sm",
                    appointments.length > 1
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30"
                      : "bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900/30"
                  )}
                >
                  <div className="flex gap-3">
                    <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="text-muted-foreground">{appointment.observation.content}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
