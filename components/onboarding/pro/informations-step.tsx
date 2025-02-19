import InformationsForm from "../components/pro/informations-form";

const ProInformationsStep = ({ nextStep, previousStep }: { nextStep: () => void, previousStep: () => void }) => {
  return <InformationsForm nextStep={nextStep} previousStep={previousStep} />;
};

export default ProInformationsStep;
