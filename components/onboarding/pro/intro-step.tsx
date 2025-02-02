"use client";

import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";

const IntroStep = ({ skipOnboarding, nextStep }: { skipOnboarding: () => void, nextStep: () => void }) => {
  return (
    <div className="w-full h-full relative bg-background">
      <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-sm font-medium">Nouveau sur Biume Pro</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-3xl font-bold tracking-tight"
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
              className="text-base text-muted-foreground"
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
          className="w-full mt-6 flex gap-6"
        >
          <div className="flex-1">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/assets/images/login-image.jpg"
                alt="Aperçu de l'interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-3">
              {[
                "Gestion des rendez-vous",
                "Facturation simplifiée",
                "Suivi client personnalisé",
                "Statistiques détaillées",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  className="group flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors"
                >
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium">{feature}</span>
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
          className="flex items-center gap-3 mt-6"
        >
          <Button
            variant="outline"
            size="default"
            className="rounded-lg hover:scale-105 transition-transform"
          >
            Retour
          </Button>
          <Button
            size="default"
            className="rounded-lg px-6 shadow-lg shadow-primary/20 hover:shadow-primary/10 hover:scale-105 transition-all group"
            onClick={nextStep}
          >
            Commencer
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="ghost"
            size="default"
            className="rounded-lg hover:scale-105 transition-transform"
            onClick={skipOnboarding}
          >
            Passer la configuration
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroStep;
