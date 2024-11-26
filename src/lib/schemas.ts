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
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  birthday: z.preprocess((value) => {
    if (typeof value === "string" || value instanceof Date) {
      return new Date(value);
    }
    return value;
  }, z.date().refine((date) => !isNaN(date.getTime()), "Invalid date")),
  imageProfile: z.string().url("Must be a valid URL"),
  phoneNumber: z.string().regex(
      /^[0-9]{10}$/,
      "Phone number must be a valid 10-digit number"
  ),
  zipCode: z.string().regex(/^[0-9]{5}$/, "Zip code must be a valid 5-digit number"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});
