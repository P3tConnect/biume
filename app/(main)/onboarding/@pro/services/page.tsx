import ProServicesStep from '@/components/onboarding/pro/services-step'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Services - Onboarding",
  description: "Services - Onboarding",
}

const ServicesStepPage = () => {
  return (
    <ProServicesStep />
  )
}

export default ServicesStepPage