"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/src/lib/auth-client";
import { cn } from "@/src/lib/utils";
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { DesktopActions } from "./header/DesktopActions";
import { MobileMenu } from "./header/MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "fixed transition-all duration-500 z-50",
        "top-0 left-0 right-0 py-4",
      )}
    >
      <div
        className={cn(
          "transition-all duration-500 backdrop-blur-lg -z-10",
          "absolute inset-0 bg-transparent",
        )}
      />

      <div className={cn("container mx-auto px-4 relative z-10")}>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo isScrolled={isScrolled} />

          {/* Navigation - Desktop */}
          <DesktopNavigation isScrolled={isScrolled} />

          {/* Switcher et Boutons - Desktop */}
          <DesktopActions isScrolled={isScrolled} session={session} />

          {/* Menu Mobile */}
          <MobileMenu
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            session={session}
          />
        </div>
      </div>
    </header>
  );
}
