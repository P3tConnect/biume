import React from 'react'
import ServicesForm from '../components/pro/services-form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { onboardingSchema } from '../components/stepper'

const ProServicesStep = ({ form }: { form: UseFormReturn<z.infer<typeof onboardingSchema>> }) => {
  return (
    <ServicesForm form={form} />
  )
}

export default ProServicesStep