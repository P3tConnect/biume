"use client";

import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { HeaderProps } from "./types";
import { useSearchParams } from "next/navigation";

// Définir les items de navigation de base
const baseNavItems = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Élément prix qui sera affiché conditionnellement
const pricingItem = { name: "Prix", href: "#pricing" };

export const DesktopNavigation = ({ isScrolled }: HeaderProps) => {
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
    <nav
      className={cn(
        "items-center gap-4 transition-all duration-300",
        isScrolled ? "hidden lg:flex" : "hidden lg:flex gap-6",
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
