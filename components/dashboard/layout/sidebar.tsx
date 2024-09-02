"use client";

import Link from "next/link";
import { MoveLeft, PanelsTopLeft } from "lucide-react";

import { cn } from "@/src/lib";
import { useStore } from "@/src/hooks/useStore";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { SidebarToggle } from "./sidebar-toggle";
import { useCurrentLocale } from "@/src/locales";
import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const router = useRouter();
  const locale = useCurrentLocale();
  
  if(!sidebar) return null;

  return (
    <div className={cn("h-full bg-background m-5 rounded-2xl -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 border border-border",
      sidebar?.isOpen === false ? "w-[68px]" : "w-72"
    )}>
      <div className="relative h-full flex flex-col py-4 overflow-y-auto">
        <div className="flex justify-start items-center mt-2 mx-5 gap-5">
          <MoveLeft className={cn("h-5 w-5 text-gray-600 hover:text-gray-400 transition-[colors,opacity] duration-300", sidebar.isOpen == true ? "visible" : "hidden")} onClick={() => router.push("/")} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 bg-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mes établissements</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </div>
  );
}