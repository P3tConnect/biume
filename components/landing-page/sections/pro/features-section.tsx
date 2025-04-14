"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Brain,
  CreditCard,
  Users,
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
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type SubFeature = {
  title: string;
  icon: React.ElementType;
  description: string;
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
        description: "Permettez à vos clients de prendre rendez-vous en ligne facilement.",
      },
      {
        title: "Gestion d'emploi du temps",
        icon: CalendarDays,
        description: "Visualisez et organisez votre planning et celui de votre équipe.",
      },
      {
        title: "Biume AI",
        icon: Brain,
        description: "Laissez l'IA optimiser vos prises de rendez-vous et votre communication.",
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
        description: "Centralisez toutes les informations importantes de vos patients et clients.",
      },
      {
        title: "Comptes rendus",
        icon: FileCheck,
        description: "Générez et stockez facilement vos comptes rendus médicaux ou de suivi.",
      },
      {
        title: "Ordonnances",
        icon: PenTool,
        description: "Créez et gérez les ordonnances de manière numérique et sécurisée.",
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
        description: "Acceptez les paiements de vos clients directement en ligne.",
      },
      {
        title: "Gestion de comptabilité",
        icon: Wallet,
        description: "Suivez vos revenus, dépenses et générez des rapports financiers.",
      },
      {
        title: "Gestion d'équipe",
        icon: Users,
        description: "Organisez les rôles, permissions et plannings de vos collaborateurs.",
      },
    ],
  },
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export function FeaturesSection() {
  // États pour contrôler les modales secondaires
  const [openAboutModal, setOpenAboutModal] = useState<boolean>(false);
  const [openFeatureModal, setOpenFeatureModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{ categoryIndex: number, featureIndex: number } | null>(null);

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
            <Credenza key={index}>
              <CredenzaTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
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
                      {category.features.slice(0, 3).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <div className={cn("w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0", category.color)}>
                            <feature.icon className="w-3 h-3" />
                          </div>
                          <span className="text-sm font-medium truncate">{feature.title}</span>
                        </li>
                      ))}
                      {category.features.length > 3 && (
                        <li className="flex items-center gap-3 pt-2 border-t mt-3">
                          <div className={cn("w-6 h-6 rounded-md flex items-center justify-center opacity-60 flex-shrink-0", category.color)}>
                            <MoreHorizontal className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-muted-foreground italic">
                            Et plus encore...
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </CredenzaTrigger>
              <CredenzaContent className="w-[90vw] sm:max-w-[800px] p-0 overflow-hidden">
                <VisuallyHidden>
                  <CredenzaTitle>{category.title}</CredenzaTitle>
                </VisuallyHidden>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-none"
                >
                  {/* Left sidebar with category info */}
                  <div className={cn(
                    "relative p-4 md:p-6 flex flex-col text-white md:w-1/3",
                    category.color.includes("blue") ? "bg-blue-600" :
                      category.color.includes("emerald") ? "bg-emerald-600" :
                        "bg-purple-600"
                  )}>
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="M0,0 L100,0 C95,20 90,40 80,60 C70,80 55,90 40,95 C25,100 10,100 0,100 Z" />
                      </svg>
                    </div>

                    <div className="relative">
                      <Badge variant="outline" className="mb-2 md:mb-3 text-white border-white/20 bg-white/10 text-xs md:text-sm">
                        Fonctionnalité Premium
                      </Badge>

                      <div className="mb-4 md:mb-6">
                        <div className="rounded-full bg-white/20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
                          <category.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{category.title}</h2>
                        <p className="text-white/80 text-xs md:text-sm">{category.description}</p>
                      </div>

                      <div className="mt-auto hidden md:block">
                        <h3 className="text-xs md:text-sm font-medium mb-1 md:mb-2">Points clés</h3>
                        <ul className="space-y-1 md:space-y-2 text-white/80 text-[11px] md:text-xs">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            Facilité d&apos;utilisation
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            Intégration complète
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            Personnalisation avancée
                          </li>
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        className="mt-4 md:mt-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white text-xs md:text-sm py-1 h-auto md:h-9 md:py-2"
                        onClick={() => {
                          setSelectedCategory(index);
                          setOpenAboutModal(true);
                        }}
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </div>

                  {/* Right content area */}
                  <div className="flex-1 p-0">
                    <div className="w-full h-full">
                      <div className="px-4 md:px-6 pt-3 md:pt-4 pb-2 border-b sticky top-0 bg-background z-10">
                        <h3 className="text-base md:text-lg font-semibold">Fonctionnalités</h3>
                      </div>

                      <ScrollArea className="h-[300px] sm:h-[350px] md:h-[500px]">
                        <motion.div
                          className="p-4 md:p-6 grid grid-cols-1 gap-3 md:gap-4"
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                        >
                          {category.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              variants={itemVariants}
                              className="group relative overflow-hidden rounded-lg md:rounded-xl border bg-background transition-all duration-300 hover:shadow-md"
                            >
                              <div className="absolute inset-0 h-1 bg-gradient-to-r opacity-30 transition-all group-hover:opacity-100"
                                style={{
                                  background: category.color.includes("blue") ? "linear-gradient(90deg, #60a5fa, #3b82f6)" :
                                    category.color.includes("emerald") ? "linear-gradient(90deg, #34d399, #10b981)" :
                                      "linear-gradient(90deg, #a78bfa, #8b5cf6)"
                                }}
                              ></div>

                              <div className="p-3 md:p-5">
                                <div className="flex items-start gap-3 md:gap-4">
                                  <div className={cn(
                                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                    category.color.replace("dark:bg", "bg").replace("/50", "/20")
                                  )}>
                                    {feature.icon && React.createElement(feature.icon, { className: "w-4 h-4 md:w-5 md:h-5" })}
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-0.5 md:mb-1">
                                      <h4 className="font-medium text-sm md:text-base">{feature.title}</h4>
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>

                                    <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t flex justify-between items-center">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 md:h-7 gap-1 text-[10px] md:text-xs px-2 md:px-3"
                                        onClick={() => {
                                          setSelectedFeature({
                                            categoryIndex: index,
                                            featureIndex: featureIndex
                                          });
                                          setOpenFeatureModal(true);
                                        }}
                                      >
                                        Explorer
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </ScrollArea>
                    </div>
                  </div>
                </motion.div>
              </CredenzaContent>
            </Credenza>
          ))}
        </div>
      </div>

      {/* Modale "En savoir plus" sur la catégorie */}
      <Credenza open={openAboutModal} onOpenChange={setOpenAboutModal}>
        <CredenzaContent className="w-[90vw] max-w-[400px] sm:max-w-[550px]">
          {selectedCategory !== null && (
            <>
              <CredenzaHeader className="border-b pb-3 md:pb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center",
                    categories[selectedCategory].color
                  )}>
                    {React.createElement(categories[selectedCategory].icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <div>
                    <CredenzaTitle className="text-lg md:text-xl leading-tight">
                      {categories[selectedCategory].title}
                    </CredenzaTitle>
                    <CredenzaDescription className="text-xs md:text-sm">
                      Aperçu des fonctionnalités disponibles
                    </CredenzaDescription>
                  </div>
                </div>
              </CredenzaHeader>

              <div className="py-3 md:py-4 px-1">
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  {categories[selectedCategory].description}
                  {' '}
                  {categories[selectedCategory].title === "Gestion des rendez-vous" &&
                    "Notre système de gestion des rendez-vous simplifie l'organisation de votre emploi du temps et celui de votre équipe. Nous avons intégré des technologies d'IA pour optimiser vos plannings et minimiser les temps morts. Les clients peuvent réserver en ligne à tout moment, recevoir des rappels automatiques et gérer leurs rendez-vous de façon autonome, réduisant significativement la charge administrative de votre établissement."
                  }
                  {categories[selectedCategory].title === "Suivi médical" &&
                    "Notre module de suivi médical offre une solution complète pour gérer les dossiers de vos patients. Les données médicales sont organisées de manière intuitive, avec un historique complet et des alertes personnalisables. La génération de comptes rendus et d'ordonnances se fait en quelques clics, avec des modèles personnalisables selon vos besoins spécifiques. Toutes les données sont sécurisées et conformes aux réglementations en vigueur."
                  }
                  {categories[selectedCategory].title === "Gestion administrative" &&
                    "Notre outil de gestion administrative centralise la facturation, la comptabilité et les ressources humaines en un seul endroit. Le système de paiement en ligne sécurisé facilite les transactions et génère automatiquement les factures. Le suivi financier vous donne une vision claire de votre activité avec des tableaux de bord personnalisables. La gestion d'équipe intégrée permet d'organiser les plannings, suivre les performances et gérer les accès selon les rôles de chacun."
                  }
                </p>

                <div className="bg-muted/30 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <h3 className="text-sm md:text-base font-medium mb-2">Points clés</h3>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-xs md:text-sm">{categories[selectedCategory].title === "Gestion des rendez-vous" ?
                        "Réduction de 40% du temps consacré à la gestion des plannings" :
                        categories[selectedCategory].title === "Suivi médical" ?
                          "Accès instantané à l'historique complet des patients" :
                          "Réduction des tâches administratives de 30%"
                      }</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-xs md:text-sm">{categories[selectedCategory].title === "Gestion des rendez-vous" ?
                        "Diminution de 65% des rendez-vous manqués grâce aux rappels automatiques" :
                        categories[selectedCategory].title === "Suivi médical" ?
                          "Gestion paperless complète des dossiers médicaux" :
                          "Visibilité en temps réel sur les indicateurs financiers clés"
                      }</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-xs md:text-sm">{categories[selectedCategory].title === "Gestion des rendez-vous" ?
                        "Interface intuitive accessible sur tous les appareils" :
                        categories[selectedCategory].title === "Suivi médical" ?
                          "Conformité totale avec les réglementations de protection des données" :
                          "Intégration avec les principaux logiciels de comptabilité"
                      }</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-3 md:mb-4">
                  <p className="text-xs md:text-sm italic text-muted-foreground">
                    {categories[selectedCategory].title === "Gestion des rendez-vous" ?
                      "« Biume a transformé notre manière de gérer nos rendez-vous. L'interface est intuitive et nos clients apprécient la simplicité du système de réservation en ligne. »" :
                      categories[selectedCategory].title === "Suivi médical" ?
                        "« Le module de suivi médical nous permet un accès rapide et organisé aux informations de nos patients. Un gain de temps considérable dans notre pratique quotidienne. »" :
                        "« La gestion administrative simplifiée nous a permis de réduire drastiquement le temps consacré aux tâches administratives pour nous concentrer sur nos patients. »"
                    }
                  </p>
                  <p className="text-xs md:text-sm text-right mt-1 md:mt-2 font-medium">
                    — {categories[selectedCategory].title === "Gestion des rendez-vous" ?
                      "Dr. Sophie Martin, Clinique vétérinaire du Parc" :
                      categories[selectedCategory].title === "Suivi médical" ?
                        "Dr. Thomas Bernard, Cabinet vétérinaire des Alpes" :
                        "Marion Dubois, Responsable administrative, Centre animalier Patte Douce"
                    }
                  </p>
                </div>

                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t flex justify-end">
                  <Button size="sm" className="text-xs md:text-sm h-8 md:h-9">
                    Découvrir notre offre complète
                  </Button>
                </div>
              </div>
            </>
          )}
        </CredenzaContent>
      </Credenza>

      {/* Modale détaillée pour une fonctionnalité spécifique */}
      <Credenza open={openFeatureModal} onOpenChange={setOpenFeatureModal}>
        <CredenzaContent className="w-[90vw] max-w-[400px] sm:max-w-[550px] md:max-w-[650px]">
          {selectedFeature !== null && (
            <>
              <CredenzaHeader className="border-b pb-3 md:pb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center",
                    categories[selectedFeature.categoryIndex].color.replace("dark:bg", "bg").replace("/50", "/20")
                  )}>
                    {React.createElement(
                      categories[selectedFeature.categoryIndex].features[selectedFeature.featureIndex].icon,
                      { className: "w-5 h-5 md:w-6 md:h-6" }
                    )}
                  </div>
                  <div>
                    <CredenzaTitle className="text-lg md:text-xl leading-tight">
                      {categories[selectedFeature.categoryIndex].features[selectedFeature.featureIndex].title}
                    </CredenzaTitle>
                    <CredenzaDescription className="text-xs md:text-sm">
                      Détails et configuration avancée
                    </CredenzaDescription>
                  </div>
                </div>
              </CredenzaHeader>

              <div className="py-3 md:py-4 px-1">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2">À propos de cette fonctionnalité</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {categories[selectedFeature.categoryIndex].features[selectedFeature.featureIndex].description}
                      {' '}Cette fonctionnalité a été conçue pour répondre aux besoins spécifiques des professionnels de la santé animale qui cherchent à optimiser leur pratique quotidienne.
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Comment l&apos;utiliser ?</h3>
                    <ol className="space-y-1 md:space-y-2 text-xs md:text-sm pl-4 md:pl-5 list-decimal">
                      <li>Accédez à la section correspondante depuis votre tableau de bord</li>
                      <li>Configurez les paramètres selon vos besoins spécifiques</li>
                      <li>Commencez à utiliser la fonctionnalité immédiatement</li>
                      <li>Consultez les guides d&apos;utilisation détaillés dans notre centre d&apos;aide</li>
                    </ol>
                  </div>

                  {/* Exemples d'utilisation */}
                  <div>
                    <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Exemples d&apos;utilisation</h3>
                    <div className="grid grid-cols-1 gap-2 md:gap-3 text-xs md:text-sm">
                      <div className="border rounded-md p-2 md:p-3 hover:bg-muted/20 transition-colors">
                        <h4 className="font-medium text-xs md:text-sm">Cas d&apos;usage 1</h4>
                        <p className="text-muted-foreground text-[11px] md:text-xs">Adaptation pour une clinique vétérinaire de taille moyenne</p>
                      </div>
                      <div className="border rounded-md p-2 md:p-3 hover:bg-muted/20 transition-colors">
                        <h4 className="font-medium text-xs md:text-sm">Cas d&apos;usage 2</h4>
                        <p className="text-muted-foreground text-[11px] md:text-xs">Solution pour un cabinet indépendant spécialisé</p>
                      </div>
                    </div>
                  </div>

                  {/* Avis clients */}
                  <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2 flex items-center gap-2">
                      Avis clients
                      <div className="flex items-center">
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i} className="text-amber-500 text-[10px] md:text-xs">
                            {star}
                          </span>
                        ))}
                      </div>
                    </h3>
                    <div className="italic text-xs md:text-sm text-muted-foreground">
                      Cette fonctionnalité a révolutionné ma façon de travailler. Je gagne plusieurs heures
                      par semaine et mes clients sont ravis du service amélioré.
                    </div>
                  </div>

                  <div className="pt-2 md:pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs md:text-sm text-muted-foreground">Disponible dans tous les forfaits</span>
                    <Credenza>
                      <CredenzaTrigger asChild>
                        <Button size="sm" className="w-full sm:w-auto text-xs md:text-sm h-8 md:h-9">Essayer gratuitement</Button>
                      </CredenzaTrigger>
                      <CredenzaContent className="w-[90vw] max-w-[350px]">
                        <CredenzaHeader>
                          <CredenzaTitle className="text-lg">Essai gratuit</CredenzaTitle>
                          <CredenzaDescription className="text-xs md:text-sm">
                            Inscrivez-vous pour un essai gratuit de 30 jours sans engagement.
                          </CredenzaDescription>
                        </CredenzaHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <p className="text-center text-xs md:text-sm text-muted-foreground">
                              En cliquant sur le bouton ci-dessous, vous serez redirigé vers notre formulaire d&apos;inscription.
                            </p>
                          </div>
                          <Button className="text-xs md:text-sm">Commencer l&apos;essai gratuit</Button>
                        </div>
                      </CredenzaContent>
                    </Credenza>
                  </div>
                </div>
              </div>
            </>
          )}
        </CredenzaContent>
      </Credenza>
    </section >
  );
}
