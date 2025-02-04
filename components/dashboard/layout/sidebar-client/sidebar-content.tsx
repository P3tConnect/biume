'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui';
import { clientMenuList } from '@/src/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarClientContentComponent = () => {
  const pathname = usePathname();

  const menuList = clientMenuList(pathname);

  return (
    <>
      {menuList.map(({ groupLabel, menus }, index) => (
        <SidebarGroup key={index}>
          {groupLabel != '' ? (
            <SidebarGroupLabel asChild>
              <p>{groupLabel}</p>
            </SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map(({ active, href, icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton tooltip={label} asChild isActive={active}>
                    <Link href={href}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
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

export default SidebarClientContentComponent;
