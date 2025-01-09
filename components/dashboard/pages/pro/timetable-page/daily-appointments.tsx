"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";

interface Appointment {
  id: string;
  clientName: string;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "cancelled";
  avatar?: string;
}

interface DailyAppointmentsProps {
  appointments: Appointment[];
  selectedDate?: Date;
}

export function DailyAppointments({
  appointments,
  selectedDate,
}: DailyAppointmentsProps) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <ScrollArea className="h-[calc(100vh-16rem)] w-full">
      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          Aucun rendez-vous prévu pour{" "}
          {selectedDate
            ? new Intl.DateTimeFormat("fr-FR").format(selectedDate)
            : "aujourd'hui"}
        </div>
      ) : (
        <div className="space-y-4 pr-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center space-x-4 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={appointment.avatar} />
                <AvatarFallback>
                  {appointment.clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {appointment.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {appointment.time} ({appointment.duration} min)
                </p>
              </div>
              <Badge className={cn(statusStyles[appointment.status])}>
                {appointment.status === "pending" && "En attente"}
                {appointment.status === "confirmed" && "Confirmé"}
                {appointment.status === "cancelled" && "Annulé"}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
