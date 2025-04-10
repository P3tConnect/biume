import { z } from "zod"

export const appointmentSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  date: z.date(),
  time: z.string(),
  duration: z.number(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  notes: z.string().optional(),
  // Informations sur l'animal
  animal: z.object({
    id: z.string(),
    name: z.string(),
    species: z.string(),
    breed: z.string().optional(),
    age: z.number().optional(),
    weight: z.number().optional(),
  }),
  // Informations sur le professionnel
  professional: z.object({
    id: z.string(),
    name: z.string(),
    specialty: z.string(),
    avatar: z.string().optional(),
  }),
  // Type de service
  service: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    duration: z.number(),
    price: z.number(),
  }),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>
