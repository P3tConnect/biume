import { useState } from "react"

type StepId = "location" | "availability" | "details" | "confirmation"

interface Step {
  id: StepId
  title: string
  description: string
}

const steps: Record<StepId, Step> = {
  location: {
    id: "location",
    title: "Zone de déplacement",
    description: "Définissez la zone dans laquelle vous serez disponible",
  },
  availability: {
    id: "availability",
    title: "Période de disponibilité",
    description: "Choisissez vos dates et horaires de disponibilité",
  },
  details: {
    id: "details",
    title: "Détails du déplacement",
    description: "Renseignez les détails de votre déplacement",
  },
  confirmation: {
    id: "confirmation",
    title: "Confirmation",
    description: "Vérifiez les informations avant de confirmer",
  },
}

const stepIds: StepId[] = ["location", "availability", "details", "confirmation"]

export const useExceptionalMoveStepper = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const currentStep = stepIds[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === stepIds.length - 1

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  return {
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
  }
}
