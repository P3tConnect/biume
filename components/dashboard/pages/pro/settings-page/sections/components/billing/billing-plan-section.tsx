"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Package2, Check, Sparkles, CreditCard } from "lucide-react";
import { ActionResult, cn } from "@/src/lib";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateOrganizationPlan } from "@/src/actions/stripe.action";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Credenza, CredenzaContent, CredenzaTitle } from "@/components/ui";
import { BillingInfo } from "@/types/billing-info";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  monthlyPriceId: string;
  yearlyPriceId: string;
  icon?: React.ElementType;
  isPopular?: boolean;
  badge?: string;
}

interface BillingPlanSectionProps {
  plans: Plan[];
  billingInfo: ActionResult<BillingInfo> | undefined;
  isLoading: boolean;
}

export const BillingPlanSection = ({
  plans,
  billingInfo,
  isLoading,
}: BillingPlanSectionProps) => {
  const params = useParams();
  const orgId = params.orgId as string;
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [isAnnual, setIsAnnual] = React.useState(true);

  // Associer des icônes par défaut aux plans
  const enhancedPlans = plans.map((plan) => {
    // Définir des valeurs par défaut
    const enhancedPlan = {
      ...plan,
      icon:
        plan.icon ||
        (plan.name === "Pro"
          ? Sparkles
          : plan.name === "Entreprise"
            ? Package2
            : CreditCard),
      isPopular: plan.name === "Pro",
      badge: plan.name === "Pro" ? "Le plus choisi" : undefined,
    };
    return enhancedPlan;
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationPlan,
    onSuccess: (data) => {
      if (data.data) {
        window.location.href = data.data;
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
        <CredenzaContent className="max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <CreditCard className="w-4 h-4" />
              <span>Nos forfaits</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Choisissez le plan qui vous convient
            </h2>
            <p className="text-muted-foreground mb-6">
              Tous nos forfaits incluent l&apos;accès à toutes les fonctionnalités
              essentielles
            </p>

            {/* Sélecteur mensuel/annuel */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span
                className={cn(
                  "text-sm",
                  !isAnnual
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Mensuel
              </span>
              <div className="flex items-center space-x-2">
                <Switch
                  id="billing-toggle"
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <Label htmlFor="billing-toggle" className="sr-only">
                  Facturation annuelle
                </Label>
              </div>
              <span
                className={cn(
                  "text-sm flex items-center gap-1.5",
                  isAnnual
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Annuel
                <Badge
                  variant="outline"
                  className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  -20%
                </Badge>
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {enhancedPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "relative h-full flex flex-col transition-shadow duration-200",
                    plan.isPopular
                      ? "shadow-lg border-primary/50"
                      : "hover:shadow-md",
                    selectedPlan === plan.name && "border-primary shadow-lg",
                  )}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Badge className="px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader
                    className={cn(
                      "flex flex-col items-center text-center",
                      plan.isPopular ? "pb-0" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                        plan.isPopular
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {React.createElement(plan.icon, { className: "w-6 h-6" })}
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold">
                          {isAnnual
                            ? `${(parseFloat(plan.price) * 0.8).toFixed(2)}`
                            : plan.price}
                          €
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /mois
                        </span>
                      </div>

                      {isAnnual && (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className="text-xs line-through text-muted-foreground">
                            {plan.price}€
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                          >
                            -20%
                          </Badge>
                        </div>
                      )}

                      {isAnnual && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Facturé annuellement (
                          {(parseFloat(plan.price) * 0.8 * 12).toFixed(2)}
                          €)
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {/* Badge d'essai gratuit si applicable */}
                      <li className="flex items-center justify-center bg-primary/5 rounded-md p-2 mb-2">
                        <span className="text-sm font-medium text-primary flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                          Premier mois gratuit
                        </span>
                      </li>

                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={cn(
                        "w-full",
                        plan.isPopular
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-primary/10 text-primary hover:bg-primary/20",
                      )}
                      size="lg"
                      onClick={() => handleChangePlan(isAnnual ? plan.yearlyPriceId : plan.monthlyPriceId)}
                    >
                      Sélectionner {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CredenzaContent>
      </Credenza>
    </>
  );
};
