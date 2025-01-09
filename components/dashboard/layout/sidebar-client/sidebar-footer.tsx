"use client";

import Stepper from "@/components/onboarding/components/stepper";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogTrigger,
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
import { cn } from "@/src/lib";
import { signOut, useSession } from "@/src/lib/auth-client";
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SidebarClientFooterComponent = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar
                  className={cn(
                    "h-8 w-8 rounded-lg",
                    session?.user.image == "" ? "hidden" : ""
                  )}
                >
                  <AvatarImage
                    src={session?.user.image as string}
                    alt={session?.user.name}
                    className={"object-cover"}
                  />
                  <AvatarFallback className="rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                  </AvatarFallback>
                </Avatar>
                <User2
                  className={cn(
                    "h-8 w-8",
                    session?.user.image == "" ? "" : "hidden"
                  )}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user.email}
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
                  {session?.user.image != "" || session?.user.image == null ? (
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={session?.user.image as string}
                        alt={session?.user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg">
                        <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User2 />
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
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-2">
                    <Sparkles size={14} />
                    Become a pro
                  </DropdownMenuItem>
                </DialogTrigger>
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
                  <Settings size={14} />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2"
                onClick={async () =>
                  await signOut({
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
      <Stepper />
    </Dialog>
  );
};

export default SidebarClientFooterComponent;
