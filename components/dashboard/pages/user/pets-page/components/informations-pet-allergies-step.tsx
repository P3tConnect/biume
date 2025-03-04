import InformationsPetAllergiesForm from '../forms/informations-pet-allergies-form';

const InformationsPetAllergiesStep = ({
  nextStep,
  previousStep,
  isPending,
}: {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
}) => {
  return (
    <InformationsPetAllergiesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={false}
    />
  );
};

export default InformationsPetAllergiesStep;
