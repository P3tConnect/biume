import { DocumentsForm } from "./components/documents/documents-form";
import { LegalInformationForm } from "./components/documents/legal-information-form";

export const DocumentsSection = () => {
  return (
    <div className="space-y-6">
      <DocumentsForm />
      <LegalInformationForm />
    </div>
  );
};
