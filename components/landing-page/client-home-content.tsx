"use client";

import { motion, AnimatePresence } from "motion/react";
import { UserLanding } from "@/components/landing-page/user-landing";
import { ProLanding } from "@/components/landing-page/pro-landing";

interface ClientHomeContentProps {
  version: string;
}

export function ClientHomeContent({ version }: ClientHomeContentProps) {
  return (
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
  );
} 