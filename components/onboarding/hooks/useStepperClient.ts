import { defineStepper } from "@stepperize/react";
import { z } from "zod";

export const { steps, useStepper } = defineStepper(
  {
    id: "start",
    title: "Bienvenue",
    description: "Bienvenue dans l'inscription de votre personnel !",
    schema: z.object({}),
  },
  {
    id: "informations",
    title: "Informations",
    description: "Renseignez les informations personnelles liées a votre compte.",
    schema: z.object({
      image: z.string().optional(),
      address: z.string(),
      city: z.string(),
      country: z.string(),
      zipCode: z.string(),
      phoneNumber: z.string(),
    })
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Ici vous pouvez choisir les services que vous offrez à vos clients.",
    schema: z.object({
      smsNotifications: z.boolean().optional(),
      emailNotifications: z.boolean().optional(),
    })
  },
  {
    id: "complete",
    title: "Complete",
    description: "Vous avez terminé l'inscription, vous pouvez maintenant commencer à utiliser votre compte professionnel !",
    schema: z.object({}),
  }
);