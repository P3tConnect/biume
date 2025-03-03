'use client';

import React, { useEffect } from 'react';
import { useStepper, utils } from '../hooks/useStepperAnimal';
import { CredenzaTitle, CredenzaDescription } from '@/components/ui';
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

  useEffect(() => {
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
    <div className='space-y-6'>
      <div className='flex flex-row items-center space-x-4'>
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
      </div>

      {switchStep({
        pet: () => <InformationsPetStep nextStep={next} previousStep={prev} />,
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
        complete: () => <PetCompleteStep nextStep={next} />,
      })}
    </div>
  );
};

export default StepperAnimal;
