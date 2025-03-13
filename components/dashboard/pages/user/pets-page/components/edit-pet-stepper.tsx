"use client"

import { CredenzaDescription, CredenzaTitle } from "@/components/ui"
import { useStepper, utils } from "../hooks/useStepperAnimal"

import InformationsPetAllergiesStep from "./informations-pet-allergies-step"
import InformationsPetDeseasesStep from "./informations-pet-deseases-step"
import InformationsPetIntolerancesStep from "./informations-pet-intolerances-step"
import InformationsPetStep from "./informations-pet-step"
import { Loader2 } from "lucide-react"
import { Pet } from "@/src/db/pets"
import PetCompleteStep from "../forms/pet-complete-step"
import React from "react"
import StepIndicator from "@/components/onboarding/components/step-indicator"
import { getPetById } from "@/src/actions/pet.action"
import { useQuery } from "@tanstack/react-query"

interface EditPetStepperProps {
  onComplete?: () => void
  petId: string
}

const EditPetStepper = ({ onComplete, petId }: EditPetStepperProps) => {
  const { next, prev, current, all, isLast, switch: switchStep } = useStepper()
  const currentIndex = utils.getIndex(current.id)

  // Utilisation de useQuery pour charger les données de l'animal
  const { data: petData, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: async () => {
      return await getPetById({ petId })
    },
    // L'ID est obligatoire, donc enabled est toujours true
    enabled: true,
  })

  // Extraire les données du résultat de la requête
  const pet = petData && typeof petData === "object" && "data" in petData ? (petData.data as Pet) : null

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

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      ) : (
        switchStep({
          pet: () => <InformationsPetStep nextStep={next} petData={pet} isUpdate={true} />,
          petDeseases: () => (
            <InformationsPetDeseasesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={true}
            />
          ),
          petIntolerences: () => (
            <InformationsPetIntolerancesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={true}
            />
          ),
          petAllergies: () => (
            <InformationsPetAllergiesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={true}
            />
          ),
          complete: () => <PetCompleteStep onComplete={onComplete} isUpdate={true} />,
        })
      )}
    </div>
  )
}

export default EditPetStepper
