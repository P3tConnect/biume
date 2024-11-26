import Stepper from "@/components/onboarding/components/stepper";
import React from "react";

const OnboardingProLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-3 gap-3">
      <Stepper />
      <div className="w-3/4 h-full">{children}</div>
    </div>
  );
};

export default OnboardingProLayout;
