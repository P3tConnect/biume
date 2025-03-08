'use client';

import InformationsPetDeseasesForm from '../forms/informations-pet-deseases-form';
import { Pet } from '@/src/db/pets';

interface InformationsPetDeseasesStepProps {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
  petData?: Pet | null;
  isUpdate?: boolean;
}

const InformationsPetDeseasesStep = ({
  nextStep,
  previousStep,
  isPending,
  petData,
  isUpdate = false,
}: InformationsPetDeseasesStepProps) => {
  return (
    <InformationsPetDeseasesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={isPending}
      petData={petData}
      isUpdate={isUpdate}
    />
  );
};

export default InformationsPetDeseasesStep;
