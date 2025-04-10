"use client"

import { Calendar, FileText, Plus, Stethoscope, UserPlus, Clock } from "lucide-react"
import { motion } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react"

// Import des composants de dialogue
import AppointmentDialog from "./dialogs/AppointmentDialog/AppointmentDialog"
import { Button } from "@/components/ui/button"
import ClientDialog from "./dialogs/ClientDialog"
import DocumentDialog from "./dialogs/DocumentDialog"

const MotionMenuItem = motion(DropdownMenuItem)

const NewShortcut = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<{
    client: boolean
    appointment: boolean
    patient: boolean
    document: boolean
    message: boolean
    newSlot: boolean
  }>({
    client: false,
    appointment: false,
    patient: false,
    document: false,
    message: false,
    newSlot: false,
  })

  const closeAllDialogs = () => {
    setDialogOpen({
      client: false,
      appointment: false,
      patient: false,
      document: false,
      message: false,
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
          <div className="space-y-2">
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("client")}>
              <UserPlus className="h-4 w-4 text-primary" />
              <span>Client</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("appointment")}>
              <Calendar className="h-4 w-4 text-primary" />
              <span>Rendez-vous</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("newSlot")}>
              <Clock className="h-4 w-4 text-primary" />
              <span>Nouveau créneau</span>
            </MotionMenuItem>
            <MotionMenuItem className="gap-2 cursor-pointer" onClick={() => openDialog("document")}>
              <FileText className="h-4 w-4 text-primary" />
              <span>Document</span>
            </MotionMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Utilisation des composants de dialogue */}
      <ClientDialog open={dialogOpen.client} onOpenChange={open => !open && closeAllDialogs()} />
      <AppointmentDialog open={dialogOpen.appointment} onOpenChange={open => !open && closeAllDialogs()} />
      <DocumentDialog open={dialogOpen.document} onOpenChange={open => !open && closeAllDialogs()} />

      {/* TODO: Implement these dialogs */}
      {/* <NewSlotDialog open={dialogOpen.newSlot} onOpenChange={open => !open && closeAllDialogs()} /> */}
    </>
  )
}

export default NewShortcut
