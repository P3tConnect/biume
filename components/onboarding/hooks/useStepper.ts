import { create } from "zustand";

export type StepperStore = {
  successSteps: number[];
  setCurrentStep: (step: number) => void;
};

export const useStepper = create<StepperStore>((set, get) => ({
  successSteps: [],
  setCurrentStep: (step: number) =>
    set({ successSteps: [...get().successSteps, step] }),
}));
