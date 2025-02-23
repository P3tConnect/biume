"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui";
import { Menu, proMenuList } from "@/src/config";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

const SidebarContentComponent = ({ companyId }: { companyId: string }) => {
  const pathname = usePathname();
  const t = useTranslations();
  const { state } = useSidebar();

  const menuList = proMenuList(pathname, companyId);

  return (
    <>
      {menuList.map(({ groupLabel, menus }, index) => (
        <SidebarGroup key={index}>
          {groupLabel != "" ? (
            <SidebarGroupLabel asChild>
              <p>{t(groupLabel)}</p>
            </SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map(({ active, href, icon: Icon, label, submenus }) => (
                <div key={label}>
                  {submenus && submenus.length > 0 ? (
                    state == "expanded" ? (
                      <Collapsible
                        asChild
                        key={label}
                        className="group/collapsible"
                        defaultOpen={true}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={t(label)}
                              isActive={active}
                            >
                              <Icon />
                              <span>{t(label)}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {submenus.map((submenu) => (
                                <SidebarMenuSubItem key={submenu.label}>
                                  <SidebarMenuSubButton
                                    href={submenu.href}
                                    isActive={submenu.active}
                                    asChild
                                  >
                                    <Link href={submenu.href} prefetch>
                                      <submenu.icon className="h-4 w-4 shrink-0 stroke-[2]" />
                                      <span>{t(submenu.label)}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={label}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                              tooltip={t(label)}
                              isActive={active}
                            >
                              <Icon />
                              <span>{t(label)}</span>
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="right"
                            align="start"
                            sideOffset={4}
                          >
                            <DropdownMenuLabel>{t(label)}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {submenus.map((submenu) => (
                              <DropdownMenuItem key={submenu.label} asChild>
                                <Link
                                  href={submenu.href}
                                  className={cn(
                                    "flex items-center gap-2",
                                    checkIsActive(pathname, submenu)
                                      ? "bg-sidebar-accent"
                                      : "",
                                  )}
                                  prefetch
                                >
                                  <submenu.icon className="h-4 w-4 shrink-0 stroke-[2]" />
                                  <span>{t(submenu.label)}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    )
                  ) : (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        tooltip={t(label)}
                        asChild
                        isActive={active}
                      >
                        <Link href={href} prefetch>
                          <Icon />
                          <span>{t(label)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

function checkIsActive(href: string, item: Menu, mainNav = false) {
  return (
    href === item.href || // /endpint?search=param
    href.split("?")[0] === item.href || // endpoint
    !!item?.submenus?.filter((i) => i.href === href).length || // if child nav is active
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] === item?.href?.split("/")[1])
  );
}

export default SidebarContentComponent;
