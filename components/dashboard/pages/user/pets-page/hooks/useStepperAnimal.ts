import { defineStepper } from "@stepperize/react"
import { z } from "zod"

export const { steps, useStepper, utils } = defineStepper(
  {
    id: "pet",
    title: "Votre animal",
    description: "Informations générales sur votre animal",
    schema: {
      name: z.string().min(1, { message: "Le nom est requis" }),
      gender: z.string().min(1, { message: "Le sexe est requis" }),
      type: z.string().min(1, { message: "Le type est requis" }),
      breed: z.string().min(1, { message: "La race est requise" }),
      image: z.string().min(1, { message: "L'image est requise" }),
      birthDate: z.date().min(new Date(), { message: "La date de naissance est requise" }),
      description: z.string().min(1, { message: "La description est requise: caractéristique, comportement, etc.." }),
    },
  },
  {
    id: "petDeseases",
    title: "Maladies",
    description: "Renseignez les maladies de votre animal",
  },
  {
    id: "petIntolerences",
    title: "Intolérances",
    description: "Renseignez les intolérances de votre animal",
  },
  {
    id: "petAllergies",
    title: "Allergies",
    description: "Renseignez les allergies de votre animal",
  },
  {
    id: "complete",
    title: "Terminé",
    description: "Vous avez terminé la création de votre animal !",
  }
)
