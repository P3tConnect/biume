import ServicesForm from "../components/pro/services-form"

const ProServicesStep = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  return <ServicesForm nextStep={nextStep} previousStep={previousStep} />
}

export default ProServicesStep
