"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Package2, Check } from "lucide-react";
import { ActionResult, cn } from "@/src/lib";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateOrganizationPlan } from "@/src/actions/stripe.action";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui";
import { BillingInfo } from "@/types/billing-info";

interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  priceId: string;
}

interface BillingPlanSectionProps {
  plans: Plan[];
  billingInfo: ActionResult<BillingInfo> | undefined;
}

export const BillingPlanSection = ({
  plans,
  billingInfo,
}: BillingPlanSectionProps) => {
  const params = useParams();
  const orgId = params.orgId as string;
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationPlan,
    onSuccess: (data) => {
      if (data.data) {
        router.push(data.data);
      }
    },
    onError: () => {
      toast.error("Une erreur est survenue");
    },
  });

  const handleChangePlan = async (plan: string) => {
    await mutateAsync({
      organizationId: orgId,
      plan,
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
              <Package2 className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Plan actuel</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {billingInfo?.data?.currentPrice}
                </span>
                <span className="text-sm text-muted-foreground">/mois</span>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsOpen(true)}>Changer de plan</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Vous êtes actuellement sur le plan{" "}
          <span className="font-medium text-foreground">
            {billingInfo?.data?.currentPlan}
          </span>
        </p>
      </div>

      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <CredenzaTitle>Changer de plan</CredenzaTitle>
        </VisuallyHidden>
        <CredenzaContent className="max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative cursor-pointer transition-all hover:shadow-lg rounded-2xl flex flex-col h-full",
                  selectedPlan === plan.name && "border-primary shadow-lg",
                  plan.name === "Pro" && "scale-105 border-primary",
                )}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.name === "Pro" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-primary-foreground text-sm font-medium">
                    Populaire
                  </div>
                )}
                <CredenzaHeader>
                  <CredenzaTitle>{plan.name}</CredenzaTitle>
                  <CredenzaDescription>{plan.description}</CredenzaDescription>
                </CredenzaHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                    onClick={() => handleChangePlan(plan.priceId)}
                  >
                    Sélectionner {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CredenzaContent>
      </Credenza>
    </>
  );
};
