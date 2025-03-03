"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation de déplacement parallaxe des éléments de fond
  const calculateTransform = (factor: number) => {
    if (!isMounted) return { x: 0, y: 0 };

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const moveX =
      ((mousePosition.x - windowWidth / 2) / (windowWidth / 2)) * factor;
    const moveY =
      ((mousePosition.y - windowHeight / 2) / (windowHeight / 2)) * factor;

    return { x: moveX, y: moveY };
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-42 md:pb-32">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent"></div>

        {isMounted && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
              animate={calculateTransform(-15)}
              transition={{ type: "spring", stiffness: 30, damping: 15 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
              animate={calculateTransform(-10)}
              transition={{ type: "spring", stiffness: 25, damping: 15 }}
            />
            <motion.div
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
              animate={calculateTransform(-20)}
              transition={{ type: "spring", stiffness: 20, damping: 15 }}
            />
          </>
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03] bg-repeat"></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <span>Une solution complète pour les professionnels</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Gérez votre activité animale{" "}
              <span className="text-primary">simplement</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Biume Pro simplifie la gestion de votre activité animale, de la
              prise de rendez-vous à la facturation, en passant par le suivi des
              dossiers médicaux.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button asChild size="lg" className="h-12 px-6 group">
                <Link href="#cta">
                  Je m&apos;inscrit à la phase bêta
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {[
              "Gestion des rendez-vous",
              "Dossiers médicaux",
              "Facturation intégrée",
              "Support client dédié",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-sm"
              >
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
              alt="Interface professionnelle Biume"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />

            {/* Superposition de reflet */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
          </div>

          {/* Éléments décoratifs autour de l'image */}
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>

          {/* Statistiques flottantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -bottom-5 md:bottom-6 left-10 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
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
                <p className="text-sm font-semibold">+42%</p>
                <p className="text-xs text-muted-foreground">
                  d&apos;efficacité
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute -top-5 md:top-6 right-10 bg-card rounded-xl p-4 shadow-lg border backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">250+</p>
                <p className="text-xs text-muted-foreground">
                  nouveaux clients
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
