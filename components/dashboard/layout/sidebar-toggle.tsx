"use client";

import { ChevronLeft, Menu } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="flex">
      {/* Mobile & Tablet */}
      <Button
        onClick={toggleSidebar}
        className="lg:hidden rounded-md w-8 h-8 bg-card"
        variant="outline"
        size="icon"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Desktop */}
      <Button
        onClick={toggleSidebar}
        className="hidden lg:flex rounded-md w-8 h-8 bg-card"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-500",
            state == "expanded" ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>
    </div>
  );
}
