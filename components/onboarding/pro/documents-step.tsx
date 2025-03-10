import { DocumentsForm } from "../components/pro/documents-form"

const ProDocumentsStep = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  return <DocumentsForm nextStep={nextStep} previousStep={previousStep} />
}

export default ProDocumentsStep
