import ProOptionsStep from '@/components/onboarding/pro/options-step'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Options - Onboarding",
  description: "Options - Onboarding",
}

const OptionsPageStep = () => {
  return (
    <ProOptionsStep />
  )
}

export default OptionsPageStep