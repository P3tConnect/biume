'use client';

import InformationsPetIntolerancesForm from '../forms/informations-pet-intolerances-form';
import { Pet } from '@/src/db/pets';

interface InformationsPetIntolerancesStepProps {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
  petData?: Pet | null;
  isUpdate?: boolean;
}

const InformationsPetIntolerancesStep = ({
  nextStep,
  previousStep,
  isPending,
  petData,
  isUpdate = false,
}: InformationsPetIntolerancesStepProps) => {
  return (
    <InformationsPetIntolerancesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={isPending}
      petData={petData}
      isUpdate={isUpdate}
    />
  );
};

export default InformationsPetIntolerancesStep;
