'use client';

import React, { useState, useEffect } from 'react';
import { useStepper, utils } from '../hooks/useStepperAnimal';
import {
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaHeader,
} from '@/components/ui';
import StepIndicator from '@/components/onboarding/components/step-indicator';
import InformationsPetStep from './informations-pet-step';
import PetCompleteStep from '../forms/pet-complete-step';
import InformationsPetDeseasesStep from './informations-pet-deseases-step';
import InformationsPetIntolerancesStep from './informations-pet-intolerances-step';
import InformationsPetAllergiesStep from './informations-pet-allergies-step';
import { usePetContext } from '../context/pet-context';

const StepperAnimal = () => {
  const {
    next,
    prev,
    current,
    goTo,
    all,
    isLast,
    switch: switchStep,
  } = useStepper();
  const { petId } = usePetContext();

  const currentIndex = utils.getIndex(current.id);
  const [open, setOpen] = useState(true);

  // Vérifier que l'ID est présent lors du passage aux étapes nécessitant un animal existant
  useEffect(() => {
    // On ne vérifie pas l'ID pour l'étape initiale de création de l'animal
    if (current.id !== 'pet') {
      const storedPetId =
        typeof window !== 'undefined'
          ? localStorage.getItem('currentPetId')
          : null;
      console.log(
        `[StepperAnimal] Étape actuelle: ${current.id}, ID depuis le contexte: ${petId}, ID depuis localStorage: ${storedPetId}`
      );
    }
  }, [current.id, petId]);

  return (
    <Credenza open={open}>
      <CredenzaContent className='w-[900px]'>
        <CredenzaHeader className='flex flex-row items-center space-x-4'>
          <StepIndicator
            currentStep={currentIndex + 1}
            totalSteps={all.length}
            isLast={isLast}
            size={100}
            strokeWidth={10}
          />
          <div className='space-y-1 flex flex-col'>
            <CredenzaTitle>{current.title}</CredenzaTitle>
            <CredenzaDescription>{current.description}</CredenzaDescription>
          </div>
        </CredenzaHeader>

        {switchStep({
          pet: () => (
            <InformationsPetStep nextStep={next} previousStep={prev} />
          ),
          petDeseases: () => (
            <InformationsPetDeseasesStep nextStep={next} previousStep={prev} />
          ),
          petIntolerences: () => (
            <InformationsPetIntolerancesStep
              nextStep={next}
              previousStep={prev}
            />
          ),
          petAllergies: () => (
            <InformationsPetAllergiesStep nextStep={next} previousStep={prev} />
          ),
          complete: () => <PetCompleteStep />,
        })}
      </CredenzaContent>
    </Credenza>
  );
};

export default StepperAnimal;
