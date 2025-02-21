"use client";

import Stepper from "@/components/onboarding/components/stepper";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Credenza,
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
import { getUserInformations } from "@/src/actions/user.action";
import { signOut } from "@/src/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import Avvvatars from "avvvatars-react";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarClientFooterComponent = () => {
  const router = useRouter();
  const { data: session, isPending } = useQuery({
    queryKey: ["user-informations"],
    queryFn: () => getUserInformations({}),
  });

  return (
    <Credenza>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {session?.data?.user.image ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.data?.user.image}
                      alt={session?.data?.user.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">
                      <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Avvvatars
                      value={session?.data?.user.email || ""}
                      size={32}
                      style="shape"
                    />
                  </div>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.data?.user.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.data?.user.email}
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
                  {session?.data?.user.image ? (
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={session?.data?.user.image}
                        alt={session?.data?.user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg">
                        <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Avvvatars
                        value={session?.data?.user.email || ""}
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
                          {session?.data?.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {session?.data?.user.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link
                  href={`/dashboard/user/${session?.data?.user.id}/settings`}
                >
                  <DropdownMenuItem className="gap-2">
                    <Settings size={14} />
                    Settings
                  </DropdownMenuItem>
                </Link>
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
    </Credenza>
  );
};

export default SidebarClientFooterComponent;
