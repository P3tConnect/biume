"use client";

import { motion } from "framer-motion";
import { Clock, Info, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { appointmentColors, appointmentLabels } from "../data/constants";
import type { Appointment } from "../types";

interface AppointmentListItemProps {
  appointment: Appointment;
  index: number;
  onSelect: () => void;
}

export function AppointmentListItem({
  appointment,
  index,
  onSelect,
}: AppointmentListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative m-4 rounded-xl border bg-card hover:bg-accent/5 cursor-pointer group"
      onClick={onSelect}
    >
      {/* Bande de statut */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors",
          appointment.status === "confirmed" ? "bg-primary" : "bg-secondary",
        )}
      />

      <div className="p-4 pl-6">
        {/* En-tête avec l'heure et le statut */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-primary" />
            <span>{appointment.time}</span>
            <span className="text-muted-foreground">•</span>
            <span>{appointment.duration}</span>
          </div>
          <Badge
            variant={
              appointment.status === "confirmed" ? "default" : "secondary"
            }
            className="capitalize"
          >
            {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
          </Badge>
        </div>

        {/* Contenu principal */}
        <div className="flex items-center gap-4">
          {/* Informations sur l'animal */}
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-background">
              <AvatarImage
                src={appointment.petAvatar}
                alt={appointment.petName}
              />
              <AvatarFallback>{appointment.petInitial}</AvatarFallback>
            </Avatar>
          </div>

          {/* Détails du rendez-vous */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg tracking-tight">
                {appointment.petName}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  "ml-2",
                  appointmentColors[appointment.type]
                    .replace("bg-", "border-")
                    .replace("text-white", ""),
                )}
              >
                {appointmentLabels[appointment.type]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Propriétaire: {appointment.ownerName}
            </p>
            {appointment.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{appointment.location}</span>
              </div>
            )}
          </div>

          {/* Indicateur de clic */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
