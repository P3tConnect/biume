"use client"

import { cn } from "@/src/lib"

interface StepsProps {
  steps: string[]
  currentStep: number
}

export const Steps = ({ steps, currentStep }: StepsProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border",
              currentStep >= index
                ? "border-primary bg-primary text-white"
                : "border-muted-foreground text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="ml-4">
            <p className={cn("text-sm font-medium", currentStep >= index ? "text-primary" : "text-muted-foreground")}>
              {step}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={cn("ml-4 h-[2px] w-16", currentStep > index ? "bg-primary" : "bg-muted-foreground")} />
          )}
        </div>
      ))}
    </div>
  )
}
