"use client"

import { CredenzaDescription, CredenzaTitle } from "@/components/ui"
import React, { useRef } from "react"
import { useStepper, utils } from "../hooks/useStepperAnimal"

import InformationsPetAllergiesStep from "./informations-pet-allergies-step"
import InformationsPetDeseasesStep from "./informations-pet-deseases-step"
import InformationsPetIntolerancesStep from "./informations-pet-intolerances-step"
import InformationsPetStep from "./informations-pet-step"
import PetCompleteStep from "../forms/pet-complete-step"
import StepIndicator from "@/components/onboarding/components/step-indicator"
import { getPetById } from "@/src/actions/pet.action"
import { usePetContext } from "../context/pet-context"
import { useQuery } from "@tanstack/react-query"

interface StepperAnimalProps {
  onComplete?: () => void
  petId?: string
}

const StepperAnimal = ({ onComplete, petId }: StepperAnimalProps) => {
  const { setPetId, petId: contextPetId } = usePetContext()
  const initializedRef = useRef(false)

  // Mise à jour du contexte avec petId une seule fois
  if (petId && !initializedRef.current && petId !== contextPetId) {
    initializedRef.current = true
    // Planifier la mise à jour après le rendu
    setTimeout(() => setPetId(petId), 0)
  }

  const { next, prev, current, all, isLast, switch: switchStep } = useStepper()
  const currentIndex = utils.getIndex(current.id)

  // Utilisation de useQuery pour charger les données de l'animal
  const { data: petData, isLoading } = useQuery({
    queryKey: ["pet", petId || contextPetId],
    queryFn: async () => {
      const idToUse = petId || contextPetId
      if (!idToUse) return null
      return await getPetById({ petId: idToUse })
    },
    enabled: !!(petId || contextPetId),
  })

  // Extraire les données du résultat de la requête
  const pet = petData && "data" in petData ? petData.data : null

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
          <p>Chargement des données de l'animal...</p>
        </div>
      ) : (
        switchStep({
          pet: () => (
            <InformationsPetStep
              nextStep={next}
              previousStep={prev}
              petData={pet}
              isUpdate={!!(petId || contextPetId)}
            />
          ),
          petDeseases: () => (
            <InformationsPetDeseasesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={!!(petId || contextPetId)}
            />
          ),
          petIntolerences: () => (
            <InformationsPetIntolerancesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={!!(petId || contextPetId)}
            />
          ),
          petAllergies: () => (
            <InformationsPetAllergiesStep
              nextStep={next}
              previousStep={prev}
              isPending={false}
              petData={pet}
              isUpdate={!!(petId || contextPetId)}
            />
          ),
          complete: () => <PetCompleteStep onComplete={onComplete} isUpdate={!!(petId || contextPetId)} />,
        })
      )}
    </div>
  )
}

export default StepperAnimal
