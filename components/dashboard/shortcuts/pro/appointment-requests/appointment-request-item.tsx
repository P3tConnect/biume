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
  MailIcon,
  CalendarDaysIcon,
  ClipboardIcon,
  BadgeDollarSignIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/src/lib/utils"
import { confirmAppointment, denyAppointment } from "@/src/actions/appointments.action"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Appointment } from "@/src/db"
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
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const { mutateAsync: confirmAppointmentMutation } = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => {
      toast.success("Rendez-vous confirmé !")
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
      toast.success("Rendez-vous refusé !")
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

  return (
    <>
      <div
        onClick={e => {
          e.stopPropagation()
          setIsSheetOpen(true)
        }}
        className={cn(
          "group relative rounded-lg transition-all hover:scale-[1.01] cursor-pointer",
          "bg-blue-50/80 dark:bg-blue-950/20 hover:bg-blue-100/80 dark:hover:bg-blue-950/30",
          "border border-blue-100 dark:border-blue-900/50",
          "shadow-[0_2px_4px_rgba(96,165,250,0.03)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        )}
      >
        <div className="p-3">
          {/* En-tête avec le service et le statut de paiement */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 dark:bg-blue-500"></div>
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{appointment.service?.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <CreditCardIcon className="h-3 w-3" />
              <span
                className={cn(
                  !appointment.payedOnline
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-emerald-500 dark:text-emerald-400",
                  "font-medium"
                )}
              >
                {!appointment.payedOnline ? "À payer" : "Payé"}
              </span>
            </div>
          </div>

          {/* Informations principales */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Animaux */}
              <div className="flex items-center gap-1 mb-1.5">
                {appointment.pets.map((petData, index) => (
                  <div
                    key={petData.pet.id}
                    className="inline-flex items-center bg-slate-50 dark:bg-slate-800 rounded-full pl-1 pr-2 py-0.5"
                  >
                    {petData.pet.type === "Dog" ? (
                      <DogIcon className="h-3 w-3 text-slate-500 mr-1" />
                    ) : (
                      <CatIcon className="h-3 w-3 text-slate-500 mr-1" />
                    )}
                    <span className="text-xs">{petData.pet.name}</span>
                  </div>
                ))}
              </div>

              {/* Client */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <UserCircle2Icon className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-sm">{appointment.client?.name}</span>
              </div>

              {/* Date et heure */}
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>
                    {appointment.slot.start.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>
                    {appointment.slot.start.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full",
                  "bg-emerald-50 text-emerald-600 hover:text-emerald-50 hover:bg-emerald-600",
                  "dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-emerald-50",
                  "transition-colors duration-200"
                )}
                onClick={e => {
                  e.stopPropagation()
                  handleConfirm()
                }}
                disabled={isLoading}
              >
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Confirmer</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full",
                  "bg-red-50 text-red-600 hover:text-red-50 hover:bg-red-600",
                  "dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-red-50",
                  "transition-colors duration-200"
                )}
                onClick={e => {
                  e.stopPropagation()
                  handleOpenDenyModal()
                }}
                disabled={isLoading}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Refuser</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog des détails */}
      <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5 text-primary" />
              Détails de la réservation
            </DialogTitle>
            <DialogDescription>Informations complètes sur le rendez-vous</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6 max-h-[calc(80vh-200px)] overflow-y-auto pr-2">
            {/* Section Animaux */}
            <div className="space-y-3">
              {appointment.pets.map(petData => (
                <Button
                  key={petData.pet.id}
                  variant="ghost"
                  className="w-full p-0 h-auto hover:bg-transparent"
                  onClick={() => {
                    setIsAnimalCredenzaOpen(true)
                    setSelectedPetId(petData.pet.id)
                  }}
                >
                  <div className="w-full flex items-center gap-4 rounded-lg border p-4 hover:border-primary/50 transition-colors">
                    <div className={cn("p-3 rounded-full flex-shrink-0", "bg-green-100 dark:bg-green-900/20")}>
                      {petData.pet.type === "Dog" ? (
                        <DogIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <CatIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-base">{petData.pet.name}</p>
                        <span className="text-sm text-muted-foreground">({petData.pet.type})</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-0.5">Voir la fiche complète →</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

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
                    {appointment.slot.start.toLocaleString("fr-FR", {
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
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Fermer
            </Button>
            <Button variant="default" onClick={handleConfirm} disabled={isLoading}>
              Confirmer
            </Button>
            <Button variant="destructive" onClick={handleOpenDenyModal} disabled={isLoading}>
              Refuser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
      {selectedPetId && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}

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
