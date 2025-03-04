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
  Settings,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string;
  delay: number;
};

const Feature = ({
  icon: Icon,
  title,
  description,
  colorClass,
  delay,
}: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
          colorClass,
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Gestion des rendez-vous",
      description:
        "Optimisez votre agenda avec un système de prise de rendez-vous intuitif et automatisé.",
      colorClass:
        "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400",
      delay: 0.1,
    },
    {
      icon: Users,
      title: "Gestion des clients",
      description:
        "Suivez l'historique complet de vos clients et leurs animaux en quelques clics.",
      colorClass:
        "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400",
      delay: 0.2,
    },
    {
      icon: BarChart3,
      title: "Analyses et statistiques",
      description:
        "Visualisez l'évolution de votre activité grâce à des tableaux de bord détaillés.",
      colorClass:
        "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400",
      delay: 0.3,
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description:
        "Échangez facilement avec vos clients via notre messagerie intégrée et sécurisée.",
      colorClass:
        "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
      delay: 0.4,
    },
    {
      icon: Stethoscope,
      title: "Dossiers médicaux",
      description:
        "Accédez aux antécédents médicaux complets des animaux pour un suivi optimal.",
      colorClass:
        "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400",
      delay: 0.5,
    },
    {
      icon: FileText,
      title: "Documents et factures",
      description:
        "Générez et envoyez automatiquement ordonnances, factures et certificats.",
      colorClass:
        "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400",
      delay: 0.6,
    },
    {
      icon: Clock,
      title: "Rappels automatiques",
      description:
        "Réduisez les rendez-vous manqués grâce à des notifications personnalisées.",
      colorClass:
        "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400",
      delay: 0.7,
    },
    {
      icon: Settings,
      title: "Personnalisation",
      description:
        "Adaptez l'interface à vos besoins spécifiques et à votre flux de travail.",
      colorClass:
        "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
      delay: 0.8,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-80 bg-gradient-to-tl from-primary/5 to-transparent"></div>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <BarChart3 className="w-4 h-4" />
            <span>Fonctionnalités professionnelles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tout ce dont vous avez besoin pour gérer votre activité
          </h2>
          <p className="text-lg text-muted-foreground">
            Biume regroupe tous les outils essentiels aux professionnels de la
            santé animale dans une interface moderne et intuitive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        <div className="mt-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden border shadow-xl">
                <Image
                  src="/assets/images/dashboard-image.jpg"
                  alt="Tableau de bord Biume"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
              {/* Éléments décoratifs */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Une interface conçue par et pour les professionnels de la santé
                animale
              </h3>
              <p className="text-lg mb-8 text-muted-foreground">
                Nous avons travaillé en étroite collaboration avec des
                professionnels de la santé animale pour créer un outil qui
                répond précisément à vos besoins quotidiens.
              </p>

              <ul className="space-y-4">
                {[
                  "Interface intuitive adaptée à votre flux de travail",
                  "Accès rapide aux informations essentielles",
                  "Fonctionnalités spécialisées pour différentes pratiques",
                  "Mises à jour régulières basées sur vos retours",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
