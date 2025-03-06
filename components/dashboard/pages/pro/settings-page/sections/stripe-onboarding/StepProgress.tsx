"use client";

import { CheckCircle, Circle } from "lucide-react";

type Step = "business" | "legal" | "banking" | "documents" | "summary";

interface StepProgressProps {
  currentStep: Step;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const steps = [
    { id: "business", name: "Profil commercial" },
    { id: "legal", name: "Entité légale" },
    { id: "banking", name: "Compte bancaire" },
    { id: "documents", name: "Documents" },
    { id: "summary", name: "Récapitulatif" },
  ];

  // Déterminer l'index de l'étape actuelle
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= currentIndex
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-300"
              }`}
            >
              {index < currentIndex ? (
                <CheckCircle className="w-6 h-6" />
              ) : index === currentIndex ? (
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            <p
              className={`mt-1 text-xs md:text-sm ${
                index <= currentIndex
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-0.5 bg-gray-200"></div>
        </div>
        <div
          className="absolute inset-0 flex items-center"
          style={{
            width: `${
              currentIndex === 0 ? 0 : (currentIndex / (steps.length - 1)) * 100
            }%`,
          }}
        >
          <div className="w-full h-0.5 bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
