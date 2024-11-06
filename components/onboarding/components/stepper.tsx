"use client";

import {
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/src/lib";
import { ArrowLeft, Check } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";

const Stepper = () => {
  const locale = useLocale();
  const [successSteps, setSuccessSteps] = useState<number[]>([1]);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "Informations",
      href: `/${locale}/onboarding/informations`,
    },
    {
      step: 2,
      title: "Services",
      href: `/${locale}/onboarding/services`,
    },
    {
      step: 3,
      title: "Options",
      href: `/${locale}/onboarding/options`,
    },
    {
      step: 4,
      title: "Documents",
      href: `/${locale}/onboarding/documents`,
    },
  ];

  return (
    <Card className="rounded-2xl border border-border w-1/4 h-full">
      <CardHeader className="flex flex-col items-start justify-start gap-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center justify-start gap-2 rounded-xl w-fit",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <p>Quitter</p>
        </Link>
        <div className="flex flex-col gap-1">
          <CardTitle>Informations</CardTitle>
          <CardDescription>
            Ceci est la description de l&apos;étape en cours de création d&apos;une
            entreprise
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-3/4 flex flex-col justify-around items-start gap-2">
        <div className="flex flex-col w-full h-full">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center ">
                <Link
                  href={step.href}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold",
                    step.step === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground",
                  )}
                >
                  <Check
                    className={cn(
                      "h-8 w-8",
                      successSteps.includes(step.step) ? "visible" : "hidden",
                    )}
                  />
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      successSteps.includes(step.step) ? "hidden" : "visible",
                    )}
                  >
                    {step.step}
                  </p>
                </Link>
                {index !== steps.length - 1 && (
                  <div className="w-px h-56 bg-border my-1" />
                )}
              </div>
              <div
                className={cn(
                  "flex-1 pt-3 pb-8",
                  step.step === currentStep
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <p className="font-medium">{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Stepper;
