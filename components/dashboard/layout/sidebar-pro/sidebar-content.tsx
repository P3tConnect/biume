"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui";
import { proMenuList } from "@/src/config";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

const SidebarContentComponent = ({ companyId }: { companyId: string }) => {
  const pathname = usePathname();
  const t = useTranslations();

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
                    <Collapsible
                      asChild
                      key={label}
                      className="group/collapsible"
                      defaultOpen={pathname.includes("accounting")}
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
                                  <Link href={submenu.href}>
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
                      <SidebarMenuButton
                        tooltip={t(label)}
                        asChild
                        isActive={active}
                      >
                        <Link href={href}>
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

export default SidebarContentComponent;
