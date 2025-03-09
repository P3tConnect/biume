"use server";

import { resend } from "@/src/lib/resend";
import ContactEmail from "@/emails/ContactEmail";
import { z } from "zod";

// Schéma de validation pour les données du formulaire
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  subject: z.string().min(1, { message: "Le sujet est requis" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Validation des données
    const validatedData = contactFormSchema.parse(formData);
    
    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: "Biume <contact@biume.com>",
      to: ["mathchambaud@icloud.com", "graig.kolodziejczyk@icloud.com"], // Remplacez par l'adresse email de destination
      subject: `Nouveau contact : ${validatedData.subject}`,
      react: ContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        subject: validatedData.subject,
      }),
    });

    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return { success: false, error: "Erreur lors de l'envoi de l'email" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Erreur dans sendContactEmail:", error);
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Données invalides", 
        validationErrors: error.errors 
      };
    }
    
    return { success: false, error: "Une erreur est survenue" };
  }
} 