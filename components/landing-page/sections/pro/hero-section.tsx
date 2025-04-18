"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  FileText,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const features = [
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Agenda intelligent",
      description: "Système de prise de rendez-vous avec rappels automatiques",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Dossiers médicaux",
      description: "Historique complet et suivi personnalisé de chaque patient",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Facturation simplifiée",
      description: "Devis, factures et paiements en ligne en quelques clics",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Rapports et ordonnances",
      description: "Génération et envoi automatisés de documents médicaux",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-24 pb-20 md:pt-32 md:pb-32">
      {/* Éléments décoratifs avec effet parallaxe */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] bg-repeat"></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <BadgeCheck className="w-4 h-4" />
                <span>
                  Solution complète pour professionnels de la santé animale
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Révolutionnez la gestion de votre{" "}
              <span className="text-primary relative text-gradient">
                activité animalière
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Biume Pro transforme votre pratique professionnelle avec une suite
              d&apos;outils intégrés, conçue spécifiquement pour les métiers du
              soin animalier.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 p-1.5 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <Button asChild size="lg" className="h-12 px-8 font-medium">
                <Link href="#cta">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 font-medium"
              >
                <Link href="#features">Découvrir les fonctionnalités</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image d'illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Élément décoratif */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl"></div>

            <div className="relative z-10 rounded-2xl overflow-hidden border shadow-2xl">
              <Image
                src="/assets/images/about-mission.jpg"
                alt="Interface Biume Pro"
                width={720}
                height={540}
                className="w-full h-auto"
                priority
              />

              {/* Overlay effet verre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none"></div>
            </div>

            {/* Élément décoratif */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-primary/30 rounded-br-3xl"></div>

            {/* Stats flottantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-6 left-10 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">+68%</p>
                  <p className="text-xs text-muted-foreground">
                    de satisfaction client
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -top-6 right-10 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">-40%</p>
                  <p className="text-xs text-muted-foreground">
                    de temps administratif
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
