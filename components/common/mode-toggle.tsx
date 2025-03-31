"use client"

import { motion } from "framer-motion"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/src/lib/utils"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
        <SunMoon className="h-[1.2rem] w-[1.2rem] text-foreground/70" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sun
                  className={cn(
                    "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500",
                    isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <Moon
                  className={cn(
                    "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500",
                    isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )}
                />
              </div>

              {/* Indique visuellement le thème actif */}
              <motion.div
                className={cn("absolute inset-0 rounded-full opacity-10", isDark ? "bg-primary" : "bg-amber-400")}
                initial={false}
                animate={{
                  scale: [0.8, 1.1, 1],
                  opacity: [0, 0.15, 0.1],
                }}
                transition={{ duration: 0.5 }}
                key={isDark ? "dark" : "light"}
              />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Clair</span>
            {resolvedTheme === "light" && (
              <motion.div layoutId="themeIndicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Sombre</span>
            {resolvedTheme === "dark" && (
              <motion.div layoutId="themeIndicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
            <SunMoon className="h-4 w-4" />
            <span>Système</span>
            {resolvedTheme !== "dark" && resolvedTheme !== "light" && (
              <motion.div layoutId="themeIndicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent side="bottom">Changer de thème</TooltipContent>
    </Tooltip>
  )
}
