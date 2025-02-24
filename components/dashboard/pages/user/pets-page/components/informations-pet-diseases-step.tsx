import InformationsPetDiseasesForm from '../forms/informations-pet-diseases-form';

const InformationsPetDiseasesStep = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  return (
    <InformationsPetDiseasesForm
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );
};

export default InformationsPetDiseasesStep;
