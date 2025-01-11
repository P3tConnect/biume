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
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
                <SidebarMenuItem key={label}>
                  {submenus && submenus.length > 0 ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={t(label)} isActive={active}>
                          <Icon />
                          <span>{t(label)}</span>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {submenus.map((submenu) => (
                            <SidebarMenuSubItem key={submenu.label}>
                              <SidebarMenuSubButton
                                href={submenu.href}
                                isActive={submenu.active}
                              >
                                <submenu.icon className="h-4 w-4 shrink-0 stroke-[1]" />
                                <span>{t(submenu.label)}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      tooltip={t(label)}
                      asChild
                      isActive={active}
                    >
                      <a href={href}>
                        <Icon />
                        <span>{t(label)}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export default SidebarContentComponent;
