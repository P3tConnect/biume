import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import React from 'react'
import { DocumentsForm } from '../components/pro/documents-form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { onboardingSchema } from '../components/stepper'

const ProDocumentsStep = ({ form }: { form: UseFormReturn<z.infer<typeof onboardingSchema>> }) => {
  return (
    <DocumentsForm form={form} />
  )
}

export default ProDocumentsStep