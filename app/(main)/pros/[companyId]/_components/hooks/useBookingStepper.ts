import { defineStepper } from "@stepperize/react"
import { z } from "zod"
import { PetSchema, OptionSchema } from "@/src/db"

// Schéma pour la sélection de service et des options
const serviceAndOptionsSchema = z.object({
  service: z.any().optional(),
  selectedOptions: z.array(OptionSchema).default([]),
})

// Schéma pour la sélection du professionnel
const professionalSchema = z.object({
  professional: z.any().optional(),
})

// Schéma pour la sélection de date
const dateSchema = z.object({
  date: z.date().optional(),
  time: z.string().optional(),
  slotId: z.string().optional(),
  isHomeVisit: z.boolean().optional().default(false),
})

// Schéma pour la sélection d'animal
const petSchema = z.object({
  pet: PetSchema,
})

// Schéma pour le récapitulatif
const summarySchema = z.object({
  additionalInfo: z.string().optional(),
})

// Schéma pour le paiement
const paymentSchema = z.object({
  method: z.enum(["online", "inPerson"]).optional(),
})

// Schéma pour le succès
const successSchema = z.object({})

export type StepId = "serviceAndOptions" | "professional" | "date" | "pet" | "summary" | "payment" | "success"

export const { steps, useStepper, utils } = defineStepper(
  {
    id: "serviceAndOptions" as const,
    title: "Service et options",
    description: "Choisissez le service et les options supplémentaires",
    schema: serviceAndOptionsSchema,
  },
  {
    id: "professional" as const,
    title: "Professionnel",
    description: "Choisissez le professionnel qui vous prendra en charge",
    schema: professionalSchema,
  },
  {
    id: "date" as const,
    title: "Date et heure",
    description: "Sélectionnez la date et l'heure du rendez-vous",
    schema: dateSchema,
  },
  {
    id: "pet" as const,
    title: "Animal",
    description: "Choisissez l'animal",
    schema: petSchema,
  },
  {
    id: "summary" as const,
    title: "Récapitulatif",
    description: "Vérifiez les détails de votre réservation",
    schema: summarySchema,
  },
  {
    id: "payment" as const,
    title: "Paiement",
    description: "Choisissez votre méthode de paiement",
    schema: paymentSchema,
  },
  {
    id: "success" as const,
    title: "Confirmation",
    description: "Votre réservation a été confirmée",
    schema: successSchema,
  }
)
