"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Stethoscope,
  FileText,
  Clock,
  Brain,
  UserPlus,
  MapPin,
  ChevronRight,
  Building2,
  ClipboardList,
  Wallet,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

type SubFeature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type CategoryProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string;
  delay: number;
  subFeatures: SubFeature[];
};

const Category = ({
  icon: Icon,
  title,
  description,
  colorClass,
  delay,
  subFeatures,
}: CategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Icon and Title */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              colorClass,
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Sub-features preview */}
        <ul className="space-y-2">
          {subFeatures.slice(0, 3).map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <feature.icon className="w-4 h-4 text-primary/60" />
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>

        <Credenza>
          <CredenzaTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between -mx-2 text-primary hover:text-primary hover:bg-primary/5"
            >
              Voir toutes les fonctionnalités{" "}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    colorClass,
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <CredenzaTitle>{title}</CredenzaTitle>
                  <CredenzaDescription>{description}</CredenzaDescription>
                </div>
              </div>
            </CredenzaHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {subFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center",
                      colorClass,
                    )}
                  >
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CredenzaContent>
        </Credenza>
      </div>
    </motion.div>
  );
};

export function FeaturesSection() {
  const categories = [
    {
      icon: Building2,
      title: "Gestion d'activité",
      description:
        "Tous les outils nécessaires pour gérer efficacement votre activité au quotidien.",
      colorClass:
        "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400",
      delay: 0.1,
      subFeatures: [
        {
          icon: Calendar,
          title: "Agenda intelligent",
          description:
            "Gestion avancée des rendez-vous avec synchronisation multi-supports",
        },
        {
          icon: Brain,
          title: "IA pour les rendez-vous",
          description: "Optimisation intelligente des créneaux et des tournées",
        },
        {
          icon: UserPlus,
          title: "Gestion des clients",
          description:
            "Base de données clients complète avec historique et suivi personnalisé",
        },
        {
          icon: MapPin,
          title: "Visites à domicile",
          description: "Organisation optimisée des déplacements et visites",
        },
      ],
    },
    {
      icon: Stethoscope,
      title: "Suivi Médical",
      description:
        "Un suivi médical complet et précis pour chaque animal avec des outils d'aide à la décision.",
      colorClass:
        "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
      delay: 0.2,
      subFeatures: [
        {
          icon: ClipboardList,
          title: "Dossiers médicaux",
          description: "Dossiers médicaux électroniques détaillés et sécurisés",
        },
        {
          icon: FileText,
          title: "Ordonnances",
          description: "Génération et suivi des ordonnances numériques",
        },
        {
          icon: Clock,
          title: "Suivis post-consultation",
          description:
            "Planification des prochains rendez-vous et rappels automatiques",
        },
        {
          icon: FileText,
          title: "Compte-rendus",
          description:
            "Rédaction et partage des comptes-rendus de consultation",
        },
      ],
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description:
        "Des outils de communication modernes pour maintenir le lien avec vos clients.",
      colorClass:
        "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400",
      delay: 0.3,
      subFeatures: [
        {
          icon: MessageSquare,
          title: "Messagerie sécurisée",
          description:
            "Échanges sécurisés avec les propriétaires (Bientôt disponible)",
        },
        {
          icon: Calendar,
          title: "Prise de RDV en ligne",
          description: "Interface de réservation en ligne pour les clients",
        },
        {
          icon: FileText,
          title: "Documents partagés",
          description: "Partage sécurisé de documents et résultats",
        },
        {
          icon: Users,
          title: "Communication d'équipe",
          description:
            "Outils de collaboration pour l'équipe soignante (Bientôt disponible)",
        },
      ],
    },
    {
      icon: Wallet,
      title: "Gestion Administrative",
      description:
        "Simplifiez votre gestion administrative et financière au quotidien.",
      colorClass:
        "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400",
      delay: 0.4,
      subFeatures: [
        {
          icon: FileText,
          title: "Facturation",
          description: "Génération et suivi des factures automatisé",
        },
        {
          icon: BarChart3,
          title: "Statistiques",
          description: "Tableaux de bord et analyses de l'activité",
        },
        {
          icon: ClipboardList,
          title: "Gestion des stocks",
          description:
            "Suivi et commandes automatiques des stocks (Bientôt disponible)",
        },
        {
          icon: Users,
          title: "Gestion d'équipe",
          description:
            "Organisation des plannings et coordination de l'équipe soignante",
        },
      ],
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <BarChart3 className="w-4 h-4" />
            <span>Fonctionnalités professionnelles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une solution complète pour votre activité
          </h2>
          <p className="text-muted-foreground">
            Découvrez nos quatre grands pôles de fonctionnalités conçus pour
            répondre à tous vos besoins professionnels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
