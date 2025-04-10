"use client"

import React, { useEffect, useState } from "react"
import { getCurrentOrganization, updateOrganization } from "@/src/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  LayoutDashboard,
  Calendar,
  Users,
  Receipt,
  FileText,
  Loader2,
} from "lucide-react"
import { cn } from "@/src/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Animations variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

const stepItemVariants = {
  inactive: { scale: 0.95, opacity: 0.7 },
  active: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

const iconVariants = {
  initial: { rotate: 0, scale: 1 },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: {
      yoyo: Infinity,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
}

// Définition des steps
const STEPS = [
  {
    id: "dashboard",
    title: "Tableau de bord",
    description:
      "Visualisez vos statistiques principales, les demandes de rendez-vous et accédez rapidement à toutes les fonctionnalités.",
    content:
      "Votre tableau de bord vous offre une vision claire de votre activité. Vous y trouverez des widgets montrant vos statistiques essentielles, vos prochains rendez-vous et des actions rapides pour gérer votre cabinet.",
    details: [
      "Les statistiques principales affichent le nombre de rendez-vous du jour, de la semaine et du mois, ainsi que le taux de remplissage de votre agenda.",
      "Les demandes de rendez-vous en attente sont accessibles directement pour une validation rapide.",
      "Des raccourcis vers les fonctions les plus utilisées sont disponibles en haut de page.",
      "Le graphique d'activité vous permet de visualiser l'évolution de votre chiffre d'affaires sur différentes périodes.",
    ],
    icon: LayoutDashboard,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: "appointments",
    title: "Gestion des rendez-vous",
    description: "Planifiez, modifiez et suivez tous vos rendez-vous avec vos clients.",
    content:
      "Le calendrier vous permet de visualiser et d'organiser votre emploi du temps. Vous pouvez facilement ajouter, modifier ou annuler des rendez-vous, et envoyer des rappels automatiques à vos clients.",
    details: [
      "Visualisez votre agenda par jour, semaine ou mois selon vos préférences.",
      "Créez un rendez-vous en quelques clics en sélectionnant le client, l'animal, le type de consultation et la durée.",
      "Les rappels sont automatiquement envoyés par SMS ou email 24h avant le rendez-vous (paramétrable).",
      "Le système de code couleur vous permet d'identifier rapidement les types de consultations.",
    ],
    icon: Calendar,
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  {
    id: "clients",
    title: "Dossiers clients",
    description: "Gérez les informations de vos clients et de leurs animaux pour un suivi personnalisé.",
    content:
      "Centralisez toutes les informations sur vos clients et leurs animaux. Vous pouvez consulter l'historique des consultations, les traitements en cours, et ajouter des notes pour un suivi personnalisé.",
    details: [
      "Créez et gérez des fiches détaillées pour chaque client avec leurs coordonnées complètes.",
      "Ajoutez plusieurs animaux par propriétaire avec leur race, âge, poids et antécédents médicaux.",
      "Consultez l'historique complet des visites, traitements et factures pour chaque animal.",
      "Utilisez les tags personnalisés pour catégoriser vos clients (VIP, difficile à manipuler, etc.).",
    ],
    icon: Users,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    id: "billing",
    title: "Devis et factures",
    description: "Créez et envoyez des factures professionnelles à vos clients en quelques clics.",
    content:
      "Le module de facturation vous permet de générer des factures personnalisées pour vos prestations, de suivre les paiements et d'envoyer des rappels automatiques pour les factures impayées.",
    details: [
      "Créez des factures personnalisées avec votre logo et vos informations professionnelles.",
      "Ajoutez des prestations prédéfinies ou personnalisées avec tarifs et TVA.",
      "Suivez le statut des paiements (payé, en attente, retard) avec un tableau de bord dédié.",
      "Les paiements en ligne sont activés par défaut et vous pouvez configurer des frais d'annulation pour vous protéger contre les désistements de dernière minute.",
      "Exportez vos données financières pour votre comptabilité en un clic.",
    ],
    icon: Receipt,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    id: "reports",
    title: "Rapports et ordonnances",
    description: "Générez des rapports médicaux et des ordonnances pour vos patients animaux.",
    content:
      "Créez facilement des comptes rendus de consultation, des ordonnances personnalisées et des certificats médicaux. Tous ces documents peuvent être envoyés directement aux propriétaires d'animaux par email ou imprimés pour une remise en main propre.",
    details: [
      "Générez des ordonnances avec des modèles prédéfinis pour gagner du temps.",
      "Créez des comptes rendus détaillés de consultation avec images et graphiques.",
      "Émettez des certificats vétérinaires officiels (vaccination, bonne santé, etc.).",
      "Tous les documents sont archivés automatiquement dans le dossier du patient.",
    ],
    icon: FileText,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
]

export function OnboardingExplications() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const { data: org } = useQuery({
    queryKey: ["organization-infos"],
    queryFn: () => getCurrentOrganization({}),
  })

  const { mutateAsync: updateOrg } = useMutation({
    mutationFn: updateOrganization,
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: data => {
      console.log(data, "data")
      setIsLoading(false)
      // queryClient.invalidateQueries({ queryKey: ["organization-infos"] })
    },
  })

  useEffect(() => {
    if (org && org.data && org.data.onBoardingComplete === false) {
      setOpen(true)
    }
  }, [org])

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteOnboarding = async () => {
    await updateOrg({
      onBoardingComplete: true,
    })
    setOpen(false)
  }

  const isLastStep = currentStep === STEPS.length - 1
  const isFirstStep = currentStep === 0

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="sm:max-w-[800px] max-h-[90vh]">
        <CredenzaHeader>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <CredenzaTitle className="text-2xl">Bienvenue sur Biume !</CredenzaTitle>
          </motion.div>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CredenzaDescription>
              Découvrez toutes les fonctionnalités de notre application pour gérer efficacement votre activité.
            </CredenzaDescription>
          </motion.div>
        </CredenzaHeader>
        <CredenzaBody className="flex h-full overflow-hidden py-6">
          {/* Steps verticaux à gauche */}
          <div className="w-1/3 pr-4 border-r">
            <motion.div
              className="flex flex-col space-y-1"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {STEPS.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div key={step.id} className="flex flex-col" variants={itemVariants}>
                    <motion.button
                      onClick={() => setCurrentStep(index)}
                      className={cn(
                        "flex items-center p-3 text-left rounded-lg transition-colors",
                        currentStep === index ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                      )}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      animate={currentStep === index ? "active" : "inactive"}
                      variants={stepItemVariants}
                    >
                      <motion.div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full mr-3 text-sm shadow-sm transition-all",
                          currentStep >= index ? step.color : "bg-muted text-muted-foreground"
                        )}
                        whileHover="hover"
                        variants={iconVariants}
                      >
                        {index < currentStep ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </motion.div>
                      <div className="font-medium">{step.title}</div>
                    </motion.button>
                    {index < STEPS.length - 1 && (
                      <motion.div
                        className={cn(
                          "ml-[23px] h-[calc(100%-40px)] w-[2px]",
                          currentStep > index ? step.color.split(" ")[0] : "bg-border"
                        )}
                        initial={{ height: 0 }}
                        animate={{ height: "calc(100%-40px)" }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Contenu du step actif */}
          <div className="w-2/3 pl-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="space-y-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <motion.div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm",
                      STEPS[currentStep].color
                    )}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {React.createElement(STEPS[currentStep].icon, { className: "h-6 w-6" })}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-semibold"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {STEPS[currentStep].title}
                  </motion.h3>
                </motion.div>

                <motion.p
                  className="text-muted-foreground text-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {STEPS[currentStep].description}
                </motion.p>

                <div className="pt-4 mt-2 border-t">
                  <motion.div
                    className={cn("p-4 rounded-lg", STEPS[currentStep].color.split(" ")[0] + "/10")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <p className="text-base">{STEPS[currentStep].content}</p>
                  </motion.div>

                  <motion.div className="mt-6" initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.h4 className="font-medium text-lg mb-3" variants={itemVariants}>
                      Comment ça fonctionne :
                    </motion.h4>
                    <ul className="space-y-3">
                      {STEPS[currentStep].details.map((detail, index) => (
                        <motion.li key={index} className="flex items-start" variants={itemVariants} custom={index}>
                          <motion.div
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full mr-3 text-xs mt-0.5",
                              STEPS[currentStep].color
                            )}
                            whileHover={{ scale: 1.2 }}
                          >
                            {index + 1}
                          </motion.div>
                          <p>{detail}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="mt-4 flex items-start space-x-2 p-3 bg-muted/50 rounded-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <motion.div
                      className="bg-amber-100 p-2 rounded-full text-amber-700 shrink-0 dark:bg-amber-950 dark:text-amber-300"
                      whileHover={{ rotate: 20 }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      Accédez à cette fonctionnalité directement depuis la barre latérale ou via le tableau de bord
                      principal.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </CredenzaBody>
        <CredenzaFooter className="flex justify-between">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={prevStep} disabled={isFirstStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
          </motion.div>
          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
            {isLastStep ? (
              <Button onClick={handleCompleteOnboarding} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="ml-2 h-4 w-4" />}
                Terminer
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default OnboardingExplications
