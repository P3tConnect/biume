'use client';

import InformationsPetForm from '../forms/informations-pet-form';

const InformationsPetStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  return (
    <InformationsPetForm nextStep={nextStep} previousStep={previousStep} />
  );
};

export default InformationsPetStep;
