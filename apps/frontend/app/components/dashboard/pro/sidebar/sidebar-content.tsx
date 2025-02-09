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
} from "@/components/ui/sidebar";
import { proMenuList } from "@/constants/menu-list";
import { NavLink, useLocation } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SidebarContentPro = ({ companyId }: { companyId: string }) => {
  const location = useLocation();

  const menuList = proMenuList(location.pathname, companyId);

  return (
    <>
      {menuList.map(({ groupLabel, menus }, index) => (
        <SidebarGroup key={index}>
          {groupLabel != "" ? (
            <SidebarGroupLabel asChild>
              <p>{groupLabel}</p>
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
                      defaultOpen={true}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={label}
                            isActive={active}
                          >
                            <Icon />
                            <span>{label}</span>
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
                                  <NavLink to={submenu.href}>
                                    <submenu.icon className="h-4 w-4 shrink-0 stroke-[2]" />
                                    <span>{submenu.label}</span>
                                  </NavLink>
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
                        tooltip={label}
                        asChild
                        isActive={active}
                      >
                        <NavLink to={href}>
                          <Icon />
                          <span>{label}</span>
                        </NavLink>
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

export default SidebarContentPro;
