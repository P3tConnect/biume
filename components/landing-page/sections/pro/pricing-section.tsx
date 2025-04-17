"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  CreditCard,
  X,
  Sparkles,
  Shield,
  Clock,
  Zap,
  Info,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type PricingPlan = {
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
  cta: string;
  isPopular?: boolean;
  badge?: string;
  icon: React.ElementType;
};

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Essentiel",
    description: "Pour les petites entreprises et les soignants indépendants",
    price: {
      monthly: 19.99,
      annually: 14.99,
    },
    features: [
      { text: "Gestion de clients illimitée", included: true },
      { text: "Gestion de la comptabilité", included: true },
      { text: "Gestion d'emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Réservation client", included: true },
      { text: "Paiement en ligne", included: true },
      { text: "Notifications et rappels", included: true },
      {
        text: "Biume AI",
        included: false,
      },
      { text: "Délais de rétractation", included: false },
      {
        text: "Gestion d'équipe",
        included: false,
      },
    ],
    cta: "Commencer l'essai gratuit",
    icon: Clock,
  },
  {
    id: "professional",
    name: "Professionnel",
    description: "Pour les entreprises en croissance avec plusieurs soignants",
    price: {
      monthly: 29.99,
      annually: 24.99,
    },
    features: [
      { text: "Gestion de clients illimitée", included: true },
      { text: "Gestion de la comptabilité", included: true },
      { text: "Gestion d'emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Réservation client", included: true },
      { text: "Paiement en ligne", included: true },
      {
        text: "Biume AI",
        included: true,
        explanation: "Inclus un contexte limité",
      },
      { text: "Notifications et rappels", included: true },
      { text: "Délais de rétractation", included: true },
      {
        text: "Gestion d'équipe",
        included: true,
        explanation: "Jusqu'à 5 membres",
      },
    ],
    cta: "Essai gratuit 1 mois",
    isPopular: true,
    badge: "Le plus choisi",
    icon: Sparkles,
  },
  {
    id: "enterprise",
    name: "Entreprise",
    description: "Pour les grandes structures",
    price: {
      monthly: 39.99,
      annually: 34.99,
    },
    features: [
      { text: "Gestion de clients illimitée", included: true },
      { text: "Gestion de la comptabilité", included: true },
      { text: "Gestion d'emploi du temps", included: true },
      { text: "Comptes rendus et observations", included: true },
      { text: "Réservation client", included: true },
      { text: "Paiement en ligne", included: true },
      {
        text: "Biume AI",
        included: true,
        explanation: "Notre model le plus intelligent",
      },
      { text: "Notifications et rappels", included: true },
      { text: "Délais de rétractation", included: true },
      {
        text: "Gestion d'équipe",
        included: true,
        explanation: "Jusqu'à 10 membres",
      },
    ],
    cta: "Démarrer l'essai gratuit",
    icon: Shield,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true);
  const [remainingSpots] = useState(500);

  const calculateDiscountedPrice = (price: number) => {
    if (showPromotion) {
      return (price * 0.8).toFixed(2);
    }
    return price.toFixed(2);
  };

  return (
    <section id="pricing" className="py-24 relative">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <CreditCard className="w-4 h-4" />
            <span>Tarifs transparents</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Des forfaits adaptés à tous les professionnels
          </h2>

          {/* Bannière de promotion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-amber-500/20 rounded-full blur-xl"></div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                Offre spéciale
              </Badge>
              <p className="text-base font-medium">
                <span className="text-amber-700 dark:text-amber-400 font-bold">
                  -20% supplémentaires
                </span>{" "}
                pour les 500 premiers inscrits !
              </p>
            </div>
            <div className="mt-2 text-sm text-center text-amber-700 dark:text-amber-400 font-medium">
              <span className="inline-flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Il ne reste que
                <br />
                <span className="font-bold mx-1">{remainingSpots}</span> places
                !
              </span>
            </div>
          </motion.div>

          <p className="text-lg text-muted-foreground mb-10">
            Choisissez l&apos;offre qui correspond le mieux à vos besoins.{" "}
            <span className="font-medium text-foreground">
              Tous nos forfaits incluent un mois d&apos;essai gratuit.
            </span>
          </p>

          {/* Sélecteur mensuel/annuel */}
          <div className="flex items-center justify-center gap-4 mb-8">
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
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "relative h-full flex flex-col transition-shadow duration-200",
                  plan.isPopular
                    ? "shadow-lg border-primary/50"
                    : "hover:shadow-md",
                )}
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
                          ? calculateDiscountedPrice(plan.price.annually)
                          : calculateDiscountedPrice(plan.price.monthly)}
                        €
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /mois
                      </span>
                    </div>

                    {showPromotion && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs line-through text-muted-foreground">
                          {isAnnual
                            ? plan.price.annually.toFixed(2)
                            : plan.price.monthly.toFixed(2)}
                          €
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
                        {(
                          parseFloat(
                            calculateDiscountedPrice(plan.price.annually),
                          ) * 12
                        ).toFixed(2)}
                        €)
                      </p>
                    )}

                    {/* Information sur la réduction */}
                    <p className="text-xs text-muted-foreground mt-2">
                      {isAnnual
                        ? "La réduction de 20% est appliquée sur l'ensemble de l'année."
                        : "La réduction de 20% est appliquée sur les 3 premiers mois."}
                    </p>
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
                              : "text-muted-foreground/70 bg-muted",
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
                            !feature.included && "text-muted-foreground/70",
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
                        : "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                    size="lg"
                    asChild
                  >
                    <Link href="#cta">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section FAQ ou Contact */}
        <Link href="/contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Besoin d&apos;une solution personnalisée ?
            </h3>
            <p className="text-muted-foreground mb-8">
              Nous proposons également des solutions sur mesure pour les grandes
              structures avec des besoins spécifiques.
            </p>
            <Button variant="outline" size="lg">
              Demander un devis personnalisé
            </Button>
          </motion.div>
        </Link>
      </div>
    </section >
  );
}
