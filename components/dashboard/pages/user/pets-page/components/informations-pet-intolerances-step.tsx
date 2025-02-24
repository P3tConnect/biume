import InformationsPetIntolerancesForm from '../forms/informations-pet-intolerances-form';

const InformationsPetIntolerancesStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  return (
    <InformationsPetIntolerancesForm
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );
};

export default InformationsPetIntolerancesStep;
