import { z } from "zod"

export const exceptionalMoveSchema = z.object({
  city: z.string().min(1, "La ville est requise"),
  radius: z.number().min(1, "Le rayon d'action est requis").max(100, "Le rayon d'action ne peut pas dépasser 100km"),
  address: z.string().min(1, "L'adresse est requise"),
  startDate: z.date({ required_error: "La date de début est requise" }),
  endDate: z.date({ required_error: "La date de fin est requise" }),
  startTime: z.string().min(1, "L'heure de début est requise"),
  endTime: z.string().min(1, "L'heure de fin est requise"),
  reason: z.string().min(1, "La raison est requise"),
  notes: z.string().optional(),
})

export type ExceptionalMoveFormValues = z.infer<typeof exceptionalMoveSchema>
