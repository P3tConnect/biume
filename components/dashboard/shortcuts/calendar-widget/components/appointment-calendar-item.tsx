"use client"

import { MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/src/lib/utils"

import { appointmentColors, appointmentLabels } from "../data/constants"
import type { Appointment } from "@/src/db"

// Type pour les clés de couleurs d'appointments
type AppointmentColorKey = keyof typeof appointmentColors
type AppointmentLabelKey = keyof typeof appointmentLabels

// Mappage des types d'appointments vers les types de couleurs et labels
const appointmentTypeToColorKey: Record<"oneToOne" | "multiple", AppointmentColorKey> = {
  oneToOne: "consultation", // Par défaut on utilise consultation pour oneToOne
  multiple: "grooming", // Par défaut on utilise grooming pour multiple
}

interface AppointmentCalendarItemProps {
  appointment: Appointment
}

export function AppointmentCalendarItem({ appointment }: AppointmentCalendarItemProps) {
  // Convertir le type d'appointment en une clé valide pour les couleurs et labels
  const colorKey: AppointmentColorKey = appointmentTypeToColorKey[appointment.type] || "consultation"

  // Les propriétés additionnelles pour le slot (si nécessaire, ajoutez-les à votre type OrganizationSlots)
  const slotLocation = (appointment.slot as any).location
  const slotNotes = (appointment.slot as any).notes

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1 text-[0.7rem] rounded-md px-1.5 py-1 mb-1 cursor-pointer transition-all",
              appointmentColors[colorKey],
              "hover:ring-1 hover:ring-white/20"
            )}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="h-4 w-4">
                <AvatarImage src={appointment.pet.image || ""} alt={appointment.pet.name} />
                <AvatarFallback className="text-[0.55rem]">{appointment.pet.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 truncate font-medium">
              {appointment.slot.start.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="p-0">
          <div className="w-72">
            <div className={cn("flex items-center gap-2 p-3 border-b", appointmentColors[colorKey])}>
              <Avatar className="h-12 w-12 ring-2 ring-white/20">
                <AvatarImage src={appointment.pet.image || ""} alt={appointment.pet.name} />
                <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{appointment.pet.name}</p>
                  <Badge variant={appointment.status === "CONFIRMED" ? "default" : "secondary"} className="capitalize">
                    {appointment.status === "CONFIRMED" ? "Confirmé" : "En attente"}
                  </Badge>
                </div>
                <p className="text-sm text-white/80">{appointment.client.name}</p>
              </div>
            </div>

            <div className="p-3 space-y-3 bg-card">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", appointmentColors[colorKey].replace("bg-", "border-"))}
                  >
                    {appointmentLabels[colorKey]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Horaire</p>
                    <p className="font-medium">{appointment.slot.start.toLocaleTimeString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Durée</p>
                    <p className="font-medium">{appointment.slot.end.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {slotLocation && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{slotLocation}</span>
                </div>
              )}

              {slotNotes && <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">{slotNotes}</div>}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
