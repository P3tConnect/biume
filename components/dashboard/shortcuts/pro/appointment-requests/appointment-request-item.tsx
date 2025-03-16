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
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  InfoIcon,
  CalendarDaysIcon,
  ClipboardIcon,
  BadgeDollarSignIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/src/lib/utils"
import { confirmAppointment, denyAppointment } from "@/src/actions/appointments.action"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Appointment, User } from "@/src/db"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"

// Utilisons any temporairement pour éviter les problèmes de typage
// avec la vraie structure de données
type AppointmentRequestItemProps = {
  appointment: Appointment
}

export const AppointmentRequestItem = ({ appointment }: AppointmentRequestItemProps) => {
  const queryClient = useQueryClient()
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false)
  const [denyReason, setDenyReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: confirmAppointmentMutation } = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => {
      toast.success("Rendez-vous confirmé avec succès")
      queryClient.invalidateQueries({
        queryKey: ["pending-and-payed-appointments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["confirmed-and-above-appointments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["metrics"],
      })
      queryClient.invalidateQueries({
        queryKey: ["client-upcoming-appointments"],
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
        queryKey: ["pending-and-payed-appointments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["confirmed-and-above-appointments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["metrics"],
      })
      queryClient.invalidateQueries({
        queryKey: ["client-upcoming-appointments"],
      })
    },
    onError: () => {
      toast.error("Une erreur est survenue lors du refus")
    },
  })

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      await confirmAppointmentMutation({ appointmentId: appointment.id })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDenyModal = () => {
    setIsDenyModalOpen(true)
  }

  const handleDeny = async () => {
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

  // Récupérer le premier animal de la liste
  const firstPet = appointment.pets[0]?.pet

  return (
    <>
      <div
        onClick={e => {
          e.stopPropagation()
          setIsSheetOpen(true)
        }}
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
            {firstPet?.type === "Dog" ? <DogIcon className="h-4 w-4" /> : <CatIcon className="h-4 w-4" />}
          </div>

          {/* Détails de la demande */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-base">
                {firstPet?.name}
                <span className="text-sm font-normal text-muted-foreground ml-1">({firstPet?.type})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-1.5 text-sm">
                <span>{appointment.service?.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {appointment.beginAt?.toLocaleString("fr-FR", {
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
              <div className="flex items-center gap-1.5 text-sm">
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                <span className={!appointment.payedOnline ? "text-yellow-600" : "text-green-600"}>
                  {!appointment.payedOnline ? "Paiement sur place" : "Payé en ligne"}
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
              onClick={e => {
                e.stopPropagation()
                handleConfirm()
              }}
              disabled={isLoading}
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:border-red-800"
              onClick={e => {
                e.stopPropagation()
                handleOpenDenyModal()
              }}
              disabled={isLoading}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sheet des détails */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5 text-primary" />
              Détails de la réservation
            </SheetTitle>
            <SheetDescription>Informations complètes sur le rendez-vous</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Section Animal */}
            <Button
              variant="ghost"
              className="w-full p-0 h-auto hover:bg-transparent"
              onClick={() => setIsAnimalCredenzaOpen(true)}
            >
              <div className="w-full flex items-center gap-4 rounded-lg border p-4 hover:border-primary/50 transition-colors">
                <div className={cn("p-3 rounded-full flex-shrink-0", "bg-green-100 dark:bg-green-900/20")}>
                  {firstPet?.type === "Dog" ? (
                    <DogIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <CatIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-base">{firstPet?.name}</p>
                    <span className="text-sm text-muted-foreground">({firstPet?.type})</span>
                  </div>
                  <p className="text-xs text-blue-500 mt-0.5">Voir la fiche complète →</p>
                </div>
              </div>
            </Button>

            {/* Section Client */}
            <Button
              variant="ghost"
              className="w-full p-0 h-auto hover:bg-transparent"
              onClick={() => setIsClientDialogOpen(true)}
            >
              <div className="w-full flex items-center gap-4 rounded-lg border p-4 hover:border-primary/50 transition-colors">
                <div className={cn("p-3 rounded-full flex-shrink-0", "bg-blue-100 dark:bg-blue-900/20")}>
                  <UserCircle2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-base">{appointment.client?.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                      <MailIcon className="h-3.5 w-3.5" />
                      <span>{appointment.client?.email}</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-500 mt-1">Voir le profil complet →</p>
                </div>
              </div>
            </Button>

            {/* Section Rendez-vous */}
            <div className="space-y-3 rounded-lg border p-4">
              <h3 className="flex items-center gap-2 font-medium">
                <ClipboardIcon className="h-4 w-4" />
                Rendez-vous
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Service:</span>
                  <p className="font-medium">{appointment.service?.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Durée:</span>
                  <p className="font-medium">{appointment.service?.duration || "Non spécifiée"} minutes</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date et heure:</span>
                  <p className="font-medium flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {appointment.beginAt?.toLocaleString("fr-FR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prix:</span>
                  <p className="font-medium flex items-center gap-1">
                    <BadgeDollarSignIcon className="h-3 w-3" />
                    {appointment.service?.price || "0"}€
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Paiement:</span>
                  <p className="font-medium flex items-center gap-1">
                    <CreditCardIcon className="h-3 w-3" />
                    {!appointment.payedOnline ? "Paiement sur place" : "Payé en ligne"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Fermer
              </Button>
              <Button variant="default" onClick={handleConfirm} disabled={isLoading}>
                Confirmer
              </Button>
              <Button variant="destructive" onClick={handleOpenDenyModal} disabled={isLoading}>
                Refuser
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dialog du client */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCircle2Icon className="h-5 w-5" />
              Profil du client
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Nom:</span>
                <p className="font-medium">{appointment.client?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{appointment.client?.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Adresse:</span>
                <p className="font-medium">{appointment.client?.address || "Non spécifiée"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Ville:</span>
                <p className="font-medium">{appointment.client?.city || "Non spécifiée"}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClientDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credenza de l'animal */}
      <AnimalCredenza
        isOpen={isAnimalCredenzaOpen}
        onOpenChange={setIsAnimalCredenzaOpen}
        petId={firstPet?.id!}
      />

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
