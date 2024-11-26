'use client'

import React, { createContext, useState, useContext } from 'react'

interface OnboardingContextType {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <OnboardingContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
