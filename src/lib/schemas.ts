import { laserwave } from "@react-email/components";
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

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  category:
    | "work"
    | "personal"
    | "other"
    | "education"
    | "hobbies"
    | "health"
    | "finance";
}

export interface DayEvents {
  [date: string]: Event[];
}
