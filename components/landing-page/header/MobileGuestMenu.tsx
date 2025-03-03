"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileGuestMenuProps } from "./types";

export const MobileGuestMenu = ({
  setIsMobileMenuOpen,
}: MobileGuestMenuProps) => {
  return (
    <div className="px-4 space-y-3">
      <Button asChild className="w-full" variant="default">
        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
          Inscription
        </Link>
      </Button>
      <Button asChild className="w-full" variant="outline">
        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
          Connexion
        </Link>
      </Button>
      <div className="hidden sm:block mt-4 pt-4 border-t border-border/50 text-center text-sm text-muted-foreground">
        Accédez à votre espace personnel
      </div>
    </div>
  );
};
