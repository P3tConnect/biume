import { createContext, useContext, useEffect, useState } from "react";
import {
  OnboardingConfig,
  OnboardingContextType,
  OnboardingStep,
} from "./types";

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: OnboardingConfig;
}) {
  const [isOpen, setIsOpen] = useState(config.defaultOpen ?? false);
  const [currentStep, setCurrentStep] = useState(0);
  const { steps, onComplete, onStepChange, persistKey } = config;

  useEffect(() => {
    if (persistKey) {
      const savedStep = localStorage.getItem(persistKey);
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
  }, [persistKey]);

  useEffect(() => {
    if (persistKey) {
      localStorage.setItem(persistKey, currentStep.toString());
    }
  }, [currentStep, persistKey]);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => {
        const newStep = prev + 1;
        onStepChange?.(newStep);
        return newStep;
      });
    } else {
      close();
      onComplete?.();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => {
        const newStep = prev - 1;
        onStepChange?.(newStep);
        return newStep;
      });
    }
  };

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOpen,
        currentStep,
        totalSteps: steps.length,
        steps,
        next,
        prev,
        close,
        open,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
