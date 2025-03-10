import OptionsForm from "../components/pro/options-form"

const ProOptionsStep = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  return <OptionsForm nextStep={nextStep} previousStep={previousStep} />
}

export default ProOptionsStep
