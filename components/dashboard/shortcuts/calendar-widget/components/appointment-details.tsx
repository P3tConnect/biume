"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { appointmentColors, appointmentLabels } from "../data/constants";
import type { Appointment } from "../types";

interface AppointmentDetailsProps {
  appointment: Appointment;
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <div className="p-4 rounded-lg border border-border space-y-3 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{appointment.petName}</h3>
            <Badge
              variant={
                appointment.status === "confirmed" ? "default" : "secondary"
              }
              className="capitalize"
            >
              {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {appointment.ownerName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            appointmentColors[appointment.type].replace("bg-", "border-"),
          )}
        >
          {appointmentLabels[appointment.type]}
        </Badge>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span>{appointment.time}</span>
          <span>•</span>
          <span>{appointment.duration}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="w-full">
          Modifier
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          Annuler
        </Button>
      </div>
    </div>
  );
}
