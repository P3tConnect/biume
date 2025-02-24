'use client';

import React from 'react';
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
import InformationsPetDiseasesStep from './informations-pet-diseases-step';
import InformationsPetIntolerancesStep from './informations-pet-intolerances-step';
import InformationsPetAllergiesStep from './informations-pet-allergies-step';

const StepperAnimal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Credenza open={open}>
      <CredenzaContent className='w-[900px]'>
        <CredenzaHeader className='flex flex-row items-center space-x-4'>
          <StepIndicator
            currentStep={currentIndex + 1}
            totalSteps={stepper.all.length}
            isLast={stepper.isLast}
            size={100}
            strokeWidth={10}
          />
          <div className='space-y-1 flex flex-col'>
            <CredenzaTitle>{stepper.current.title}</CredenzaTitle>
            <CredenzaDescription>
              {stepper.current.description}
            </CredenzaDescription>
          </div>
        </CredenzaHeader>

        {stepper.switch({
          pet: () => (
            <InformationsPetStep
              nextStep={stepper.next}
              previousStep={stepper.prev}
            />
          ),
          'pet-diseases': () => (
            <InformationsPetDiseasesStep
              nextStep={stepper.next}
              previousStep={stepper.prev}
            />
          ),
          'pet-intolerances': () => (
            <InformationsPetIntolerancesStep
              nextStep={stepper.next}
              previousStep={stepper.prev}
            />
          ),
          'pet-allergies': () => (
            <InformationsPetAllergiesStep
              nextStep={stepper.next}
              previousStep={stepper.prev}
            />
          ),
          complete: () => <PetCompleteStep />,
        })}
      </CredenzaContent>
    </Credenza>
  );
};

export default StepperAnimal;
