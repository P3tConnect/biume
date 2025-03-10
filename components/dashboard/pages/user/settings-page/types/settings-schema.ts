import { z } from "zod"

export const clientSettingsSchema = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().min(1, "Votre adresse doit contenie le numéro de votre rue ainsi que le nom de la rue"),
  country: z.string().min(1, "Le pays doit être valide"),
  city: z.string().min(1, "Votre ville doit être valide"),
  zipCode: z.string().min(5, "Votre code postal doit être valide, soit 5 chiffres"),
  phoneNumber: z.string().min(10, "Votre numéro doit comprendre que 10 chiffres"),
  emailNotifications: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
  twoFactorEnabled: z.boolean().default(false).optional(),
})
