import ProDocumentsStep from '@/components/onboarding/pro/documents-step'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Documents - Onboarding",
  description: "Documents - Onboarding",
}

const DocumentsStepPage = () => {
  return (
    <ProDocumentsStep />
  )
}

export default DocumentsStepPage