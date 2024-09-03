import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarToggleStore } from "@/src/hooks/useSidebarToggle";
import SearchButton from "./search-button";
import { Menu } from "@/src/config/menu-list";
import NewShortcut from "./new-shortcut";

interface NavbarProps {
  sidebar: useSidebarToggleStore;
  menu: Menu;
}

export function Navbar({ menu, sidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 flex w-full mt-2 bg-background/95 border border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary rounded-2xl">
      <div className="mx-4 sm:mx-4 flex w-full h-14 items-center justify-around">
        <div className="flex items-center justify-center space-x-2 gap-3 lg:space-x-0">
          <SheetMenu />
          <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
          <h1 className="font-bold">{menu.label}</h1>
        </div>
        <NewShortcut />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <SearchButton />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}