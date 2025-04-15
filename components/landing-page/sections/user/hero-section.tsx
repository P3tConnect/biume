"use client"

import { motion } from "framer-motion"
import { ArrowRight, Badge, CalendarClock, Heart, Search, Shield } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import SearchInput from "./search-input"

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background"></div>

        {isMounted && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-1/4 right-1/5 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.4, 1.2],
                opacity: [0, 0.3, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
              className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1.1],
                opacity: [0, 0.25, 0.1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
              className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit"
          >
            <Badge className="w-4 h-4" />
            <span>Trouvez les meilleurs professionnels pour vos animaux</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight leading-tight max-w-4xl"
          >
            Le bien-être de vos{" "}
            <span className="text-primary relative">
              compagnons
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute -bottom-2 left-0 h-[6px] bg-primary/30 rounded-full"
              ></motion.span>
            </span>{" "}
            est notre priorité
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Biume connecte vos animaux aux meilleurs professionnels de santé près de chez vous. Prenez rendez-vous en
            quelques clics et suivez tous leurs soins en un seul endroit.
          </motion.p>

          {/* Zone de recherche mise en avant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-4xl relative z-10"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-70"></div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative bg-card rounded-xl border border-primary/20 shadow-xl overflow-hidden"
            >
              <div className="p-1 md:p-2">
                <SearchInput />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12 md:mt-20 items-center">
          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border shadow-lg">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=600&auto=format&fit=crop"
                  alt="Application Biume pour les propriétaires d'animaux"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -bottom-5 -right-5 w-2/3 h-2/3 border-b-2 border-r-2 border-primary/30 rounded-br-xl -z-10"></div>
              <div className="absolute -top-5 -left-5 w-2/3 h-2/3 border-t-2 border-l-2 border-primary/30 rounded-tl-xl -z-10"></div>
            </div>

            {/* Cartes flottantes avec plus d'interactivité */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -left-5 bottom-20 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
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
                  <div className="text-xs text-primary">Dans 3 semaines</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -right-5 top-20 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10 max-w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Rendez-vous confirmé</div>
                  <div className="text-xs text-primary">Dr. Martin - 14 Mai</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute right-20 -bottom-10 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm z-10 max-w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Rappel automatique</div>
                  <div className="text-xs text-primary">Traitement antiparasitaire</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Pourquoi choisir Biume ?</h2>

            <div className="space-y-6">
              {[
                {
                  icon: CalendarClock,
                  title: "Réservation en quelques clics",
                  desc: "Trouvez et prenez rendez-vous avec des vétérinaires et autres professionnels sans effort",
                  color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
                },
                {
                  icon: Heart,
                  title: "Suivi médical personnalisé",
                  desc: "Accédez à l'historique complet des soins et traitements de vos animaux à tout moment",
                  color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                },
                {
                  icon: Shield,
                  title: "Rappels intelligents",
                  desc: "Recevez des notifications pour les vaccins, traitements et examens à venir",
                  color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
