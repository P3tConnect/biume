"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, MountainSnow, Sparkles } from "lucide-react"
import Image from "next/image"

import { WaitlistModal } from "@/components/landing-page/waitlist-modal"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full max-w-7xl mx-auto">
          <div className="absolute -right-64 -top-64 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -left-64 -bottom-64 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl"></div>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="relative max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border bg-gradient-to-br from-card/90 to-card backdrop-blur-sm shadow-xl">
            {/* Éléments décoratifs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                  <Sparkles className="w-4 h-4" />
                  <span>Optimisez votre activité</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transformez votre activité professionnelle avec Biume
                </h2>

                <p className="text-lg mb-8 text-muted-foreground">
                  Notre plateforme tout-en-un vous permet de vous concentrer sur ce qui compte vraiment : le soin de vos
                  patients. Simplifiez votre administration, améliorez votre efficacité et développez votre activité.
                </p>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      icon: Calendar,
                      title: "Mise en place rapide",
                      description: "Démarrez en moins de 48h avec notre processus d'embarquement optimisé",
                    },
                    {
                      icon: MountainSnow,
                      title: "Évolutivité sans limites",
                      description: "Adapté aux professionnels indépendants comme aux grandes cliniques multi-sites",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <WaitlistModal defaultIsPro={true}>
                    <Button size="lg" className="group">
                      Rejoindre la liste d&apos;attente
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </WaitlistModal>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center md:justify-end relative"
              >
                <div className="relative max-w-sm w-full">
                  <div className="relative rounded-2xl overflow-hidden border shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=540&auto=format&fit=crop"
                      alt="Interface professionnelle Biume"
                      width={540}
                      height={380}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -bottom-6 -left-6 md:bottom-6 md:left-6 bg-card rounded-2xl p-4 shadow-lg border backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cette semaine</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-xl font-bold">+27%</p>
                          <p className="text-xs text-muted-foreground">de rendez-vous</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute -top-6 -right-6 md:top-6 md:right-6 bg-card rounded-2xl p-4 shadow-lg border backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Basé sur 230+ avis</p>
                      <p className="text-sm font-medium">98% recommandent</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
