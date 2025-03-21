import { Appointment } from "@/src/db/appointments"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Credenza, CredenzaContent, CredenzaTitle } from "@/components/ui/credenza"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/src/lib/utils"
import { Tag, MapPin, Phone, MessageSquare, Euro, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface AppointmentDetailsProps {
  appointments: Appointment[] // Liste de tous les rendez-vous pour ce créneau
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentDetails({ appointments, isOpen, onOpenChange }: AppointmentDetailsProps) {
  if (!appointments.length) return null

  // On prend le premier rendez-vous comme référence pour le créneau
  const mainAppointment = appointments[0]
  if (!mainAppointment.slot?.start || !mainAppointment.slot?.end) return null

  const startTime = new Date(mainAppointment.slot.start)
  const endTime = new Date(mainAppointment.slot.end)
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60)

  // Regrouper tous les participants
  const allParticipants = appointments.flatMap(apt => apt.pets || [])
  const uniqueParticipants = Array.from(
    new Map(allParticipants.map(participant => [participant.pet.id, participant]))
  ).map(([_, participant]) => participant)

  // Regrouper tous les clients
  const allClients = appointments.map(apt => apt.client).filter(Boolean)
  const uniqueClients = Array.from(new Set(allClients.map(client => client?.id)))
    .map(id => allClients.find(client => client?.id === id))
    .filter(Boolean)

  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <CredenzaContent className="p-0 gap-0 max-w-2xl">
        <VisuallyHidden>
          <CredenzaTitle>Fiche rendez-vous</CredenzaTitle>
        </VisuallyHidden>

        {/* En-tête avec image de couverture et informations principales */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm border-border/50"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-32 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur" />
          <div className="absolute -bottom-12 left-6">
            <div className="flex -space-x-3">
              {uniqueParticipants.map(participant => (
                <Avatar key={participant.pet.id} className="h-24 w-24 border-4 border-background shadow-xl">
                  {participant.pet.image ? (
                    <AvatarImage src={participant.pet.image} alt={participant.pet.name} />
                  ) : (
                    <AvatarFallback className="bg-purple-100 text-purple-900 text-xl">
                      {participant.pet.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 right-6">
            <Badge
              variant="outline"
              className={cn(
                "py-2 px-3 text-sm border-2 shadow-sm",
                appointments.length > 1 && "border-secondary bg-secondary/10 text-secondary",
                appointments.length === 1 && {
                  "border-emerald-500/50 bg-emerald-50 text-emerald-600": mainAppointment.status === "CONFIRMED",
                  "border-orange-500/50 bg-orange-50 text-orange-600": mainAppointment.status === "PENDING PAYMENT",
                  "border-red-500/50 bg-red-50 text-red-600": mainAppointment.status === "CANCELED",
                  "border-blue-500/50 bg-blue-50 text-blue-600": mainAppointment.status === "COMPLETED",
                }
              )}
            >
              {appointments.length > 1 ? `${appointments.length} rendez-vous` : mainAppointment.status || "En attente"}
            </Badge>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="pt-16 px-6 pb-6">
          {/* En-tête avec date et heure */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{format(startTime, "EEEE d MMMM yyyy", { locale: fr })}</h2>
            <p className="text-muted-foreground">
              {format(startTime, "HH:mm", { locale: fr })} - {format(endTime, "HH:mm", { locale: fr })}
              <span className="text-sm ml-2">({duration} min)</span>
            </p>
          </div>

          {/* Liste des rendez-vous */}
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={appointment.id}
                className={cn(
                  "p-4 rounded-xl transition-colors",
                  appointments.length > 1
                    ? "bg-secondary/5 hover:bg-secondary/10"
                    : "bg-purple-50 dark:bg-purple-900/10"
                )}
              >
                {/* En-tête avec patients et propriétaire */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    {/* Avatars des animaux */}
                    <div className="flex -space-x-2 shrink-0">
                      {appointment.pets?.map(pet => (
                        <Avatar
                          key={pet.pet.id}
                          className={cn(
                            "h-8 w-8 border-2 border-background",
                            appointments.length > 1 ? "ring-1 ring-secondary/20" : "ring-1 ring-purple-500/20"
                          )}
                        >
                          {pet.pet.image ? (
                            <AvatarImage src={pet.pet.image} alt={pet.pet.name} />
                          ) : (
                            <AvatarFallback
                              className={cn(
                                "text-xs font-medium",
                                appointments.length > 1
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-purple-100 text-purple-900"
                              )}
                            >
                              {pet.pet.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      ))}
                    </div>

                    {/* Noms des patients et propriétaire */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {appointment.pets?.map(pet => pet.pet.name).join(", ")}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{appointment.client?.name}</div>
                    </div>
                  </div>

                  {/* Statut et prix */}
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        appointment.status === "CONFIRMED" && "border-emerald-500/50 bg-emerald-50 text-emerald-600",
                        appointment.status === "PENDING PAYMENT" && "border-orange-500/50 bg-orange-50 text-orange-600",
                        appointment.status === "CANCELED" && "border-red-500/50 bg-red-50 text-red-600",
                        appointment.status === "COMPLETED" && "border-blue-500/50 bg-blue-50 text-blue-600"
                      )}
                    >
                      {appointment.status || "En attente"}
                    </Badge>
                    {appointment.service?.price && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Euro className="h-3.5 w-3.5" />
                        <span>{appointment.service.price}€</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Type de service */}
                {(appointment.type || appointment.service) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{appointment.type || appointment.service?.description}</span>
                  </div>
                )}

                {/* Informations de contact */}
                {appointment.client && (
                  <div className="flex flex-col gap-1.5 text-sm">
                    {appointment.client.phoneNumber && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <a
                          href={`tel:${appointment.client.phoneNumber}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {appointment.client.phoneNumber}
                        </a>
                      </div>
                    )}
                    {appointment.client.address && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{appointment.client.address}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {appointment.observation?.content && (
                  <div className="mt-3 p-2 rounded-lg bg-background/80">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Notes</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.observation.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
