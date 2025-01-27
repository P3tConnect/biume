import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { SidebarToggle } from "./sidebar-toggle";
import SearchButton from "./search-button";
import NewShortcut from "./new-shortcut";
import Notifications from "./notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@/components/ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export function Navbar() {
  return (
    <header className="top-0 flex w-full mb-3 bg-card border border-border shadow rounded-2xl">
      <div className="mx-2 flex items-center justify-between gap-2 w-full h-14 lg:mx-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:gap-5">
          <SidebarToggle />
          <NewShortcut />
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <SearchButton />
          <ModeToggle />
          <Notifications />
          <UserNav />
        </div>

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
