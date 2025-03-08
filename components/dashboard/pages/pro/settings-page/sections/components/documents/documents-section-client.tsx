"use client"

import React from "react"

import { OrganizationDocuments } from "@/src/db"

import { DocumentsForm } from "./documents-form"

interface DocumentsSectionClientProps {
  documents: OrganizationDocuments[]
}

const DocumentsSectionClient = ({ documents }: DocumentsSectionClientProps) => {
  return (
    <div className="space-y-6">
      <DocumentsForm documents={documents} />
    </div>
  )
}

export default DocumentsSectionClient
