"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  X,
  Sparkles,
  Shield,
  Clock,
  Zap,
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
    description: "Pour les petites cliniques et les vétérinaires indépendants",
    price: {
      monthly: 29.99,
      annually: 24.99,
    },
    features: [
      { text: "Gestion de 500 clients", included: true },
      { text: "5 utilisateurs inclus", included: true },
      { text: "Gestion des rendez-vous", included: true },
      { text: "Dossiers médicaux de base", included: true },
      { text: "Facturation simple", included: true },
      { text: "Stockage de documents 5 GB", included: true },
      { text: "Support par email", included: true },
      { text: "Accès à Biume AI limité", included: false },
      { text: "Rappels personnalisables", included: false },
      { text: "Rapports avancés", included: false },
    ],
    cta: "Essai gratuit 14 jours",
    icon: Clock,
  },
  {
    id: "professional",
    name: "Professionnel",
    description: "Pour les cliniques en croissance avec plusieurs vétérinaires",
    price: {
      monthly: 59.99,
      annually: 49.99,
    },
    features: [
      { text: "Gestion de clients illimitée", included: true },
      { text: "15 utilisateurs inclus", included: true },
      { text: "Gestion avancée des rendez-vous", included: true },
      { text: "Dossiers médicaux complets", included: true },
      { text: "Facturation & devis personnalisés", included: true },
      { text: "Stockage de documents 25 GB", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Accès à Biume AI standard", included: true },
      { text: "Rappels personnalisables", included: true },
      { text: "Rapports avancés", included: false },
    ],
    cta: "Commencer maintenant",
    isPopular: true,
    badge: "Le plus choisi",
    icon: Sparkles,
  },
  {
    id: "enterprise",
    name: "Entreprise",
    description: "Pour les grandes structures vétérinaires multi-sites",
    price: {
      monthly: 99.99,
      annually: 84.99,
    },
    features: [
      { text: "Gestion de clients illimitée", included: true },
      { text: "Utilisateurs illimités", included: true },
      { text: "Gestion avancée des rendez-vous", included: true },
      { text: "Dossiers médicaux complets", included: true },
      { text: "Facturation & devis personnalisés", included: true },
      { text: "Stockage de documents illimité", included: true },
      { text: "Support dédié 24/7", included: true },
      { text: "Accès à Biume AI premium", included: true },
      { text: "Rappels personnalisables", included: true },
      { text: "Rapports avancés & analytics", included: true },
    ],
    cta: "Contacter les ventes",
    icon: Shield,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

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
          <p className="text-lg text-muted-foreground mb-10">
            Choisissez l&apos;offre qui correspond le mieux à vos besoins. Tous
            nos forfaits incluent une garantie de remboursement de 30 jours.
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
                          ? plan.price.annually.toFixed(2)
                          : plan.price.monthly.toFixed(2)}
                        €
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /mois
                      </span>
                    </div>

                    {isAnnual && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Facturé annuellement (
                        {(plan.price.annually * 12).toFixed(2)}€)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
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
                            "text-sm",
                            !feature.included && "text-muted-foreground/70",
                          )}
                        >
                          {feature.text}
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
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section FAQ ou Contact */}
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
      </div>
    </section>
  );
}
