import { DocumentsForm } from "./components/documents/documents-form";
import { ActionResult } from "@/src/lib";
import { OrganizationDocuments } from "@/src/db";

export const DocumentsSection = ({
  documents,
}: {
  documents: ActionResult<OrganizationDocuments[]>;
}) => {
  return (
    <div className="space-y-6">
      <DocumentsForm documents={documents} />
    </div>
  );
};
