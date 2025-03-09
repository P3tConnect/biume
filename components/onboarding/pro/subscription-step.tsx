"use client";

import { useState } from "react";
import {
  Check,
  Loader2,
  X,
  CreditCard,
  Shield,
  Clock,
  Sparkles,
  Info,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Type pour les plans d'abonnement
type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: {
    text: string;
    included: boolean;
    explanation?: string;
  }[];
  isPopular?: boolean;
  badge?: string;
  icon: React.ElementType;
  monthlyPriceId: string;
  yearlyPriceId: string;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Essentiel",
    description: "Pour les professionnels indépendants",
    price: {
      monthly: 19.99,
      annually: 14.99,
    },
    features: [
      { text: "Gestion Client", included: true },
      { text: "Facturation et devis", included: true },
      { text: "Emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Comptabilité", included: true },
      { text: "Partage de dossier client", included: true },
      { text: "Paiement en ligne", included: true },
      { text: "Réservation client", included: true },
      { text: "Biume AI", included: false },
      { text: "Notifications", included: false },
      { text: "Rappels automatiques", included: false },
      { text: "Délais de rétraction", included: false },
      { text: "Echelons de remboursement", included: false },
      { text: "Gestion d'équipe", included: false },
      { text: "Communication centralisée", included: false },
      { text: "Rapports de performance", included: false },
    ],
    icon: Clock,
    monthlyPriceId: safeConfig.STRIPE_BASIC_PLAN_MONTHLY_ID,
    yearlyPriceId: safeConfig.STRIPE_BASIC_PLAN_YEARLY_ID,
  },
  {
    id: "pro",
    name: "Professionnel",
    description: "Pour les petites équipes",
    price: {
      monthly: 29.99,
      annually: 24.99,
    },
    features: [
      { text: "Gestion Client", included: true },
      { text: "Facturation et devis", included: true },
      { text: "Emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Comptabilité", included: true },
      { text: "Partage de dossier client", included: true },
      { text: "Paiement en ligne", included: true },
      { text: "Réservation client", included: true },
      {
        text: "Biume AI",
        included: true,
        explanation: "Accès limité aux fonctionnalités IA",
      },
      { text: "Notifications", included: true },
      { text: "Rappels automatiques", included: true },
      { text: "Délais de rétraction", included: true },
      { text: "Echelons de remboursement", included: true },
      {
        text: "Gestion d'équipe",
        included: true,
        explanation: "Jusqu'à 5 employés",
      },
      { text: "Communication centralisée", included: false },
      { text: "Rapports de performance", included: false },
    ],
    isPopular: true,
    badge: "Le plus choisi",
    icon: Sparkles,
    monthlyPriceId: safeConfig.STRIPE_PRO_PLAN_MONTHLY_ID,
    yearlyPriceId: safeConfig.STRIPE_PRO_PLAN_YEARLY_ID,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    description: "Pour les moyennes et grandes structures",
    price: {
      monthly: 39.99,
      annually: 34.99,
    },
    features: [
      { text: "Gestion Client", included: true },
      { text: "Facturation et devis", included: true },
      { text: "Emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Comptabilité", included: true },
      { text: "Partage de dossier client", included: true },
      { text: "Paiement en ligne", included: true },
      { text: "Réservation client", included: true },
      {
        text: "Biume AI",
        included: true,
        explanation: "Accès complet aux fonctionnalités IA avancées",
      },
      { text: "Notifications", included: true },
      { text: "Rappels automatiques", included: true },
      { text: "Délais de rétraction", included: true },
      { text: "Echelons de remboursement", included: true },
      {
        text: "Gestion d'équipe",
        included: true,
        explanation: "Jusqu'à 10 employés",
      },
      { text: "Communication centralisée", included: true },
      { text: "Rapports de performance", included: true },
    ],
    icon: Shield,
    monthlyPriceId: safeConfig.STRIPE_ULTIMATE_PLAN_MONTHLY_ID,
    yearlyPriceId: safeConfig.STRIPE_ULTIMATE_PLAN_YEARLY_ID,
  },
];

export function SubscriptionStep() {
  const { data: activeOrg } = useActiveOrganization();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationPlan,
    onSuccess: (data) => {
      console.log(data, "url for stripe redirect");
      window.location.href = data.data!;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error: { message: string }) => {
      setIsLoading(false);
      toast.error(error.message);
    },
  });

  // Souscription au plan sélectionné
  const handleSubscription = async (plan: SubscriptionPlan) => {
    const priceId = isAnnual ? plan.yearlyPriceId : plan.monthlyPriceId;
    await mutateAsync({
      organizationId: activeOrg?.id!,
      plan: priceId,
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
          <CreditCard className="w-4 h-4" />
          <span>Abonnement Biume</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Choisissez votre plan
        </h2>

        <p className="text-lg text-muted-foreground mb-10">
          Sélectionnez l&apos;offre qui correspond le mieux à vos besoins.{" "}
          <span className="font-medium text-foreground">
            Tous nos plans incluent un essai gratuit.
          </span>
        </p>

        {/* Sélecteur mensuel/annuel */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            className={cn(
              "text-sm",
              !isAnnual
                ? "font-medium text-foreground"
                : "text-muted-foreground"
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
                : "text-muted-foreground"
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
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
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
                selectedPlan === plan.id && "border-primary shadow-lg"
              )}
              onClick={() => setSelectedPlan(plan.id)}
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
                  plan.isPopular ? "pb-0" : ""
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                    plan.isPopular
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <plan.icon className="w-6 h-6" />
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
                        ? plan.price.annually
                        : plan.price.monthly}
                      €
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /mois
                    </span>
                  </div>

                  {isAnnual && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Facturé annuellement ({(plan.price.annually * 12).toFixed(2)}€)
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {/* Badge d'essai gratuit */}
                  <li className="flex items-center justify-center bg-primary/5 rounded-md p-2 mb-2">
                    <span className="text-sm font-medium text-primary flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Premier mois gratuit
                    </span>
                  </li>

                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                          feature.included
                            ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                            : "text-muted-foreground/70 bg-muted"
                        )}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm flex items-center gap-1.5",
                          !feature.included && "text-muted-foreground/70"
                        )}
                      >
                        {feature.text}
                        {feature.explanation && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                <Info className="w-3.5 h-3.5 text-muted-foreground/80" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {feature.explanation}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </span>
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
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                  size="lg"
                  disabled={isLoading}
                  onClick={() => handleSubscription(plan)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>En cours...</span>
                    </>
                  ) : (
                    `Sélectionner ${plan.name}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Section d'aide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 text-center max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">
          Besoin d&apos;aide pour choisir?
        </h3>
        <p className="text-muted-foreground mb-6">
          Si vous avez des questions sur nos plans ou si vous avez besoin d&apos;une solution personnalisée, n&apos;hésitez pas à nous contacter.
        </p>
        <Button variant="outline" size="lg">
          Contactez-nous
        </Button>
      </motion.div>
    </div>
  );
}
