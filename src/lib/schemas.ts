import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const clientSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  birthday: z.string().date("Invalid date string!" ),
  image: z.string(),
  sexe: z.enum(["Masculin", "Féminin", "Autre"]),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number"),
  zipCode: z
    .string()
    .regex(/^[0-9]{5}$/, "Zip code must be a valid 5-digit number"),
  city: z.string(),
  address: z.string(),
});
