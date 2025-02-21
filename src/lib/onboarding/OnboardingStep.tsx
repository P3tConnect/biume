import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "./OnboardingContext";
import { cn } from "@/src/lib/utils";

export function OnboardingStep() {
  const { isOpen, currentStep, steps, next, prev, close } = useOnboarding();
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (currentStepData.element && isOpen) {
      const element = document.querySelector(currentStepData.element);
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = currentStepData.spotlightPadding ?? 8;
        setPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
      }
    }
  }, [currentStep, currentStepData, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {!currentStepData.disableOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={close}
          />
        )}

        {currentStepData.element && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bg-white/10 rounded-lg"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              height: position.height,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "bg-white rounded-lg shadow-lg p-6 max-w-md mx-4",
            "dark:bg-gray-800",
            {
              absolute: currentStepData.element,
              relative: !currentStepData.element,
            },
          )}
          style={{
            top: currentStepData.element
              ? `${position.top + position.height + 20}px`
              : "auto",
            left: currentStepData.element ? `${position.left}px` : "auto",
          }}
        >
          {currentStepData.customContent || (
            <>
              <h3 className="text-lg font-semibold mb-2">
                {currentStepData.title}
              </h3>
              {currentStepData.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {currentStepData.description}
                </p>
              )}
            </>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={currentStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200"
              >
                Précédent
              </button>
              <button
                onClick={next}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
