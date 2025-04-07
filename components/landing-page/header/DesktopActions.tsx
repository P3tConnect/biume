"use client"

import { HeaderProps, SessionProps } from "./types"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { PageSwitch } from "@/components/landing-page/page-switch"
import { ModeToggle } from "@/components/common/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib/utils"

export const DesktopActions = ({ isScrolled, session }: HeaderProps & SessionProps) => {
  return (
    <div
      className={cn(
        "items-center transition-all duration-300",
        isScrolled ? "hidden lg:flex gap-3" : "hidden lg:flex gap-4"
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
            isScrolled ? "hidden lg:flex gap-2" : "hidden lg:flex gap-3"
          )}
        >
          <Button size={isScrolled ? "sm" : "default"} asChild>
            <Link href="https://forms.gle/ZWyhVPJfL1D98D716" target="_blank" rel="noopener noreferrer">
              Répondre au questionnaire
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
