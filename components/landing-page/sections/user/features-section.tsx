"use client"

import { motion } from "framer-motion"
import { Bell, CalendarDays, Clock, FileText, HeartPulse, MessageCircle, Sparkles } from "lucide-react"

import { cn } from "@/src/lib/utils"

const features = [
  {
    icon: CalendarDays,
    title: "Prise de rendez-vous simplifiée",
    description:
      "Réservez facilement des consultations avec les soignants disponibles près de chez vous en quelques clics.",
    color: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: HeartPulse,
    title: "Suivi santé complet",
    description:
      "Gardez un historique complet des soins, vaccins et traitements de vos animaux pour un meilleur suivi.",
    color: "bg-red-500/10 text-red-500 dark:text-red-400",
    borderColor: "group-hover:border-red-500/50",
    iconBg: "bg-red-500/10",
  },
  {
    icon: Bell,
    title: "Rappels intelligents",
    description: "Recevez des notifications pour les vaccins, traitements et rendez-vous à venir pour ne rien oublier.",
    color: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
    borderColor: "group-hover:border-amber-500/50",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: MessageCircle,
    title: "Messagerie intégrée",
    description: "Communiquez directement avec votre vétérinaire pour des questions simples sans vous déplacer.",
    color: "bg-green-500/10 text-green-500 dark:text-green-400",
    borderColor: "group-hover:border-green-500/50",
    iconBg: "bg-green-500/10",
  },
  {
    icon: FileText,
    title: "Ordonnances numériques",
    description: "Accédez à vos ordonnances en ligne et recevez des rappels pour les renouvellements.",
    color: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
    borderColor: "group-hover:border-purple-500/50",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Disponibilité 24/7",
    description: "Prenez rendez-vous à n'importe quelle heure du jour ou de la nuit selon vos disponibilités.",
    color: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
    borderColor: "group-hover:border-indigo-500/50",
    iconBg: "bg-indigo-500/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Accent de fond amélioré */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"></div>
        <div className="absolute top-1/4 left-0 transform -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[120px]"></div>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-secondary/10 text-secondary backdrop-blur-sm border border-secondary/20">
            <Sparkles className="w-4 h-4" />
            <span>Fonctionnalités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Des outils conçus pour simplifier la vie des propriétaires d&apos;animaux
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre plateforme vous offre tout ce dont vous avez besoin pour prendre soin de vos animaux de compagnie,
            sans tracas et en toute simplicité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={cn(
                "relative rounded-2xl p-8 h-full bg-card/50 backdrop-blur-sm border",
                "transition-all duration-300 ease-in-out",
                "hover:scale-[1.02] hover:shadow-xl",
                feature.borderColor
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                    "transition-transform duration-300 group-hover:scale-110",
                    feature.iconBg
                  )}>
                    <feature.icon className={cn("w-6 h-6", feature.color)} />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "text-xl font-semibold mb-2 transition-colors duration-300",
                      feature.color.replace("bg-", "group-hover:text-").replace("/10", "")
                    )}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>

                {/* Effet de bordure animée */}
                <div className="absolute -inset-[1px] -z-20 bg-gradient-to-r rounded-[17px] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Rejoignez des milliers de propriétaires d&apos;animaux satisfaits
            qui utilisent Biume pour prendre soin de leurs compagnons.
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">10k+</span>
              <span className="text-sm text-muted-foreground">
                Utilisateurs satisfaits
              </span>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">500+</span>
              <span className="text-sm text-muted-foreground">
                Professionnels partenaires
              </span>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">4.8/5</span>
              <span className="text-sm text-muted-foreground">
                Note moyenne
              </span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
