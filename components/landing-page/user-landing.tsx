"use client";

import { HeroSection } from "./sections/user/hero-section";
import { FeaturesSection } from "./sections/user/features-section";
import { TestimonialsSection } from "./sections/user/testimonials-section";
import { CTASection } from "./sections/user/cta-section";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/src/lib/utils";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function UserLanding() {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Sections principales */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer simple */}
      <footer className="border-t py-4 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                  <PawPrint
                    className={
                      "w-5 h-5 text-white"
                    }
                  />
                </div>
              </motion.div>
              <span
                className={cn(
                  "font-bold tracking-tight transition-all",
                )}
              >
                Biume
              </span>
            </Link>

            <div className="text-center md:text-left text-sm text-muted-foreground">
              © {new Date().getFullYear()} Biume. Tous droits réservés.
            </div>

            <div className="flex gap-6">
              {["Confidentialité", "CGU", "Contact", "Support"].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
