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
                    <a href={href}>
                      <Icon className='size-4' />
                      <span>{label}</span>
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

export default SidebarClientContentComponent;
