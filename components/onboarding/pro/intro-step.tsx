"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2, Sparkles, Calendar, Receipt, Users, BarChart2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui"

const IntroStep = ({
  skipOnboarding,
  nextStep,
  isLoading,
}: {
  skipOnboarding: () => void
  nextStep: () => void
  isLoading: boolean
}) => {
  return (
    <div className="w-full h-full relative bg-background flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-between gap-3 px-4 sm:px-6 py-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2 w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span className="text-sm font-medium">Nouveau sur Biume Pro</span>
          </motion.div>

          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Créez votre{" "}
              <span className="relative">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="relative z-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                >
                  espace professionnel
                </motion.span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="absolute -bottom-1.5 left-0 right-0 h-2 bg-primary/10 -skew-x-6 -z-10"
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-sm sm:text-base text-muted-foreground"
            >
              Gérez votre établissement efficacement avec Biume Pro
            </motion.p>
          </div>
        </motion.div>

        {/* Image et fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full flex-1 flex flex-col lg:flex-row gap-4 items-center"
        >
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src="/assets/images/about-mission.jpg"
                alt="Aperçu de l'interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Gestion des rendez-vous",
                  icon: "calendar",
                  color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
                },
                {
                  title: "Facturation simplifiée",
                  icon: "receipt",
                  color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
                },
                {
                  title: "Suivi client personnalisé",
                  icon: "users",
                  color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
                },
                {
                  title: "Statistiques détaillées",
                  icon: "bar-chart",
                  color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-background shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon === "calendar" && <Calendar className="w-4 h-4" />}
                    {feature.icon === "receipt" && <Receipt className="w-4 h-4" />}
                    {feature.icon === "users" && <Users className="w-4 h-4" />}
                    {feature.icon === "bar-chart" && <BarChart2 className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-medium">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="flex flex-wrap items-center justify-end w-full gap-2 mt-auto"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="rounded-lg hover:scale-105 transition-transform"
            onClick={skipOnboarding}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Création en cours...</span>
              </>
            ) : (
              "Passer la configuration"
            )}
          </Button>
          <Button
            size="sm"
            className="rounded-lg px-4 shadow-lg shadow-primary/20 hover:shadow-primary/10 hover:scale-105 transition-all group"
            onClick={nextStep}
          >
            Commencer
            <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default IntroStep
