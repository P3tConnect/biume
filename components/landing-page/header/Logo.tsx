"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { HeaderProps } from "./types";

export const Logo = ({ isScrolled }: HeaderProps) => {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
          <PawPrint
            fill="white"
            className={isScrolled ? "w-4 h-4 text-white" : "w-5 h-5 text-white"}
          />
        </div>
      </motion.div>
      <span
        className={cn(
          "font-bold tracking-tight transition-all",
          isScrolled ? "text-lg" : "text-xl",
        )}
      >
        Biume
      </span>
    </Link>
  );
};
