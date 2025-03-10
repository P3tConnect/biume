"use client"

import { Pet } from "@/src/db/pets"

import InformationsPetForm from "../forms/informations-pet-form"

interface InformationsPetStepProps {
  nextStep: () => void
  previousStep: () => void
  petData?: Pet | null
  isUpdate?: boolean
}

const InformationsPetStep = ({ nextStep, previousStep, petData, isUpdate = false }: InformationsPetStepProps) => {
  return <InformationsPetForm nextStep={nextStep} previousStep={previousStep} petData={petData} isUpdate={isUpdate} />
}

export default InformationsPetStep
