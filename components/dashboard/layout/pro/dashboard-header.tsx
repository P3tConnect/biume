"use client"

import { Button } from "@/components/ui/button"
import { PanelLeft, Search } from "lucide-react"
import { UserNav } from "../user-nav"
import { ModeToggle } from "../mode-toggle"
import { SidebarTrigger, useSidebar } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { cn } from "@/src/lib"
import Notifications from "../notifications"

type DashboardHeaderProps = {
  title?: string
}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector<HTMLInputElement>("#search-input")
        if (searchInput) {
          searchInput.focus()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex flex-row justify-between items-center h-16 px-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-10 w-10 rounded-xl bg-card border-border transition-all duration-300 hover:shadow-md p-0 m-0"
          onClick={toggleSidebar}
        >
          <PanelLeft size={24} />
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
          <Input
            id="search-input"
            className={cn(
              "w-[200px] h-10 rounded-xl pl-10 pr-4",
              "bg-primary/5 hover:bg-primary/10",
              "border border-primary/20",
              "text-primary",
              "shadow-sm hover:shadow-md",
              "dark:bg-primary/10 dark:hover:bg-primary/20",
              "dark:border-primary/20 dark:text-primary-foreground",
              "placeholder:text-primary/50",
              "transition-all duration-200"
            )}
            placeholder="Rechercher... (⌘K)"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Notifications />
        <UserNav />
      </div>
    </div>
  )
}
