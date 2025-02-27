"use client";

import React from "react";
import { DocumentsForm } from "./documents-form";
import { ActionResult } from "@/src/lib";
import { OrganizationDocuments } from "@/src/db";

interface DocumentsSectionClientProps {
  documents: ActionResult<OrganizationDocuments[]>;
}

const DocumentsSectionClient = ({ documents }: DocumentsSectionClientProps) => {
  return (
    <div className="space-y-6">
      <DocumentsForm documents={documents} />
    </div>
  );
};

export default DocumentsSectionClient; 