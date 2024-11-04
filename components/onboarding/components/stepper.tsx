"use client";

import {
  Button,
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
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Stepper = () => {
  const pathname = usePathname();
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
            Ceci est la description de l'étape en cours de création d'une
            entreprise
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-3/4 flex flex-col justify-around items-start gap-2">
        <>
          {steps.map((step) => (
            <Link
              key={step.step}
              href={step.href}
              className={cn(
                buttonVariants({
                  variant: step.href == pathname ? "default" : "ghost",
                }),
                "flex flex-row items-center justify-start gap-3 rounded-xl w-full h-16 p-5",
                successSteps.includes(step.step) ? "bg-primary/30" : "",
              )}
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full p-0 bg-white">
                <p
                  className={cn(
                    "text-black",
                    successSteps.includes(step.step) ? "hidden" : "visible",
                  )}
                >
                  {step.step}
                </p>

                <Check
                  className={cn(
                    "h-6 w-6 text-primary",
                    successSteps.includes(step.step) ? "visible" : "hidden",
                  )}
                />
              </div>
              <p className="text-lg font-semibold">{step.title}</p>
            </Link>
          ))}
        </>
      </CardContent>
    </Card>
  );
};

export default Stepper;
