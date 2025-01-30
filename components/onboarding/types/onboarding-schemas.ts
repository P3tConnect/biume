import { CreateOptionSchema } from "@/src/db/options";
import { CompanyTypeEnum, CreateServiceSchema } from "@/src/db";
import { z } from "zod";

export const proInformationsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.string().min(1, { message: "Logo is required" }),
  coverImage: z.string().min(1, { message: "Cover image is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  companyType: CompanyTypeEnum,
  atHome: z.boolean(),
});

export const proServicesSchema = z.object({
  services: z
    .array(CreateServiceSchema)
    .min(1, { message: "Services are required" }),
});

export const proOptionsSchema = z.object({
  options: z
    .array(CreateOptionSchema)
    .min(1, { message: "Options are required" }),
});

export const proDocumentsSchema = z.object({
  siren: z
    .string()
    .min(9, "Le numéro SIREN doit contenir 9 chiffres")
    .max(9, "Le numéro SIREN doit contenir 9 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
  siret: z
    .string()
    .min(14, "Le numéro SIRET doit contenir 14 chiffres")
    .max(14, "Le numéro SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
  documents: z
    .array(z.string().url())
    .min(1, "Veuillez télécharger au moins un document")
    .optional(),
});

export const onboardingSchema = z.object({
  name: z.string().optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  description: z.string().optional(),
  services: z.array(CreateServiceSchema).optional(),
  options: z.array(CreateOptionSchema).optional(),
  siren: z
    .string()
    .min(9, "Le numéro SIREN doit contenir 9 chiffres")
    .max(9, "Le numéro SIREN doit contenir 9 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
  siret: z
    .string()
    .min(14, "Le numéro SIRET doit contenir 14 chiffres")
    .max(14, "Le numéro SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
  documents: z
    .array(z.string().url())
    .min(1, "Veuillez télécharger au moins un document")
    .optional(),
});
