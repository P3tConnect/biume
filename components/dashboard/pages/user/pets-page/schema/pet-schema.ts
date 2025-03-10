import { z } from "zod"

export const petSchema = z.object({
  name: z.string().min(1, "Le nom de l'animal est requis"),
  image: z.string().optional(),
  breed: z.string().min(1, "La race de l'animal est requise"),
  birthDate: z.date(),
  gender: z.enum(["Male", "Female"]),
  type: z.enum(["Dog", "Cat", "Bird", "Horse", "NAC"]),
  weight: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  description: z.string().optional(),
  furColor: z.string().min(1, "La couleur du pelage est requise"),
  eyeColor: z.string().min(1, "La couleur des yeux est requise"),
  deseases: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  intolerences: z.array(z.string()).optional(),
})
