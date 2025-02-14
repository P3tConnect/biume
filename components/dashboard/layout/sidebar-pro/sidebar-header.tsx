"use client";

import Stepper from "@/components/onboarding/components/stepper";
import {
  Credenza,
  CredenzaTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn, logger } from "@/src/lib";
import {
  useActiveOrganization,
  useListOrganizations,
  useSession,
  organization,
} from "@/src/lib/auth-client";
import { Building, Check, ChevronsUpDown, Plus, User } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const SidebarHeaderComponent = () => {
  const { data: session } = useSession();
  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();
  const pathname = usePathname();
  const router = useRouter();

  const handleOrganizationSwitch = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId });
      router.push(`/dashboard/organization/${orgId}`);
    } catch (error) {
      logger.error("Erreur lors du changement d'organisation:", error);
      toast.error("Erreur lors du changement d'organisation", {
        description: "Veuillez réessayer",
      });
    }
  };

  const isPersonalDashboard = pathname?.startsWith(
    `/dashboard/user/${session?.user?.id}`,
  );

  return (
    <Credenza>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <div
                  className={cn(
                    "flex aspect-square size-8 items-center justify-center rounded-lg",
                    !activeOrganization?.logo &&
                      "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  {activeOrganization?.logo ? (
                    <Image
                      src={activeOrganization.logo}
                      alt={activeOrganization.name}
                      width={32}
                      height={32}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Building className="size-4" />
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeOrganization?.name}
                  </span>
                  <span className="truncate text-xs">Organisation</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuItem
                className="flex flex-row gap-2 items-center justify-start w-full"
                onSelect={() =>
                  router.push(`/dashboard/user/${session?.user?.id}`)
                }
              >
                <User className="size-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name}
                  </span>
                  <span className="truncate text-xs">
                    Tableau de bord personnel
                  </span>
                </div>
                {isPersonalDashboard && <Check className="ml-auto" size={16} />}
              </DropdownMenuItem>

              <DropdownMenuSeparator className="mx-1" />
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Organisations
              </DropdownMenuLabel>

              {organizations?.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  className="flex flex-row gap-2 items-center justify-start w-full"
                  onSelect={() => handleOrganizationSwitch(org.id)}
                >
                  <div
                    className={cn(
                      "flex aspect-square size-8 items-center justify-center rounded-lg",
                      !org.logo &&
                        "bg-sidebar-primary text-sidebar-primary-foreground",
                    )}
                  >
                    {org.logo ? (
                      <Image
                        src={org.logo}
                        alt={org.name}
                        width={32}
                        height={32}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <Building className="size-4" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{org.name}</span>
                    <span className="truncate text-xs">{org.slug}</span>
                  </div>
                  {!isPersonalDashboard &&
                    activeOrganization?.id === org.id && (
                      <Check className="ml-auto" size={16} />
                    )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="mx-1" />
              <CredenzaTrigger asChild>
                <DropdownMenuItem className="flex flex-row gap-2 items-center justify-start w-full">
                  <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-gray-300/30 text-sidebar-accent-foreground">
                    <Plus className="size-4" />
                  </div>
                  <p>Ajouter une organisation</p>
                </DropdownMenuItem>
              </CredenzaTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Stepper />
    </Credenza>
  );
};

export default SidebarHeaderComponent;
