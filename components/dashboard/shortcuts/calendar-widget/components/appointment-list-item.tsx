"use client"

import { motion } from "framer-motion"
import { Clock, Info, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/src/lib/utils"

import { appointmentColors, appointmentLabels, statusColors } from "../data/constants"
import type { AppointmentWithRelations } from "../types"

interface AppointmentListItemProps {
  appointment: AppointmentWithRelations
  index: number
  onSelect: () => void
}

export function AppointmentListItem({ appointment, index, onSelect }: AppointmentListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative m-4 rounded-xl border bg-card hover:bg-accent/5 cursor-pointer group"
      onClick={onSelect}
    >
      {/* Bande de statut - Utilisation des couleurs basées sur le statut */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl transition-colors",
          statusColors[appointment.status.toLowerCase() as keyof typeof statusColors]
        )}
      />

      <div className="p-5 pl-6">
        {/* En-tête avec l'heure et le statut */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-base font-medium">
            <Clock className="h-5 w-5 text-primary" />
            <span>
              {appointment.slot?.start.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            <span className="text-muted-foreground">•</span>
            <span>{appointment.service.duration} min</span>
          </div>
          <Badge
            variant="default"
            className={cn(
              "capitalize text-sm px-3 py-1",
              statusColors[appointment.status.toLowerCase() as keyof typeof statusColors]
            )}
          >
            {appointment.status === "CONFIRMED"
              ? "Confirmé"
              : appointment.status === "PENDING PAYMENT"
                ? "En attente"
                : appointment.status === "COMPLETED"
                  ? "Terminé"
                  : appointment.status === "CANCELED"
                    ? "Annulé"
                    : appointment.status}
          </Badge>
        </div>

        {/* Contenu principal */}
        <div className="flex items-center gap-5">
          {/* Informations sur les animaux */}
          <div className="relative flex -space-x-4">
            {appointment.pets.map(({ pet }, index) => (
              <Avatar key={pet.id} className={cn("h-20 w-20 ring-4 ring-background", index > 0 && "ml-4")}>
                <AvatarImage src={pet.image || undefined} alt={pet.name} />
                <AvatarFallback className="text-xl">{pet.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Détails du rendez-vous */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-xl tracking-tight">
                {appointment.pets.map(({ pet }) => pet.name).join(", ")}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  "ml-2 px-2.5 py-0.5 text-sm",
                  statusColors[appointment.status.toLowerCase() as keyof typeof statusColors]
                )}
              >
                {appointment.status}
              </Badge>
            </div>
            <p className="text-base text-muted-foreground">Propriétaire: {appointment.client.name}</p>
            {appointment.atHome && (
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>À domicile</span>
              </div>
            )}
          </div>

          {/* Indicateur de clic */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
