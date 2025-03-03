"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { updateOrganizationPlan } from "@/src/actions";
import { useActiveOrganization } from "@/src/lib/auth-client";
import { safeConfig } from "@/src/lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

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
      <span key="basic-plus">Abonnement Basic +</span>,
      <span key="notifications">Notifications</span>,
      <span key="reminders">Rappels automatiques</span>,
      <span key="refund-period">Délais de rétraction</span>,
      <span key="refund-policy">Echelons de remboursement</span>,
      <span key="preview-biume">
        Preview Biume{" "}
        <span className="text-xl font-bold inline bg-gradient-to-r from-[#FF3366] to-[#338EF7] bg-clip-text text-transparent">
          AI
        </span>
      </span>,
      <span key="employees">Jusqu&apos;à 5 employés</span>,
    ],
    priceId: safeConfig.STRIPE_PRO_PLAN_ID,
  },
  {
    name: "Ultimate",
    description: "Pour les moyennes et grandes structures",
    price: "34.99",
    features: [
      "Abonnement Pro +",
      <span key="biume">
        Biume{" "}
        <span className="text-xl font-bold inline bg-gradient-to-r from-[#FF3366] to-[#338EF7] bg-clip-text text-transparent">
          AI
        </span>
      </span>,
      "Rapports de performance",
      "Communication centralisée",
      "Jusqu'à 10 employés",
    ],
    priceId: safeConfig.STRIPE_ULTIMATE_PLAN_ID,
  },
];

export function SubscriptionStep() {
  const { data: activeOrg } = useActiveOrganization();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationPlan,
    onSuccess: (data) => {
      window.location.href = data.data!;
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Choisissez votre plan</h2>
        <p className="mt-2 text-muted-foreground">
          Sélectionnez le plan qui correspond le mieux à vos besoins
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
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
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
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
                onClick={async () =>
                  await mutateAsync({
                    organizationId: activeOrg?.id!,
                    plan: plan.priceId,
                  })
                }
              >
                Sélectionner {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
