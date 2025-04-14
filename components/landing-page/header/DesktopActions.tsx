"use client";

import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { PageSwitch } from "@/components/landing-page/page-switch";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "../../dashboard/layout/user-nav";
import { HeaderProps, SessionProps } from "./types";
import { useSearchParams } from "next/navigation";
import { WaitlistModal } from "@/components/landing-page/waitlist-modal";

export const DesktopActions = ({
  isScrolled,
  session,
}: HeaderProps & SessionProps) => {
  const params = useSearchParams();
  const isPro = params.get("version") === "pro";

  return (
    <div
      className={cn(
        "items-center transition-all duration-300",
        isScrolled ? "hidden lg:flex gap-3" : "hidden lg:flex gap-4",
      )}
    >
      <PageSwitch />

      <ModeToggle />

      {session ? (
        <UserNav />
      ) : (
        <div
          className={cn(
            "items-center transition-all duration-300",
            isScrolled ? "hidden lg:flex gap-2" : "hidden lg:flex gap-3",
          )}
        >
          <WaitlistModal defaultIsPro={isPro}>
            <Button size={isScrolled ? "sm" : "default"} variant="secondary">
              M&apos;inscrire à la bêta
            </Button>
          </WaitlistModal>
        </div>
      )}
    </div>
  );
};
