"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useActiveOrganization, useListOrganizations } from "@/src/lib/auth-client";
import { Building, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";


const SidebarHeaderComponent = () => {

  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeOrganization?.logo ? <Image src={activeOrganization?.logo ?? ""} alt={activeOrganization?.name ?? ""} width={32} height={32} /> : <Building className="size-4" />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeOrganization?.name}</span>
                <span className="truncate text-xs">{activeOrganization?.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            className="w-56"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Companies
            </DropdownMenuLabel>

            {organizations?.map((orgs, index) => (
              <DropdownMenuItem key={index} className="flex flex-row gap-2 items-center justify-start w-full">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {orgs.logo ? <Image src={orgs.logo} alt={orgs.name} className="object-cover rounded-lg" width={32} height={32} /> : <Building className="size-4" />}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{orgs.name}</span>
                  <span className="truncate text-xs">{orgs.slug}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="mx-1" />
            <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
              <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-gray-300/30 text-sidebar-accent-foreground">
                <Plus className="size-4" />
              </div>
              <p>Ajouter une entreprise</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarHeaderComponent;
