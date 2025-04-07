"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Bell,
  MessageCircle,
  FileText,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const features = [
  {
    icon: CalendarDays,
    title: "Prise de rendez-vous simplifiée",
    description:
      "Réservez facilement des consultations avec les soignants disponibles près de chez vous en quelques clics.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: HeartPulse,
    title: "Suivi santé complet",
    description:
      "Gardez un historique complet des soins, vaccins et traitements de vos animaux pour un meilleur suivi.",
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    icon: Bell,
    title: "Rappels intelligents",
    description:
      "Recevez des notifications pour les vaccins, traitements et rendez-vous à venir pour ne rien oublier.",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: MessageCircle,
    title: "Dossier médical numérique",
    description:
      "Accédez à l'historique complet des consultations et suivez l'évolution de la santé de vos animaux.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: FileText,
    title: "Ordonnances numériques",
    description:
      "Accédez à vos ordonnances en ligne et recevez des rappels pour les renouvellements.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Clock,
    title: "Gestion multi-animaux",
    description:
      "Gérez facilement plusieurs animaux de compagnie avec des profils distincts et un suivi personnalisé pour chacun.",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Accent de fond */}
      <div className="absolute top-1/2 right-0 -z-10 transform -translate-y-1/2 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"></div>
      <div className="absolute top-1/4 left-0 -z-10 transform -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-secondary/10 text-secondary">
              <Sparkles className="w-4 h-4" />
              <span>Fonctionnalités</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Des outils conçus pour simplifier la vie des propriétaires
              d&apos;animaux
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre plateforme vous offre tout ce dont vous avez besoin pour
              prendre soin de vos animaux de compagnie, sans tracas et en toute
              simplicité.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card hover:bg-card/80 transition-colors rounded-xl p-6 border shadow-sm"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-5",
                  feature.color,
                )}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
