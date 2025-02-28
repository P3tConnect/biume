"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute right-1/4 bottom-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-card/80 to-card border rounded-3xl overflow-hidden backdrop-blur-sm">
          {/* Motif de décoration */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute -right-8 -top-8 w-64 h-64 border-8 border-primary rounded-full"></div>
            <div className="absolute -left-8 -bottom-8 w-64 h-64 border-8 border-primary rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Prenez soin de votre animal{" "}
                  <span className="text-primary">simplement</span>
                </h2>

                <p className="text-lg mb-8">
                  Rejoignez des milliers de propriétaires qui font confiance à
                  Biume pour la santé et le bien-être de leurs animaux de
                  compagnie.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: Heart,
                      text: "Accès à un réseau de vétérinaires qualifiés",
                    },
                    {
                      icon: Clock,
                      text: "Prise de rendez-vous 24h/24 et 7j/7",
                    },
                    {
                      icon: Shield,
                      text: "Données sécurisées et confidentialité garantie",
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
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <p>{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="group">
                    <Link href="/register">
                      Commencer gratuitement
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
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
                  src="/images/cta-pet-owner.webp"
                  alt="Propriétaire avec son animal"
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />

                {/* Badge flottant */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 md:bottom-8 md:left-8 bg-background rounded-2xl shadow-lg p-4 border backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prochaine visite</p>
                      <p className="text-xs text-muted-foreground">
                        Dans 3 jours
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Statistique flottante */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -top-6 -right-6 md:top-8 md:right-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-xs text-muted-foreground">
                      Satisfaction client
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
