"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User2,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";
import React from "react";
import Avvvatars from "avvvatars-react";

// Fake data for development
const session = {
  user: {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4"
  }
};

const isPending = false;

const signOut = ({ fetchOptions }: { fetchOptions: { onSuccess: () => void } }) => {
  fetchOptions.onSuccess();
};

const SidebarFooterPro = () => {
  const navigate = useNavigate();

  return (
    <SidebarMenu>
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
                <Settings size={14} />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onClick={async () => {
                navigate(`/dashboard/user/${session?.user.id}`);
              }}
            >
              <User2 size={14} />
              Back to personnal
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      navigate("/sign-in");
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

export default SidebarFooterPro;
