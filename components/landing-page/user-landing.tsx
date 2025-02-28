"use client";

import { HeroSection } from "./sections/user/hero-section";
import { FeaturesSection } from "./sections/user/features-section";
import { TestimonialsSection } from "./sections/user/testimonials-section";
import { CTASection } from "./sections/user/cta-section";
import { ModeToggle } from "../mode-toggle";

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
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="font-bold text-lg">Biume</span>
            </div>

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
