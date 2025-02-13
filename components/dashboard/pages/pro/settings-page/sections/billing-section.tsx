"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useActionQuery, useActionMutation } from "@/src/hooks/action-hooks";
import {
  getBillingInfo,
  updateOrganizationPlan,
} from "@/src/actions/stripe.action";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/src/lib";
import { toast } from "sonner";
import { safeConfig } from "@/src/lib";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle } from "@/components/ui";

const plans = [
  {
    name: "Basic",
    description: "Pour les professionnels indépendants",
    price: "14.99",
    features: [
      "Gestion Client",
      "Facturation et devis",
      "Emploi du temps",
      "Compte rendus et observations",
      "Comptabilité",
      "Partage de dossier client",
      "Paiement en ligne",
      "Réservation client",
    ],
    priceId: safeConfig.STRIPE_BASIC_PLAN_ID,
  },
  {
    name: "Pro",
    description: "Pour les petites équipes",
    price: "24.99",
    features: [
      "Abonnement Basic +",
      "Notifications",
      "Rappels automatiques",
      "Délais de rétraction",
      "Echelons de remboursement",
      "Preview Biume AI",
      "Jusqu'à 5 employés",
    ],
    priceId: safeConfig.STRIPE_PRO_PLAN_ID,
  },
  {
    name: "Ultimate",
    description: "Pour les moyennes et grandes structures",
    price: "34.99",
    features: [
      "Abonnement Pro +",
      "Biume AI",
      "Rapports de performance",
      "Communication centralisée",
      "Jusqu'à 10 employés",
    ],
    priceId: safeConfig.STRIPE_ULTIMATE_PLAN_ID,
  },
];

export const BillingSection = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  const { data: billingInfo, isLoading } = useActionQuery(
    getBillingInfo,
    { organizationId: orgId },
    "billing-info",
  );

  const { mutateAsync } = useActionMutation(updateOrganizationPlan, {
    onSuccess: (data) => {
      window.location.href = data;
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
      <Card>
        <CardHeader>
          <CardTitle>Facturation & Abonnement</CardTitle>
          <CardDescription>
            Gérez votre abonnement et vos informations de facturation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Plan actuel</h3>
            {isLoading ? (
              <Skeleton className="h-4 w-[200px]" />
            ) : (
              <p className="text-sm text-muted-foreground">
                {billingInfo?.currentPlan} - {billingInfo?.currentPrice}/mois
              </p>
            )}
            <Button variant="outline" className="mt-4" onClick={() => setIsOpen(true)}>
              Changer de plan
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Moyen de paiement</h3>
            {isLoading ? (
              <Skeleton className="h-4 w-[200px]" />
            ) : (
              <p className="text-sm text-muted-foreground">
                {billingInfo?.paymentMethod}
              </p>
            )}
            <Button variant="outline" className="mt-4">
              Mettre à jour le moyen de paiement
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Historique de facturation</h3>
            <p className="text-sm text-muted-foreground">
              Voir et télécharger les factures passées
            </p>
            <Button variant="outline" className="mt-4">
              Voir l&apos;historique de facturation
            </Button>
          </div>
        </CardContent>
      </Card>

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
