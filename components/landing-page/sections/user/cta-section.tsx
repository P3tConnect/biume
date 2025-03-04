"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Bell,
  CalendarClock,
  Sparkles,
  Medal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { WaitlistModal } from "../../waitlist-modal";

export function CTASection() {
  return (
    <>
      <section id="cta" className="py-24 relative">
        {/* Fond décoratif */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
            <div className="absolute right-1/3 bottom-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container px-4 mx-auto">
          <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-card/80 to-card border rounded-3xl overflow-hidden backdrop-blur-sm shadow-lg">
            {/* Motif de décoration */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute -right-8 -top-8 w-64 h-64 border-8 border-secondary rounded-full"></div>
              <div className="absolute -left-8 -bottom-8 w-64 h-64 border-8 border-secondary rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-secondary/10 text-secondary w-fit">
                    <Sparkles className="w-4 h-4" />
                    <span>Pour les propriétaires d&apos;animaux</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Prenez soin de votre{" "}
                    <span className="text-gradient">animal chéri</span> sans
                    soucis
                  </h2>

                  <p className="text-lg mb-8">
                    Accédez facilement aux soins, suivez la santé de votre
                    animal et recevez des rappels pour ses besoins importants,
                    le tout dans une seule application.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      {
                        icon: CalendarClock,
                        text: "Rendez-vous simplifiés",
                      },
                      {
                        icon: Heart,
                        text: "Suivi de santé et bien-être de votre animal",
                      },
                      {
                        icon: Bell,
                        text: "Rappels pour les vaccins et traitements",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <p>{item.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <WaitlistModal defaultIsPro={false}>
                      <Button size="lg" variant="secondary" className="group relative z-20">
                        <span>Rejoindre la liste d&apos;attente</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </WaitlistModal>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-full h-[400px] md:h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=600&auto=format&fit=crop"
                    alt="Application pour propriétaires d'animaux"
                    fill
                    className="object-cover rounded-xl"
                    quality={90}
                  />

                  {/* Badge flottant rappel */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 md:bottom-8 md:left-8 bg-background rounded-2xl shadow-lg p-4 border backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                        <CalendarClock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Prochain vaccin</p>
                        <p className="text-xs text-muted-foreground">
                          Rappel dans 2 semaines
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Badge flottant satisfaction */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute -top-6 -right-6 md:top-8 md:right-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 mb-1 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                        <Medal className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">99% satisfaits</p>
                      <p className="text-xs text-muted-foreground">
                        des propriétaires
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
