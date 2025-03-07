"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Plus,
  UserPlus,
  Stethoscope,
  FileText,
  MessageSquarePlus,
  Calendar,
  Bell,
} from "lucide-react";
import React, { useState } from "react";

// Import des composants de dialogue
import ClientDialog from "./dialogs/ClientDialog";
import AppointmentDialog from "./dialogs/AppointmentDialog/AppointmentDialog";
import PatientDialog from "./dialogs/PatientDialog";
import DocumentDialog from "./dialogs/DocumentDialog";
import MessageDialog from "./dialogs/MessageDialog";
import ReminderDialog from "./dialogs/ReminderDialog";

const NewShortcut = () => {
  const [dialogOpen, setDialogOpen] = useState<{
    client: boolean;
    appointment: boolean;
    patient: boolean;
    document: boolean;
    message: boolean;
    reminder: boolean;
  }>({
    client: false,
    appointment: false,
    patient: false,
    document: false,
    message: false,
    reminder: false,
  });

  const closeAllDialogs = () => {
    setDialogOpen({
      client: false,
      appointment: false,
      patient: false,
      document: false,
      message: false,
      reminder: false,
    });
  };

  const openDialog = (dialogName: keyof typeof dialogOpen) => {
    closeAllDialogs();
    setDialogOpen((prev) => ({ ...prev, [dialogName]: true }));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 text-white transition-all duration-300 shadow-sm bg-[length:200%_100%] bg-no-repeat hover:animate-[gradient_3s_ease-in-out_infinite]"
            size="default"
          >
            <Plus className="h-4 w-4" />
            <p className="font-semibold">Nouveau</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-bold">
            Créer un nouveau...
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => openDialog("client")}
            >
              <UserPlus className="h-4 w-4" />
              <span>Client</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => openDialog("appointment")}
            >
              <Calendar className="h-4 w-4" />
              <span>Rendez-vous</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => openDialog("patient")}
            >
              <Stethoscope className="h-4 w-4" />
              <span>Patient</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => openDialog("document")}
            >
              <FileText className="h-4 w-4" />
              <span>Document</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => openDialog("reminder")}
            >
              <Bell className="h-4 w-4" />
              <span>Rappel</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Utilisation des composants de dialogue */}
      <ClientDialog
        open={dialogOpen.client}
        onOpenChange={(open) => !open && closeAllDialogs()}
      />

      <AppointmentDialog
        open={dialogOpen.appointment}
        onOpenChange={(open) => !open && closeAllDialogs()}
      />

      <PatientDialog
        open={dialogOpen.patient}
        onOpenChange={(open) => !open && closeAllDialogs()}
      />

      <DocumentDialog
        open={dialogOpen.document}
        onOpenChange={(open) => !open && closeAllDialogs()}
      />

      <ReminderDialog
        open={dialogOpen.reminder}
        onOpenChange={(open) => !open && closeAllDialogs()}
      />
    </>
  );
};

export default NewShortcut;
