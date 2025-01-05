import React from 'react'
import OptionsForm from '../components/pro/options-form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { onboardingSchema } from '../components/stepper'

const ProOptionsStep = ({ form }: { form: UseFormReturn<z.infer<typeof onboardingSchema>> }) => {
  return (
    <OptionsForm form={form} />
  )
}

export default ProOptionsStep