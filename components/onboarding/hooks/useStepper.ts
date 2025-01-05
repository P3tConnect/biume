import { defineStepper } from "@stepperize/react";
import { z } from "zod";

export const { steps, useStepper } = defineStepper(
  {
    id: "start",
    title: "Bienvenue",
    description: "Bienvenue dans l'inscription de votre entreprise !",
  },
  {
    id: "informations",
    title: "Informations",
    description:
      "Renseignez les informations de votre entreprise pour que nous puissions créer le compte de votre établissement.",
  },
  {
    id: "services",
    title: "Services",
    description:
      "Ici vous pouvez choisir les services que vous offrez à vos clients.",
  },
  {
    id: "options",
    title: "Options",
    description:
      "Les options peuvent vous permettre de personnaliser votre offre de services et ainsi attirer davantage de clients.",
  },
  {
    id: "documents",
    title: "Documents",
    description:
      "Les documents nous permettent de vous identifier et de vous authentifier en tant que professionnel, vous pourrez les modifier à tout moment dans les réglages du compte de votre entreprise.",
  },
  {
    id: "complete",
    title: "Complete",
    description:
      "Vous avez terminé l'inscription, vous pouvez maintenant commencer à utiliser votre compte professionnel !",
  },
);
