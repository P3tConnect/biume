import { defineStepper } from "@stepperize/react";
import { z } from "zod";

export const { steps, useStepper } = defineStepper(
  {
    id: "informations",
    title: "Informations",
    description: "Renseignez les informations personnelles liées a votre compte.",
    schema: z.object({})
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Ici vous pouvez choisir les services que vous offrez à vos clients.",
    schema: z.object({})
  },
  {
    id: "complete",
    title: "Complete",
    description: "Vous avez terminé l'inscription, vous pouvez maintenant commencer à utiliser votre compte professionnel !",
  }
);