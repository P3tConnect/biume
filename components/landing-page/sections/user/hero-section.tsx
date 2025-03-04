"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Badge, Heart, Shield } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative pt-24 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

        {/* Cercles décoratifs avec animation */}
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

        {isMounted && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 0.3, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1.2],
                opacity: [0, 0.2, 0.1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
              className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-secondary/10 text-secondary w-fit">
              <Badge className="w-4 h-4" />
              <span>La santé de vos animaux simplifiée</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Prenez soin de vos{" "}
              <span className="text-gradient">compagnons</span> à quatre pattes
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Biume vous aide à gérer les soins, les rendez-vous et le bien-être
              de vos animaux de compagnie en un seul endroit pratique.
            </p>

            {/* Barre de recherche */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10"
            >
              <SearchInput />
            </motion.div> */}

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: CalendarClock,
                  title: "Rendez-vous simplifiés",
                  desc: "Plus besoin de téléphoner",
                },
                {
                  icon: Heart,
                  title: "Suivi de santé complet",
                  desc: "Tous les soins en un coup d'œil",
                },
                {
                  icon: Shield,
                  title: "Alertes et rappels",
                  desc: "Ne manquez plus jamais un vaccin",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className={`flex items-start gap-3 p-4 rounded-xl bg-card/50 ${index === 2 ? "col-span-2" : ""}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden border shadow-lg">
                <Image
                  src="/assets/images/landing-user.jpg"
                  alt="Application Biume pour les propriétaires d'animaux"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 border-b-2 border-r-2 border-primary/20 rounded-br-xl -z-10"></div>
              <div className="absolute -top-3 -left-3 w-2/3 h-2/3 border-t-2 border-l-2 border-primary/20 rounded-tl-xl -z-10"></div>
            </div>

            {/* Cartes flottantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-2 -left-2 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-background">
                  <Image
                    src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=150&auto=format&fit=crop"
                    alt="Avatar d'animal"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">Prochain vaccin</div>
                  <div className="text-xs text-muted-foreground">
                    Dans 3 semaines
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -top-2 -right-2 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
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
                <div>
                  <div className="text-sm font-medium">
                    Rendez-vous confirmé
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Dr. Martin - 14 Mai
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
