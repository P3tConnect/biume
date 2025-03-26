"use client"

import { Bell, Calendar, Clock, FileText, MapPin, Plus, Stethoscope, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react"

// Import des composants de dialogue
import AppointmentDialog from "./dialogs/AppointmentDialog/AppointmentDialog"
import { Button } from "@/components/ui/button"
import ClientDialog from "./dialogs/ClientDialog"
import DocumentDialog from "./dialogs/DocumentDialog"
import { ExceptionalMoveDialog } from "./dialogs/ExceptionalMoveDialog"
import PatientDialog from "./dialogs/PatientDialog"
import ReminderDialog from "./dialogs/ReminderDialog"
import { motion } from "framer-motion"

const MotionMenuItem = motion(DropdownMenuItem)

const NewShortcut = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<{
    client: boolean
    appointment: boolean
    patient: boolean
    document: boolean
    message: boolean
    reminder: boolean
    exceptionalMove: boolean
    newSlot: boolean
  }>({
    client: false,
    appointment: false,
    patient: false,
    document: false,
    message: false,
    reminder: false,
    exceptionalMove: false,
    newSlot: false,
  })

  const closeAllDialogs = () => {
    setDialogOpen({
      client: false,
      appointment: false,
      patient: false,
      document: false,
      message: false,
      reminder: false,
      exceptionalMove: false,
      newSlot: false,
    })
  }

  const openDialog = (dialogName: keyof typeof dialogOpen) => {
    closeAllDialogs()
    setDialogOpen(prev => ({ ...prev, [dialogName]: true }))
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:animate-gradient bg-[length:200%_100%] text-primary-foreground"
            size="default"
          >
            <motion.div
              animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Plus className="h-4 w-4" />
            </motion.div>
            <span className="font-medium">Nouveau</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-2">
          <DropdownMenuLabel className="font-semibold px-2">Créer nouveau...</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className="space-y-2">
            <DropdownMenuLabel className="px-2 text-sm font-medium text-muted-foreground">
              Propriétaires & Animaux
            </DropdownMenuLabel>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("client")}>
              <UserPlus className="h-4 w-4 text-primary" />
              <span>Client</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("patient")}>
              <Stethoscope className="h-4 w-4 text-primary" />
              <span>Patient</span>
            </MotionMenuItem>
          </div>

          <DropdownMenuSeparator className="my-2" />

          <div className="space-y-2">
            <DropdownMenuLabel className="px-2 text-sm font-medium text-muted-foreground">Agenda</DropdownMenuLabel>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("appointment")}>
              <Calendar className="h-4 w-4 text-primary" />
              <span>Rendez-vous</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("newSlot")}>
              <Clock className="h-4 w-4 text-primary" />
              <span>Nouveau créneau</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("exceptionalMove")}>
              <MapPin className="h-4 w-4 text-primary" />
              <span>Déplacement exceptionnel</span>
            </MotionMenuItem>
          </div>

          <DropdownMenuSeparator className="my-2" />

          <div className="space-y-2">
            <DropdownMenuLabel className="px-2 text-sm font-medium text-muted-foreground">Autres</DropdownMenuLabel>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("document")}>
              <FileText className="h-4 w-4 text-primary" />
              <span>Document</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("reminder")}>
              <Bell className="h-4 w-4 text-primary" />
              <span>Rappel</span>
            </MotionMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Utilisation des composants de dialogue */}
      <ClientDialog open={dialogOpen.client} onOpenChange={open => !open && closeAllDialogs()} />
      <AppointmentDialog open={dialogOpen.appointment} onOpenChange={open => !open && closeAllDialogs()} />
      <PatientDialog open={dialogOpen.patient} onOpenChange={open => !open && closeAllDialogs()} />
      <DocumentDialog open={dialogOpen.document} onOpenChange={open => !open && closeAllDialogs()} />
      <ReminderDialog open={dialogOpen.reminder} onOpenChange={open => !open && closeAllDialogs()} />
      <ExceptionalMoveDialog open={dialogOpen.exceptionalMove} onOpenChange={open => !open && closeAllDialogs()} />

      {/* TODO: Implement these dialogs */}
      {/* <NewSlotDialog open={dialogOpen.newSlot} onOpenChange={open => !open && closeAllDialogs()} /> */}
    </>
  )
}

export default NewShortcut
