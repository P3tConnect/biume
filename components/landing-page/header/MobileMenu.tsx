"use client";

import Link from "next/link";
import { Menu, PawPrint } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { HeaderProps, SessionProps, MobileMenuProps } from "./types";
import { useSearchParams } from "next/navigation";

// Définir les items de navigation de base
const baseNavItems = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Élément prix qui sera affiché conditionnellement
const pricingItem = { name: "Prix", href: "#pricing" };

export const MobileMenu = ({
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  session,
}: HeaderProps & SessionProps & MobileMenuProps) => {
  // Récupérer les paramètres d'URL pour déterminer si on est sur la landing page pro
  const searchParams = useSearchParams();
  const version = searchParams.get("version") || "user";

  // Construction de la liste des items de navigation en fonction de la version
  const navItems = [...baseNavItems];

  // Ajouter l'élément Prix uniquement si on est sur la version pro
  if (version === "pro") {
    // Insérer l'élément Prix après "Fonctionnalités"
    navItems.splice(1, 0, pricingItem);
  }

  return (
    <div
      className={cn(
        "flex items-center transition-all",
        isScrolled ? "gap-1 lg:hidden" : "gap-2 lg:hidden",
      )}
    >
      <ModeToggle />

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[275px] sm:w-[350px] md:w-[400px]"
        >
          <div className="flex flex-col h-full py-6">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Biume</span>
              </Link>
            </div>

            <nav className="space-y-1 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center py-3 px-4 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
