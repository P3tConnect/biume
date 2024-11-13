import { create } from "zustand";

export type StepperStore = {
  successSteps: number[];
  setSuccessStep: (step: number) => void;
};

export const useStepper = create<StepperStore>((set, get) => ({
  successSteps: [],
  setSuccessStep: (step: number) =>
    set({ successSteps: [...get().successSteps, step] }),
}));
