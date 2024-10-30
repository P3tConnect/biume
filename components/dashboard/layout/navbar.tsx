import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarToggleStore } from "@/src/hooks/useSidebarToggle";
import SearchButton from "./search-button";
import { Menu } from "@/src/config/menu-list";
import NewShortcut from "./new-shortcut";
import Notifications from "./notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Skeleton,
} from "@/components/ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

interface NavbarProps {
  menu: Menu;
  companyId: string;
}

export function Navbar({ menu, companyId }: NavbarProps) {

  const t = useTranslations();

  return (
    <header className="top-0 flex w-full mb-3 bg-card border border-border shadow rounded-2xl">
      <div className="mx-2 flex items-center justify-between gap-2 w-full h-14 lg:mx-4 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-5 lg:flex lg:items-center lg:justify-between">
          <SheetMenu companyId={companyId} />
          <SidebarToggle />
          <h1 className="font-bold">{t(menu.label)}</h1>
          <NewShortcut />
        </div>
        <div className="hidden lg:flex items-center justify-end gap-2">
          <SearchButton />
          <ModeToggle />
          <Notifications />
        </div>

        <div className="flex gap-1 items-center justify-end md:justify-between flex-row max-w-full overflow-hidden lg:hidden">
          <SearchButton />
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full w-8 h-8 bg-background"
                  variant="outline"
                  size="icon"
                >
                  <DotsVerticalIcon className="w-[1rem] h-[1rem]" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-black"
              >
                <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
                  <ModeToggle />
                  <p>Mode</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
                  <Notifications />
                  <p>Notifications</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
                  <UserNav />
                  <p>Profile</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
