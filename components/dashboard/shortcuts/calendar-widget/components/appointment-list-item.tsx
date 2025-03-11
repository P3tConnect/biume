"use client"

import { motion } from "framer-motion"
import { Clock, Info, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/src/lib/utils"

import { appointmentColors, appointmentLabels, statusColors } from "../data/constants"
import type { Appointment } from "../types"

interface AppointmentListItemProps {
  appointment: Appointment
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
            <span>{appointment.time}</span>
            <span className="text-muted-foreground">•</span>
            <span>{appointment.duration}</span>
          </div>
          <Badge
            variant="default"
            className={cn(
              "capitalize text-sm px-3 py-1",
              statusColors[appointment.status.toLowerCase() as keyof typeof statusColors]
            )}
          >
            {appointment.status === "confirmed"
              ? "Confirmé"
              : appointment.status === "pending"
                ? "En attente"
                : appointment.status === "completed"
                  ? "Terminé"
                  : appointment.status === "cancelled"
                    ? "Annulé"
                    : appointment.status}
          </Badge>
        </div>

        {/* Contenu principal */}
        <div className="flex items-center gap-5">
          {/* Informations sur l'animal */}
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-background">
              <AvatarImage src={appointment.petAvatar} alt={appointment.petName} />
              <AvatarFallback className="text-xl">{appointment.petInitial}</AvatarFallback>
            </Avatar>
          </div>

          {/* Détails du rendez-vous */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-xl tracking-tight">{appointment.petName}</h3>
              <Badge
                variant="outline"
                className={cn(
                  "ml-2 px-2.5 py-0.5 text-sm",
                  appointmentColors[appointment.type].replace("bg-", "border-").replace("text-white", "")
                )}
              >
                {appointmentLabels[appointment.type]}
              </Badge>
            </div>
            <p className="text-base text-muted-foreground">Propriétaire: {appointment.ownerName}</p>
            {appointment.location && (
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{appointment.location}</span>
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
