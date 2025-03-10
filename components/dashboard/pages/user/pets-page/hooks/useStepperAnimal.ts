import { defineStepper } from "@stepperize/react"

export const { steps, useStepper, utils } = defineStepper(
  {
    id: "pet",
    title: "Votre animal",
    description: "Informations générales sur votre animal",
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
