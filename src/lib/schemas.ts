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
  image: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
