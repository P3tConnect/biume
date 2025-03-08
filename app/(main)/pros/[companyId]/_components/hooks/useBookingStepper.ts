import { defineStepper } from "@stepperize/react";
import { z } from "zod";

const petSchema = z.object({
  petId: z.string(),
});

const consultationTypeSchema = z.object({
  isHomeVisit: z.boolean(),
});

const optionsSchema = z.object({
  selectedOptions: z.array(z.string()).default([]),
});

const summarySchema = z.object({
  additionalInfo: z.string().optional(),
});

export type StepId = "pet" | "consultationType" | "options" | "summary";

export const { steps, useStepper, utils } = defineStepper(
  {
    id: "pet" as const,
    title: "Animal",
    description: "Choisissez l'animal pour la consultation",
    schema: petSchema,
  },
  {
    id: "consultationType" as const,
    title: "Type de consultation",
    description: "Choisissez le type de consultation",
    schema: consultationTypeSchema,
  },
  {
    id: "options" as const,
    title: "Options",
    description: "Sélectionnez des options supplémentaires",
    schema: optionsSchema,
  },
  {
    id: "summary" as const,
    title: "Récapitulatif",
    description: "Vérifiez les détails de votre réservation",
    schema: summarySchema,
  },
);
