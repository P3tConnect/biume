import InformationsPetIntolerancesForm from '../forms/informations-pet-intolerances-form';

const InformationsPetIntolerancesStep = ({
  nextStep,
  previousStep,
  isPending,
}: {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
}) => {
  return (
    <InformationsPetIntolerancesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={isPending}
    />
  );
};

export default InformationsPetIntolerancesStep;
