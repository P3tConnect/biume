"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/src/lib";
import { proMenuList } from "@/src/config/menu-list";
import { CollapseMenuButton } from "./collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Button
} from "@/components/ui";
import { useCurrentLocale } from "@/src/locales";

interface MenuProps {
  isOpen: boolean | undefined;
  companyId: string;
}

export function Menu({ isOpen, companyId }: MenuProps) {
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const menuList = proMenuList(pathname, locale, companyId);

  return (
    <nav className="mt-4 h-full w-full flex flex-col justify-around">
      <ul className="flex flex-col items-start space-y-1 px-2">
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
            {(isOpen && groupLabel) || isOpen === undefined ? (
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                {groupLabel}
              </p>
            ) : !isOpen && isOpen !== undefined && groupLabel ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="w-full">
                    <div className="w-full flex justify-center items-center">
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p className="pb-2"></p>
            )}
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn("w-full justify-start h-10 mb-1", active ? "bg-gray-100 dark:bg-gray-800" : "")}
                          asChild
                        >
                          <Link href={href}>
                            <span
                              className={cn(isOpen === false ? "" : "mr-4")}
                            >
                              <Icon size={18} className={cn(active ? "text-secondary" : "")} />
                            </span>
                            <p
                              className={cn(
                                "max-w-[200px] truncate",
                                isOpen === false
                                  ? "-translate-x-96 opacity-0"
                                  : "translate-x-0 opacity-100",
                                active ? "text-secondary" : ""
                              )}
                            >
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && (
                        <TooltipContent side="right">
                          {label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                )
            )}
          </li>
        ))}
      </ul>
      <div className="w-full grow flex items-end px-2">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => { }}
              variant="outline"
              className="w-full justify-center h-10 mt-5"
            >
              <span className={cn(isOpen === false ? "" : "mr-4")}>
                <LogOut size={18} />
              </span>
              <p
                className={cn(
                  "whitespace-nowrap",
                  isOpen === false ? "opacity-0 hidden" : "opacity-100"
                )}
              >
                Déconnexion
              </p>
            </Button>
          </TooltipTrigger>
          {isOpen === false && (
            <TooltipContent side="right">Déconnexion</TooltipContent>
          )}
        </Tooltip>
      </div>
    </nav>
  );
}