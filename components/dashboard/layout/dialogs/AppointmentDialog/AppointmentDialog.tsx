"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CalendarIcon, CheckIcon, StethoscopeIcon, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { createAppointmentAction } from "@/src/actions/create-appointment.action"
import { cn } from "@/src/lib/utils"

import { useStepper, utils } from "./appointmentDialogStepper"
import ClientStep from "./client-step"
import ConfirmationStep from "./confirmation-step"
import DateStep from "./date-step"
import ServiceStep from "./service-step"

interface AppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Schéma de validation pour le formulaire
const appointmentFormSchema = z.object({
  clientId: z.string({
    required_error: "Veuillez sélectionner un client",
  }),
  patientId: z.string({
    required_error: "Veuillez sélectionner un patient",
  }),
  serviceId: z.string({
    required_error: "Veuillez sélectionner un service",
  }),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  startTime: z.string({
    required_error: "Veuillez sélectionner une heure de début",
  }),
  duration: z
    .number({
      required_error: "Veuillez indiquer une durée",
    })
    .min(15, "La durée minimum est de 15 minutes"),
  atHome: z.boolean().default(false),
  notes: z.string().optional(),
})

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

const AppointmentDialog = ({ open, onOpenChange }: AppointmentDialogProps) => {
  // Initialiser le formulaire avec hook-form et validation zod
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      atHome: false,
      duration: 30,
      notes: "",
    },
    mode: "onChange",
  })

  // Configuration du stepper
  const { next, goTo, prev, current, reset, switch: switchStep } = useStepper()
  const currentIndex = utils.getIndex(current.id)

  // Définition des étapes avec leurs icônes
  const steps = [
    { id: "client", label: "Client", icon: <UserIcon className="h-5 w-5" /> },
    {
      id: "service",
      label: "Service",
      icon: <StethoscopeIcon className="h-5 w-5" />,
    },
    { id: "date", label: "Date", icon: <CalendarIcon className="h-5 w-5" /> },
    {
      id: "confirmation",
      label: "Confirmation",
      icon: <CheckIcon className="h-5 w-5" />,
    },
  ]

  // Mutation pour créer un rendez-vous en utilisant l'action serveur
  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormValues & { beginAt: Date; endAt: Date }) => {
      const result = await createAppointmentAction(data)
      return result
    },
    onSuccess: () => {
      // Réinitialiser le formulaire et fermer la modal
      form.reset()
      goTo("client")
      onOpenChange(false)
      toast.success("Rendez-vous créé avec succès !")
    },
    onError: error => {
      console.error("Erreur lors de la création du rendez-vous:", error)
      toast.error("Erreur lors de la création du rendez-vous. Veuillez réessayer.")
    },
  })

  // Gérer la soumission du formulaire
  const onSubmit = (data: AppointmentFormValues) => {
    // Calculer l'heure de début en ajoutant la durée à l'heure de début
    const [hours, minutes] = data.startTime.split(":").map(Number)
    const startDate = new Date(data.date)
    startDate.setHours(hours, minutes)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + data.duration)

    // Préparer les données complètes pour l'envoi
    const appointmentData = {
      ...data,
      beginAt: startDate,
      endAt: endDate,
    }

    // Lancer la mutation pour créer le rendez-vous
    createAppointmentMutation.mutate(appointmentData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nouveau rendez-vous</DialogTitle>
          <DialogDescription>
            {currentIndex === 0 && "Sélectionnez le client et son animal"}
            {currentIndex === 1 && "Choisissez le service et précisez sa durée"}
            {currentIndex === 2 && "Sélectionnez la date et l'heure du rendez-vous"}
            {currentIndex === 3 && "Ajoutez des options et confirmez le rendez-vous"}
          </DialogDescription>
        </DialogHeader>

        {/* Indicateur de progression */}
        <div className="mb-6 pt-2">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center"
                onClick={() => index <= currentIndex && goTo(step.id as "client" | "service" | "date" | "confirmation")}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    index < currentIndex
                      ? "bg-primary text-primary-foreground"
                      : index === currentIndex
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground",
                    index <= currentIndex ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                >
                  {step.icon}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 font-medium",
                    index <= currentIndex ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-full mt-5">
            <div className="absolute top-0 left-0 h-1 bg-muted rounded-full w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {switchStep({
                  client: () => <ClientStep />,
                  service: () => <ServiceStep />,
                  date: () => <DateStep />,
                  confirmation: () => <ConfirmationStep />,
                })}
              </CardContent>
            </Card>

            {/* Navigation et boutons de contrôle */}
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={currentIndex === 0 ? () => onOpenChange(false) : prev}
                className="min-w-[100px]"
              >
                {currentIndex === 0 ? "Annuler" : "Précédent"}
              </Button>

              {currentIndex < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={next}
                  className="min-w-[100px]"
                  disabled={
                    currentIndex === 0
                      ? !form.watch("clientId") || !form.watch("patientId")
                      : currentIndex === 1
                        ? !form.watch("serviceId")
                        : currentIndex === 2
                          ? !form.watch("date") || !form.watch("startTime")
                          : false
                  }
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[160px]"
                  disabled={createAppointmentMutation.isPending || !form.formState.isValid}
                >
                  {createAppointmentMutation.isPending ? "Création en cours..." : "Créer le rendez-vous"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentDialog
