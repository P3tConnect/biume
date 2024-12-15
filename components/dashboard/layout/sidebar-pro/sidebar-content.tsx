"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { proMenuList } from "@/src/config";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

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
              {menus.map(({ active, href, icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
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
