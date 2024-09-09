import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { cn } from "@/src/lib";

interface NavbarProps {
  title: string;
  isOpen: boolean | undefined;
}

export function Navbar({ title, isOpen }: NavbarProps) {
  return (
    <header className={cn("sticky top-0 flex w-full mt-4 bg-background/95 border border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary rounded-2xl", isOpen === false ? "-z-10" : "z-10")}>
      <div className="mx-4 sm:mx-8 flex w-full h-14 items-center justify-around">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}