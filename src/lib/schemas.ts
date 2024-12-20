import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
