import InformationsPetDeseasesForm from '../forms/informations-pet-deseases-form';

const InformationsPetDeseasesStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  return (
    <InformationsPetDeseasesForm
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );
};

export default InformationsPetDeseasesStep;
