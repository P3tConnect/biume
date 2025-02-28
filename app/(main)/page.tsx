"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/landing-page/header";
import { UserLanding } from "@/components/landing-page/user-landing";
import { ProLanding } from "@/components/landing-page/pro-landing";
import { useTheme } from "next-themes";

export default function Home() {
  const searchParams = useSearchParams();
  const version = searchParams.get("version") || "user";
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Assurer que les transitions fonctionnent correctement une fois que le composant est monté
  useEffect(() => {
    setMounted(true);
  }, []);

  // Éviter les problèmes d'hydratation avec le thème
  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden">
      {/* Fond décoratif avec effets de gradient adaptés au thème */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
      </div>

      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={version}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 pt-20 w-full overflow-x-hidden"
        >
          {version === "user" ? <UserLanding /> : <ProLanding />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
