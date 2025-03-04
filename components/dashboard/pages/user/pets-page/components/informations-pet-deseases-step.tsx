import InformationsPetDeseasesForm from '../forms/informations-pet-deseases-form';

const InformationsPetDeseasesStep = ({
  nextStep,
  previousStep,
  isPending,
}: {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
}) => {
  return (
    <InformationsPetDeseasesForm
      nextStep={nextStep}
      previousStep={previousStep}
      isPending={isPending}
    />
  );
};

export default InformationsPetDeseasesStep;
