import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { DropdownMenu } from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
  SidebarMenuItem,
  SidebarMenuButton,
  Collapsible,
  SidebarMenuSubItem,
  SidebarMenuSub,
  DropdownMenuTrigger,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuSubButton,
  SidebarGroupContent,
} from "@/components/ui";
import { usePathname } from "next/navigation";
import { Group, Menu } from "@/src/config";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/lib";
import { useTranslations } from "next-intl";

export function NavGroup({ groupLabel, menus }: Group) {
  const { state } = useSidebar();
  const href = usePathname();
  const t = useTranslations();

  return (
    <SidebarGroup>
      {groupLabel != "" && (
        <SidebarGroupLabel>{t(groupLabel)}</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        {menus.map((item) => {
          const key = item.label;

          if (!item.submenus)
            return <SidebarMenuLink key={key} item={item} href={href} />;

          if (state === "collapsed")
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
            );

          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const SidebarMenuLink = ({ item, href }: { item: Menu; href: string }) => {
  const { setOpenMobile } = useSidebar();
  const t = useTranslations();

  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={t(item.label)}
      >
        <Link href={item.href} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{t(item.label)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: Menu;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  const t = useTranslations();

  return (
    <Collapsible
      key={item.label}
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem key={t(item.label)}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={t(item.label)}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{t(item.label)}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.submenus?.map((subItem) => (
              <SidebarMenuSubItem key={`${t(subItem.label)}-${subItem.href}`}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}
                >
                  <Link
                    href={subItem.href}
                    onClick={() => setOpenMobile(false)}
                  >
                    {subItem.icon && <subItem.icon />}
                    <span>{t(subItem.label)}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: Menu;
  href: string;
}) => {
  const t = useTranslations();

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={t(item.label)}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{t(item.label)}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>{t(item.label)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.submenus?.map((sub) => (
            <DropdownMenuItem key={`${t(sub.label)}-${sub.href}`} asChild>
              <Link
                href={sub.href}
                className={cn(
                  "flex items-center gap-2",
                  checkIsActive(href, sub) ? "bg-secondary" : "",
                )}
              >
                {sub.icon && (
                  <sub.icon className="h-4 w-4 shrink-0 stroke-[2]" />
                )}
                <span className="max-w-52 text-wrap">{t(sub.label)}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
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
