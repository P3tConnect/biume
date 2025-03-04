"use client";

import { HeroSection } from "./sections/user/hero-section";
import { FeaturesSection } from "./sections/user/features-section";
import { TestimonialsSection } from "./sections/user/testimonials-section";
import { CTASection } from "./sections/user/cta-section";
import { cn } from "@/src/lib/utils";
import { PawPrint, AlertCircle } from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export function UserLanding() {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Bannière d'annonce pour la bêta */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto py-2 px-4">
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-center">
            <AlertCircle className="h-4 w-4 text-primary" />
            <p>
              <span className="font-medium">Lancement prochainement !</span>{" "}
              <span className="hidden sm:inline">
                Notre phase bêta arrive bientôt.
              </span>{" "}
              <Link
                href="#cta"
                className="underline font-semibold hover:text-primary transition-colors"
              >
                Préinscrivez-vous dès maintenant
              </Link>
            </p>
          </div>
        </div>
      </div>

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
                  <PawPrint fill="white" className={"w-5 h-5 text-white"} />
                </div>
              </motion.div>
              <span className={cn("font-bold tracking-tight transition-all")}>
                Biume
              </span>
            </Link>

            <div className="text-center md:text-left text-sm text-muted-foreground">
              © {new Date().getFullYear()} Biume. Tous droits réservés.
            </div>

            <div className="flex flex-col gap-4 items-center md:items-end">
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/company/biume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <LinkedInLogoIcon className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://www.instagram.com/biume_app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <InstagramLogoIcon className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>

              <div className="flex gap-6">
                {[
                  "Roadmap",
                  "Confidentialité",
                  "CGU",
                  "Contact",
                  "Support",
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={
                      item === "Roadmap"
                        ? "/roadmap"
                        : item === "Confidentialité"
                          ? "/privacy"
                          : item === "CGU"
                            ? "/cgu"
                            : item === "Contact"
                              ? "/contact"
                              : "/"
                    }
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
