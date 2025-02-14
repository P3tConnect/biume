"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
} from "@/components/ui";
import { signOut, useActiveOrganization } from "@/src/lib/auth-client";
import {
  ChevronsUpDown,
  Link,
  LogOut,
  Settings,
  ExternalLink,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Avvvatars from "avvvatars-react";
import { useActionQuery } from "@/src/hooks/action-hooks";
import { getUserInformations } from "@/src/actions/user.action";

const SidebarFooterComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: activeOrganization } = useActiveOrganization();
  const { data: session, isPending } = useActionQuery(
    getUserInformations,
    {},
    "user-informations",
  );

  const handleSettingsClick = () => {
    router.push(`/dashboard/organization/${activeOrganization?.id}/settings`);
  };

  return (
    <SidebarMenu className="flex flex-col gap-2">
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="Paramètres de l'entreprise"
          isActive={
            pathname ===
            `/dashboard/organization/${activeOrganization?.id}/settings`
          }
          onClick={handleSettingsClick}
          asChild
        >
          <div className="flex items-center gap-2">
            <Settings />
            <span>Paramètres</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {session?.user.image ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user.image}
                    alt={session?.user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center">
                  <Avvvatars
                    value={session?.user.email || ""}
                    size={32}
                    style="shape"
                  />
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user.name}
                </span>
                <span className="truncate text-xs">{session?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {session?.user.image ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user.image}
                      alt={session?.user.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">
                      <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Avvvatars
                      value={session?.user.email || ""}
                      size={32}
                      style="shape"
                    />
                  </div>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {isPending ? (
                    <>
                      <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                      <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                    </>
                  ) : (
                    <>
                      <span className="truncate font-semibold">
                        {session?.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={`/dashboard/user/${session?.user.id}/settings`}>
                <DropdownMenuItem className="gap-2">
                  <Settings size={14} />
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in");
                    },
                  },
                })
              }
            >
              <LogOut size={14} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterComponent;
