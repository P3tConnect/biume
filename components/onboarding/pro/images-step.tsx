"use client";

import ImagesForm from "../components/pro/images-form";

interface ImagesStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export default function ImagesStep({ nextStep, previousStep }: ImagesStepProps) {
  return (
    <ImagesForm
      onSuccess={nextStep}
      onBack={previousStep}
    />
  );
}
