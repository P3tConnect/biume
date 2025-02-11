"use client";

import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SidebarToggle } from "./sidebar-toggle";
import SearchButton from "./search-button";
import Notifications from "./notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Input,
  CommandDialog,
  DialogTitle,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui";
import { DotsVerticalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isWindows =
    typeof window !== "undefined" && window.navigator.platform.includes("Win");
  const shortcutKey = isWindows ? "Ctrl" : "⌘";

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="top-0 flex w-full mb-3 bg-card border border-border shadow rounded-2xl">
      <div className="mx-2 flex items-center justify-between gap-2 w-full h-14 lg:mx-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:gap-5">
          <SidebarToggle />
          <div className="relative w-48 hidden lg:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={`Rechercher... (${shortcutKey}+K)`}
              className="w-full pl-10 bg-background cursor-pointer rounded-2xl"
              onClick={() => setOpen(true)}
              readOnly
            />
          </div>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />
          <Notifications />
          <UserNav />
        </div>

        {/* Command Dialog */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <VisuallyHidden>
            <DialogTitle>Recherche</DialogTitle>
          </VisuallyHidden>
          <CommandInput placeholder="Que recherchez-vous ?" />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Clients</CommandItem>
              <CommandItem>Rendez-vous</CommandItem>
              <CommandItem>Rapports</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Right Section - Mobile & Tablet */}
        <div className="flex lg:hidden items-center gap-2">
          <SearchButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full w-8 h-8 bg-background"
                variant="outline"
                size="icon"
              >
                <DotsVerticalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-black"
            >
              <DropdownMenuItem className="flex items-center gap-2">
                <ModeToggle />
                <span>Mode</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Notifications />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <UserNav />
                <span>Profil</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
