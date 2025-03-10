"use client"

import StepperClient from "@/components/onboarding/components/stepper-client"
import { useSession } from "@/src/lib/auth-client"

export default function OnboardingModal() {
  const { data: session } = useSession()
  const showModal = session?.user.onBoardingComplete === false

  if (!showModal) return null

  return <StepperClient open={showModal} />
}
