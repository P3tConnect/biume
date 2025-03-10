"use client"

import { Pet } from "@/src/db/pets"

import InformationsPetAllergiesForm from "../forms/informations-pet-allergies-form"

interface InformationsPetAllergiesStepProps {
  nextStep: () => void
  previousStep: () => void
  isPending: boolean
  petData?: Pet | null
  isUpdate?: boolean
}

const InformationsPetAllergiesStep = ({
  nextStep,
  previousStep,
  isPending,
  petData,
  isUpdate = false,
}: InformationsPetAllergiesStepProps) => {
  return (
    <InformationsPetAllergiesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={isPending}
      petData={petData}
      isUpdate={isUpdate}
    />
  )
}

export default InformationsPetAllergiesStep
