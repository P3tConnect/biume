import InformationsPetAllergiesForm from '../forms/informations-pet-allergies-form';

const InformationsPetAllergiesStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  return (
    <InformationsPetAllergiesForm
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );
};

export default InformationsPetAllergiesStep;
