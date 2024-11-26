'use client'

import React from "react"
import StepperClient from "@/components/onboarding/components/stepper-client";

const OnBoardingClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-3 gap-3">
      <StepperClient />
      <div className="w-3/4 h-full">{children}</div>
    </div>
  )
}

export default OnBoardingClientLayout
