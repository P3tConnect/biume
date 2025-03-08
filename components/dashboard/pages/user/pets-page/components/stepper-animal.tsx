"use client"

import React, { useEffect, useState } from "react"

import StepIndicator from "@/components/onboarding/components/step-indicator"
import { CredenzaDescription, CredenzaTitle } from "@/components/ui"
import { getPetById } from "@/src/actions/pet.action"
import { Pet } from "@/src/db/pets"

import { usePetContext } from "../context/pet-context"
import PetCompleteStep from "../forms/pet-complete-step"
import { useStepper, utils } from "../hooks/useStepperAnimal"
import InformationsPetAllergiesStep from "./informations-pet-allergies-step"
import InformationsPetDeseasesStep from "./informations-pet-deseases-step"
import InformationsPetIntolerancesStep from "./informations-pet-intolerances-step"
import InformationsPetStep from "./informations-pet-step"

interface StepperAnimalProps {
  onComplete?: () => void
  petId?: string // ID de l'animal pour la mise à jour
}

const StepperAnimal = ({ onComplete, petId }: StepperAnimalProps) => {
  const [pet, setPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(!!petId)
  const { setPetId } = usePetContext()

  const { next, prev, current, goTo, all, isLast, switch: switchStep } = useStepper()
  const currentIndex = utils.getIndex(current.id)

  // Charger les données de l'animal si un ID est fourni
  useEffect(() => {
    const loadPetData = async () => {
      if (petId) {
        try {
          setIsLoading(true)
          const petData = await getPetById({ petId })
          if (petData.data) {
            setPet(petData.data)
            setPetId(petId)
          }

          // Si on est en mode édition, on peut stocker l'ID dans le localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("currentPetId", petId)
          }
        } catch (error) {
          console.error("Erreur lors du chargement des données de l'animal:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadPetData()
  }, [petId, setPetId])

  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Chargement des informations...</div>
  }

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
        pet: () => <InformationsPetStep nextStep={next} previousStep={prev} petData={pet} isUpdate={!!petId} />,
        petDeseases: () => (
          <InformationsPetDeseasesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={pet}
            isUpdate={!!petId}
          />
        ),
        petIntolerences: () => (
          <InformationsPetIntolerancesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={pet}
            isUpdate={!!petId}
          />
        ),
        petAllergies: () => (
          <InformationsPetAllergiesStep
            nextStep={next}
            previousStep={prev}
            isPending={false}
            petData={pet}
            isUpdate={!!petId}
          />
        ),
        complete: () => <PetCompleteStep nextStep={next} onComplete={onComplete} />,
      })}
    </div>
  )
}

export default StepperAnimal
