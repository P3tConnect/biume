import { z } from "zod";

export const documentsSchema = z.object({
  documents: z
    .array(z.string().url())
    .min(1, "Veuillez télécharger au moins un document")
    .optional(),
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
});

export type DocumentsFormData = z.infer<typeof documentsSchema>; 