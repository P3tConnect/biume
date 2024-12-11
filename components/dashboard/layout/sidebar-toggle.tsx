"use client";

import { ChevronLeft } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn("hidden lg:flex transition-all duration-300 top-[15px]")}
    >
      <Button
        onClick={toggleSidebar}
        className="rounded-md w-8 h-8 bg-card"
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
