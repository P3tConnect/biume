"use client";

import Stepper from "@/components/onboarding/components/stepper";
import {
  Dialog,
  DialogTrigger,
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
import { cn, logger } from "@/src/lib";
import {
  useActiveOrganization,
  useListOrganizations,
  organization,
} from "@/src/lib/auth-client";
import { Building, Check, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SidebarHeaderComponent = () => {
  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();
  const router = useRouter();

  const handleOrganizationSwitch = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId });
      router.push(`/dashboard/organization/${orgId}`);
    } catch (error) {
      logger.error("Error switching organization:", error);
      toast.error("Error switching organization", {
        description: "Please try again",
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  return (
    <Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <div
                  className={cn(
                    "flex aspect-square size-8 items-center justify-center rounded-lg",
                    activeOrganization?.logo == "" ||
                      activeOrganization?.logo == null
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "",
                  )}
                >
                  {activeOrganization?.logo ? (
                    <Image
                      src={activeOrganization?.logo ?? ""}
                      alt={activeOrganization?.name ?? ""}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Building className="size-4" />
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeOrganization?.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeOrganization?.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Companies
              </DropdownMenuLabel>

              {organizations?.map((orgs, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex flex-row gap-2 items-center justify-start w-full"
                  onSelect={() => handleOrganizationSwitch(orgs.id)}
                >
                  <div
                    className={cn(
                      "flex aspect-square size-8 items-center justify-center rounded-lg",
                      orgs.logo == "" || orgs.logo == null
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "",
                    )}
                  >
                    {orgs.logo ? (
                      <Image
                        src={orgs.logo}
                        alt={orgs.name}
                        className="object-cover rounded-lg"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <Building className="size-4" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{orgs.name}</span>
                    <span className="truncate text-xs">{orgs.slug}</span>
                  </div>
                  {activeOrganization?.id === orgs.id && (
                    <Check className="ml-auto" size={16} />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="mx-1" />
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
                  <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-gray-300/30 text-sidebar-accent-foreground">
                    <Plus className="size-4" />
                  </div>
                  <p>Ajouter une entreprise</p>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Stepper />
    </Dialog>
  );
};

export default SidebarHeaderComponent;
