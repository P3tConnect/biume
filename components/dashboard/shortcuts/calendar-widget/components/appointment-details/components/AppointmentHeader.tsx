"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { appointmentColors, statusColors } from "../constants"
import { getColorKey, getInitials } from "../utils"
import type { Appointment, Pet } from "@/src/db"

interface AppointmentHeaderProps {
  mainAppointment: Appointment
  allPets: Pet[]
  totalInSlot: number
  onViewPetDetails: (petId: string) => void
}

export function AppointmentHeader({ mainAppointment, allPets, totalInSlot, onViewPetDetails }: AppointmentHeaderProps) {
  // Rendu du badge de statut
  const renderStatusBadge = (status: string) => {
    let label = "Statut inconnu"

    switch (status) {
      case "CONFIRMED":
        label = "Confirmé"
        break
      case "SCHEDULED":
      case "PENDING PAYMENT":
        label = "En attente"
        break
      case "COMPLETED":
        label = "Terminé"
        break
      case "CANCELED":
        label = "Annulé"
        break
    }

    return (
      <Badge
        className={cn(
          "capitalize text-xs",
          statusColors[status as keyof typeof statusColors] || statusColors["PENDING PAYMENT"]
        )}
      >
        {label}
      </Badge>
    )
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <div className="flex -space-x-3">
          {allPets.slice(0, 3).map((pet, index) => (
            <button
              key={index}
              onClick={() => onViewPetDetails(pet.id)}
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Avatar
                className={cn(
                  "h-10 w-10 text-white text-xs font-medium border-2 border-background transition-all",
                  appointmentColors[getColorKey(mainAppointment.type)]
                )}
              >
                <AvatarImage src={pet.image || ""} alt={pet.name} />
                <AvatarFallback>{getInitials(pet.name)}</AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-base truncate">{allPets.map(pet => pet.name).join(", ")}</h3>
          {renderStatusBadge(mainAppointment.status)}
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn("text-xs", appointmentColors[getColorKey(mainAppointment.type)].replace("bg-", "border-"))}
            >
              {mainAppointment.service.name}
            </Badge>
            <span className="text-xs">({mainAppointment.service.duration} min)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
