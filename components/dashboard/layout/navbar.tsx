import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { cn } from "@/src/lib";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarToggleStore } from "@/src/hooks/useSidebarToggle";

interface NavbarProps {
  title: string;
  isOpen: boolean | undefined;
  sidebar: useSidebarToggleStore;
}

export function Navbar({ title, isOpen, sidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 flex w-full mt-4 bg-background/95 border border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary rounded-2xl">
      <div className="mx-4 sm:mx-4 flex w-full h-14 items-center justify-around">
        <div className="flex items-center space-x-2 lg:space-x-0">
          <SheetMenu />
          <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
          <h1 className="font-bold pl-5">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}