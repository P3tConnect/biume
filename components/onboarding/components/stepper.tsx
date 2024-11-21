"use client";

import {
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useStore } from "@/src/hooks";
import { cn } from "@/src/lib";
import { ArrowLeft, Check } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStepper } from "../hooks/useStepper";

const Stepper = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const stepperStore = useStore(useStepper, (state) => state);

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
    <AlertDialog>
      <Card className="rounded-2xl border border-border w-1/4 h-full">
        <CardHeader className="flex flex-col items-start justify-start gap-2">
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-start gap-2 rounded-xl w-fit",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <p>Quitter</p>
            </Button>
          </AlertDialogTrigger>
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
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold hover:text-white",
                      stepperStore?.successSteps.includes(step.step) ? "border-primary bg-primary" : "border-muted",
                      step.href === pathname
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground",
                    )}
                  >
                    <Check
                      className={cn(
                        "h-8 w-8",
                        stepperStore?.successSteps.includes(step.step) ? "visible" : "hidden",
                      )}
                    />
                    <p
                      className={cn(
                        "text-lg font-semibold",
                        stepperStore?.successSteps.includes(step.step) ? "hidden" : "visible",
                      )}
                    >
                      {step.step}
                    </p>
                  </Link>
                  {index !== steps.length - 1 && (
                    <div className={cn("w-px h-40 my-1", stepperStore?.successSteps.includes(step.step) ? "bg-primary" : "bg-border")} />
                  )}
                </div>
                <div
                  className={cn(
                    "flex-1 pt-2 pb-8",

                  )}
                >
                  <p className={cn("font-medium", step.href === pathname
                    ? "text-primary"
                    : "text-muted-foreground",)}>{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Souhaitez-vous quitter ?</AlertDialogTitle>
          <AlertDescription>
            Si vous quittez à cette étape, vous perdrez les données saisies. Etes-vous sûr ?
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => router.push('/')} variant="default" className="rounded-xl">
              Quitter
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Stepper;
