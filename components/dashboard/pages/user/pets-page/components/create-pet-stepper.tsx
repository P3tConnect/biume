"use client"

import { CredenzaDescription, CredenzaTitle } from "@/components/ui"
import { useStepper, utils } from "../hooks/useStepperAnimal"

import InformationsPetAllergiesStep from "./informations-pet-allergies-step"
import InformationsPetDeseasesStep from "./informations-pet-deseases-step"
import InformationsPetIntolerancesStep from "./informations-pet-intolerances-step"
import InformationsPetStep from "./informations-pet-step"
import PetCompleteStep from "../forms/pet-complete-step"
import React from "react"
import StepIndicator from "@/components/onboarding/components/step-indicator"

interface CreatePetStepperProps {
  onComplete?: () => void
}

const CreatePetStepper = ({ onComplete }: CreatePetStepperProps) => {
  const { next, prev, current, all, isLast, switch: switchStep } = useStepper()
  const currentIndex = utils.getIndex(current.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center space-x-4">
        <StepIndicator
          currentStep={currentIndex + 1}
          totalSteps={all.length}
          isLast={isLast}
          size={100}
          strokeWidth={10}
        />
        <div className="space-y-1 flex flex-col">
          <CredenzaTitle>{current.title}</CredenzaTitle>
          <CredenzaDescription>{current.description}</CredenzaDescription>
        </div>
      </div>

      {switchStep({
        pet: () => <InformationsPetStep nextStep={next} petData={null} isUpdate={false} />,
        petDeseases: () => (
          <InformationsPetDeseasesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={null}
            isUpdate={false}
          />
        ),
        petIntolerences: () => (
          <InformationsPetIntolerancesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={null}
            isUpdate={false}
          />
        ),
        petAllergies: () => (
          <InformationsPetAllergiesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={null}
            isUpdate={false}
          />
        ),
        complete: () => <PetCompleteStep onComplete={onComplete} isUpdate={false} />,
      })}
    </div>
  )
}

export default CreatePetStepper
