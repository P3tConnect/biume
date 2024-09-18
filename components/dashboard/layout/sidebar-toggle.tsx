import { ChevronLeft } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className={cn("hidden lg:flex transition-all duration-300 top-[15px]", isOpen === false ? "" : "")}>
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8 bg-background"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-500",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}