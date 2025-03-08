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
        <Link
          href="https://forms.gle/ZWyhVPJfL1D98D716"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Répondre au questionnaire
        </Link>
      </Button>
      <div className="hidden sm:block mt-4 pt-4 border-t border-border/50 text-center text-sm text-muted-foreground">
        Participez à notre questionnaire
      </div>
    </div>
  );
};
