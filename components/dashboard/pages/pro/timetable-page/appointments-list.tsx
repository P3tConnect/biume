"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";

interface Appointment {
  id: string;
  clientName: string;
  date: Date;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointment: Appointment) => void;
}

export function AppointmentsList({
  appointments,
  onEdit,
  onDelete,
}: AppointmentsListProps) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Heure</TableHead>
          <TableHead>Durée</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.clientName}</TableCell>
            <TableCell>
              {new Intl.DateTimeFormat('fr-FR').format(appointment.date)}
            </TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.duration} min</TableCell>
            <TableCell>
              <Badge className={cn(statusStyles[appointment.status])}>
                {appointment.status === "pending" && "En attente"}
                {appointment.status === "confirmed" && "Confirmé"}
                {appointment.status === "cancelled" && "Annulé"}
              </Badge>
            </TableCell>
            <TableCell>{appointment.notes || "-"}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Ouvrir le menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(appointment)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete?.(appointment)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 