"use client";

import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/src/lib";
import { useStore } from "@/src/hooks/useStore";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  
  if(!sidebar) return null;

  return (
    <div className={cn("w-72 h-full bg-background m-5 rounded-2xl -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 border border-border",
      sidebar?.isOpen === false ? "w-[90px]" : "w-72"
    )}>
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </div>
  );

  // return (
  //   <div
  //     className={cn(
  //       "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
  //       sidebar?.isOpen === false ? "w-[90px]" : "w-72"
  //     )}
  //   >
  //     <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
  //     
  //   </div>
  // );
}