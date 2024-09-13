import { create } from "zustand";

export type StepperStore = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useStepper = create<StepperStore>((set, get) => ({
  currentStep: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  nextStep: () => set({ currentStep: get().currentStep + 1 }),
  prevStep: () => set({ currentStep: get().currentStep - 1 }),
}));