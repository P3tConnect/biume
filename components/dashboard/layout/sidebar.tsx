"use client";

import { Building, ChevronDown, MoveLeft, Plus } from "lucide-react";

import { cn } from "@/src/lib";
import { useStore } from "@/src/hooks/useStore";
import { Menu } from "./menu";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const router = useRouter();

  if (!sidebar) return null;

  return (
    <div className={cn("h-full bg-white dark:bg-black m-5 rounded-2xl -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-200 border border-border",
      sidebar?.isOpen === false ? "w-[68px]" : "w-72"
    )}>
      <div className="relative h-full flex flex-col justify-start py-4">
        <div className={"flex justify-start items-center mx-4 gap-4"}>
          <MoveLeft className={cn("h-5 w-5 text-gray-600 hover:text-gray-400", sidebar.isOpen == true ? "visible" : "hidden")} onClick={() => router.push("/")} />
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div className={cn("flex items-center justify-center gap-2", sidebar.isOpen == true ? "" : "flex-col")}>
                <Avatar className="h-8 w-8 rounded-full border border-border">
                  <AvatarImage src="#" alt="avatar" />
                  <AvatarFallback className="bg-transparent">P</AvatarFallback>
                </Avatar>
                <p className={cn("text-sm font-medium", sidebar.isOpen == true ? "visible" : "hidden")}>Patenron</p>
                <ChevronDown className={cn("h-4 w-4 transition-transform ease-in-out duration-200", isOpen == true ? "rotate-180" : "rotate-0")} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
              <DropdownMenuLabel className="flex gap-2 items-center">
                <Building className="h-4 w-4" />
                <p className="text-sm font-bold">Mes établissements</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={true} className="flex gap-2 items-center">
                <Building className="h-4 w-4" />
                <p className="text-sm font-normal">Patenron</p>
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem className="flex gap-2 items-center">
                <Plus className="h-4 w-4" />
                <p className="text-sm font-normal">Nouvel établissement</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </div>
  );
}