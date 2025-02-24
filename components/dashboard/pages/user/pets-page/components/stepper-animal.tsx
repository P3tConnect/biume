'use client';

import React, { useState } from 'react';
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

  const currentIndex = utils.getIndex(current.id);
  const [open, setOpen] = useState(true);

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
