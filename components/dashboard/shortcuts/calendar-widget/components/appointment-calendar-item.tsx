"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { appointmentColors, appointmentLabels } from "../data/constants";
import type { Appointment } from "../types";

interface AppointmentCalendarItemProps {
  appointment: Appointment;
}

export function AppointmentCalendarItem({
  appointment,
}: AppointmentCalendarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 mb-1 cursor-pointer transition-all",
              appointmentColors[appointment.type],
              "hover:ring-2 hover:ring-white/20",
            )}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={appointment.petAvatar}
                  alt={appointment.petName}
                />
                <AvatarFallback>
                  {appointment.petInitial || appointment.petName[0]}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background",
                  appointment.status === "confirmed"
                    ? "bg-primary"
                    : "bg-secondary",
                )}
              />
            </div>
            <div className="flex-1 truncate">
              <span>{appointment.time}</span>
              <span className="mx-1">•</span>
              <span>{appointment.petName}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="p-0">
          <div className="w-72">
            <div
              className={cn(
                "flex items-center gap-2 p-3 border-b",
                appointmentColors[appointment.type],
              )}
            >
              <Avatar className="h-10 w-10 ring-2 ring-white/20">
                <AvatarImage
                  src={appointment.petAvatar}
                  alt={appointment.petName}
                />
                <AvatarFallback>
                  {appointment.petInitial || appointment.petName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">
                    {appointment.petName}
                  </p>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {appointment.status === "confirmed"
                      ? "Confirmé"
                      : "En attente"}
                  </Badge>
                </div>
                <p className="text-sm text-white/80">{appointment.ownerName}</p>
              </div>
            </div>

            <div className="p-3 space-y-3 bg-card">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      appointmentColors[appointment.type].replace(
                        "bg-",
                        "border-",
                      ),
                    )}
                  >
                    {appointmentLabels[appointment.type]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Horaire</p>
                    <p className="font-medium">{appointment.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Durée</p>
                    <p className="font-medium">{appointment.duration}</p>
                  </div>
                </div>
              </div>

              {appointment.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              )}

              {appointment.notes && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">
                  {appointment.notes}
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
