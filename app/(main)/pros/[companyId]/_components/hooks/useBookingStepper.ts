import { defineStepper } from "@stepperize/react"
import { z } from "zod"

const petSchema = z.object({
  petId: z.string(),
})

const consultationTypeSchema = z.object({
  isHomeVisit: z.boolean(),
})

const optionsSchema = z.object({
  selectedOptions: z.array(z.string()).default([]),
})

const paymentMethodSchema = z.object({
  method: z.enum(["online", "inPerson"]),
})

const summarySchema = z.object({
  additionalInfo: z.string().optional(),
})

export type StepId = "pet" | "consultationType" | "options" | "paymentMethod" | "summary"

export const { steps, useStepper, utils } = defineStepper(
  {
    id: "pet" as const,
    title: "Animal",
    description: "Sélectionnez votre animal",
    schema: petSchema,
  },
  {
    id: "consultationType" as const,
    title: "Type",
    description: "Cabinet ou domicile",
    schema: consultationTypeSchema,
  },
  {
    id: "options" as const,
    title: "Options",
    description: "Services additionnels",
    schema: optionsSchema,
  },
  {
    id: "paymentMethod" as const,
    title: "Paiement",
    description: "Choisissez votre mode de paiement",
    schema: paymentMethodSchema,
  },
  {
    id: "summary" as const,
    title: "Récapitulatif",
    description: "Vérifiez les détails de votre réservation",
    schema: summarySchema,
  }
)
