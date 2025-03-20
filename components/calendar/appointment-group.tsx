import { Appointment } from "@/src/db/appointments"
import { cn } from "@/src/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllPetsInGroup } from "./utils"
import { Clock, Users, MapPin, Phone, MessageSquare } from "lucide-react"

interface AppointmentGroupProps {
  appointments: Appointment[]
}

export function AppointmentGroup({ appointments }: AppointmentGroupProps) {
  const mainAppointment = appointments[0]
  const allPets = getAllPetsInGroup(appointments)
  const startTime = new Date(mainAppointment.slot.start)
  const endTime = new Date(mainAppointment.slot.end)

  return (
    <Card className="overflow-hidden group transition-all duration-200 hover:shadow-md">
      <div
        className={cn(
          "h-1.5 w-full transition-colors",
          appointments.length > 1
            ? "bg-secondary group-hover:bg-secondary/80"
            : "bg-purple-500 group-hover:bg-purple-400"
        )}
      />
      <div className="p-4 space-y-4">
        {/* En-tête avec l'heure et le nombre de rendez-vous */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "p-1.5 rounded-lg",
                appointments.length > 1
                  ? "bg-secondary/10 text-secondary"
                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100"
              )}
            >
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-medium">
              {startTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {endTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          {appointments.length > 1 && (
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{appointments.length} rendez-vous</span>
            </Badge>
          )}
        </div>

        {/* Liste des rendez-vous */}
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className={cn(
                "flex items-start gap-4 p-3 rounded-xl transition-colors",
                appointments.length > 1 && index !== appointments.length - 1 && "border-b pb-4",
                appointments.length > 1
                  ? "bg-secondary/5 hover:bg-secondary/10"
                  : "bg-purple-50 dark:bg-purple-900/10 hover:bg-purple-100/80 dark:hover:bg-purple-900/20"
              )}
            >
              {/* Avatars des animaux */}
              <div className="flex -space-x-2 shrink-0">
                {appointment.pets?.map(pet => (
                  <Avatar
                    key={pet.pet.id}
                    className={cn(
                      "h-10 w-10 border-2 border-background transition-transform hover:scale-105",
                      appointments.length > 1 ? "ring-1 ring-secondary/20" : "ring-1 ring-purple-500/20"
                    )}
                  >
                    {pet.pet.image ? (
                      <AvatarImage src={pet.pet.image} alt={pet.pet.name} />
                    ) : (
                      <AvatarFallback
                        className={cn(
                          "text-sm font-medium",
                          appointments.length > 1
                            ? "bg-secondary/10 text-secondary"
                            : "bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-100"
                        )}
                      >
                        {pet.pet.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
              </div>

              {/* Informations du rendez-vous */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium truncate">{appointment.client.name}</div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      {appointment.client.phoneNumber && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {appointment.client.phoneNumber}
                        </div>
                      )}
                      {appointment.client.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {appointment.client.address}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={appointments.length > 1 ? "secondary" : "outline"} className="shrink-0">
                    {appointment.service.name}
                  </Badge>
                </div>

                {/* Notes et observations */}
                {appointment.observation?.content && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-background/80">
                    <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="line-clamp-2">{appointment.observation.content}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
