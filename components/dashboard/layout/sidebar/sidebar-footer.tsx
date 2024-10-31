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
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import React from "react";

const SidebarFooterComponent = () => {
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={user?.fullName!}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-xs">
                  {user?.emailAddresses[0].emailAddress}
                </span>
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.fullName!}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <ClerkLoaded>
                    <span className="truncate font-semibold">
                      {user?.fullName}
                    </span>
                    <span className="truncate text-xs">
                      {user?.emailAddresses[0].emailAddress}
                    </span>
                  </ClerkLoaded>
                  <ClerkLoading>
                    <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                  </ClerkLoading>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <Sparkles size={14} />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <BadgeCheck size={14} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <CreditCard size={14} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Bell size={14} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton redirectUrl="/">
              <DropdownMenuItem className="gap-2">
                <LogOut size={14} />
                Log out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterComponent;
