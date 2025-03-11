"use client"

import {
  CalendarIcon,
  CatIcon,
  CheckIcon,
  ClockIcon,
  DogIcon,
  UserCircle2Icon,
  XIcon,
  CreditCardIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/src/lib/utils"
import { confirmAppointment, denyAppointment } from "@/src/actions/appointments.action"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Appointment } from "@/src/db"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Utilisons any temporairement pour éviter les problèmes de typage
// avec la vraie structure de données
type AppointmentRequestItemProps = {
  appointment: Appointment
}

export const AppointmentRequestItem = ({ appointment }: AppointmentRequestItemProps) => {
  const queryClient = useQueryClient()
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false)
  const [denyReason, setDenyReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: confirmAppointmentMutation } = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => {
      toast.success("Rendez-vous confirmé avec succès")
      queryClient.invalidateQueries({
        queryKey: ["pending-and-payed-appointments", "confirmed-and-above-appointments"],
      })
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la confirmation")
    },
  })

  const { mutateAsync: denyAppointmentMutation } = useMutation({
    mutationFn: denyAppointment,
    onSuccess: () => {
      toast.success("Rendez-vous refusé avec succès")
      queryClient.invalidateQueries({
        queryKey: ["pending-and-payed-appointments", "confirmed-and-above-appointments"],
      })
    },
    onError: () => {
      toast.error("Une erreur est survenue lors du refus")
    },
  })

  const handleConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      setIsLoading(true)
      await confirmAppointmentMutation({ appointmentId: appointment.id })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDenyModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDenyModalOpen(true)
  }

  const handleDeny = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!denyReason.trim()) {
      toast.error("Veuillez saisir une raison de refus")
      return
    }

    try {
      setIsLoading(true)
      await denyAppointmentMutation({ appointmentId: appointment.id, deniedReason: denyReason })
      setIsDenyModalOpen(false)
      setDenyReason("")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        onClick={() => console.log(`Voir détails de ${appointment.pet?.name}`)}
        className={cn(
          "group relative rounded-xl p-3 transition-all hover:scale-[1.01] cursor-pointer border",
          "border-green-100 dark:border-green-900/30 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80"
        )}
      >
        {/* Indicateur d'urgence */}
        {/* {appointment.urgent && (
          <div className="absolute -top-2 -right-2">
            <div className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full shadow-sm animate-pulse flex items-center gap-1">
              <AlertTriangleIcon className="h-3 w-3" />
              <span>Urgent</span>
            </div>
          </div>
        )} */}

        <div className="flex items-start gap-4">
          {/* Info de l'animal */}
          <div
            className={cn(
              "p-2.5 rounded-lg flex-shrink-0 flex items-center justify-center",
              "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            )}
          >
            {appointment.pet?.type === "Dog" ? <DogIcon className="h-4 w-4" /> : <CatIcon className="h-4 w-4" />}
          </div>

          {/* Détails de la demande */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-base">
                {appointment.pet?.name}
                <span className="text-sm font-normal text-muted-foreground ml-1">({appointment.pet?.type})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-1.5 text-sm">
                <span>{appointment.service?.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span className={appointment.status === "SCHEDULED" ? "" : ""}>
                  {appointment.slot?.start?.toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <UserCircle2Icon className="h-4 w-4" />
                <span>{appointment.client?.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Aujourd&apos;hui</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                <span className={appointment.status === "SCHEDULED" ? "text-yellow-600" : "text-green-600"}>
                  {appointment.status === "SCHEDULED" ? "Paiement sur place" : "Payé en ligne"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-green-50 hover:bg-green-100 text-green-600 border-green-200 hover:border-green-300 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:border-green-800"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:border-red-800"
              onClick={handleOpenDenyModal}
              disabled={isLoading}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modale de refus */}
      <Dialog open={isDenyModalOpen} onOpenChange={setIsDenyModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Refuser le rendez-vous</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deny-reason">Raison du refus</Label>
              <Textarea
                id="deny-reason"
                value={denyReason}
                onChange={e => setDenyReason(e.target.value)}
                placeholder="Veuillez expliquer la raison du refus..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDenyModalOpen(false)} disabled={isLoading}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeny} disabled={isLoading}>
              {isLoading ? "Traitement en cours..." : "Refuser le rendez-vous"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
