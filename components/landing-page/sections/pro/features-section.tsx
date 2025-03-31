"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Brain,
  CreditCard,
  Clock,
  Users,
  FileText,
  Building2,
  Wallet,
  ClipboardList,
  CalendarDays,
  UserPlus,
  Stethoscope,
  FileCheck,
  PenTool,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type SubFeature = {
  title: string;
  icon: React.ElementType;
};

type Category = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  features: SubFeature[];
};

const categories: Category[] = [
  {
    icon: Calendar,
    title: "Gestion des rendez-vous",
    description: "Optimisez votre planning et la prise de rendez-vous",
    color: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400",
    features: [
      {
        title: "Réservation client",
        icon: UserPlus,
      },
      {
        title: "Gestion d'emploi du temps",
        icon: CalendarDays,
      },
      {
        title: "Biume AI",
        icon: Brain,
      },
    ],
  },
  {
    icon: ClipboardList,
    title: "Suivi médical",
    description: "Gérez efficacement vos dossiers patients",
    color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
    features: [
      {
        title: "Dossiers patients et clients",
        icon: Stethoscope,
      },
      {
        title: "Comptes rendus",
        icon: FileCheck,
      },
      {
        title: "Ordonnances",
        icon: PenTool,
      },
    ],
  },
  {
    icon: Building2,
    title: "Gestion administrative",
    description: "Simplifiez votre gestion administrative et financière",
    color: "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400",
    features: [
      {
        title: "Paiement en ligne",
        icon: CreditCard,
      },
      {
        title: "Gestion de comptabilité",
        icon: Wallet,
      },
      {
        title: "Gestion d'équipe",
        icon: Users,
      },
    ],
  },
];

export function FeaturesSection() {
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
            Tout ce dont vous avez besoin pour votre activité
          </h2>
          <p className="text-muted-foreground">
            Une suite complète d&apos;outils pour gérer et développer votre pratique professionnelle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                      category.color,
                    )}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground">{category.description}</p>

                <div className="h-px bg-border" />

                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", category.color)}>
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{feature.title}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 p-2 mt-2 border-t">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center opacity-60", category.color)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-muted-foreground italic">
                      Et plus encore...
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
