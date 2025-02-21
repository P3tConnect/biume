export type OnboardingStep = {
  id: string;
  title: string;
  description?: string;
  element?: string; // Sélecteur CSS pour l'élément à mettre en évidence
  placement?: "top" | "bottom" | "left" | "right";
  spotlightPadding?: number;
  disableOverlay?: boolean;
  customContent?: React.ReactNode;
};

export type OnboardingConfig = {
  steps: OnboardingStep[];
  onComplete?: () => void;
  onStepChange?: (currentStep: number) => void;
  persistKey?: string; // Clé pour la persistance localStorage
  defaultOpen?: boolean;
};

export type OnboardingContextType = {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  steps: OnboardingStep[];
  next: () => void;
  prev: () => void;
  close: () => void;
  open: () => void;
  goToStep: (step: number) => void;
};
