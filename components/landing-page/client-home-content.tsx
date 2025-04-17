"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/landing-page/header";
import { UserLanding } from "@/components/landing-page/user-landing";
import { ProLanding } from "@/components/landing-page/pro-landing";
import { PageSwitch } from "@/components/landing-page/page-switch";

interface ClientHomeContentProps {
  version: string;
}

export function ClientHomeContent({ version }: ClientHomeContentProps) {
  return (
    <>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
      </div>

      <Header />
      <div className="w-full flex justify-center items-center md:hidden mt-[4.5rem] lg:mt-0 mb-2">
        <PageSwitch />
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={version}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 md:mt-20 w-full overflow-x-hidden"
        >
          {version === "user" ? <UserLanding /> : <ProLanding />}
        </motion.main>
      </AnimatePresence>
    </>
  );
} 