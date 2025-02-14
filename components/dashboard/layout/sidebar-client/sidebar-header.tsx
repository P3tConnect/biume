"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Credenza,
} from "@/components/ui";
import { cn } from "@/src/lib";
import {
  useActiveOrganization,
  useListOrganizations,
  useSession,
  organization,
} from "@/src/lib/auth-client";
import { Building, Check, ChevronsUpDown, User, Sparkles } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Stepper from "@/components/onboarding/components/stepper";

const SidebarClientHeaderComponent = () => {
  const { data: session } = useSession();
  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();
  const router = useRouter();
  const pathname = usePathname();
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  const handleOrganizationSwitch = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId });
      router.push(`/dashboard/organization/${orgId}`);
    } catch (error) {
      toast.error("Erreur lors du changement d'organisation", {
        description: "Veuillez réessayer",
      });
    }
  };

  const isPersonalDashboard = pathname?.startsWith(
    `/dashboard/user/${session?.user?.id}`,
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeOrganization ? (
                  activeOrganization.logo ? (
                    <Image
                      src={activeOrganization.logo}
                      alt={activeOrganization.name}
                      width={32}
                      height={32}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Building className="size-4" />
                  )
                ) : (
                  <User className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrganization
                    ? activeOrganization.name
                    : session?.user?.name}
                </span>
                <span className="truncate text-xs">
                  {activeOrganization
                    ? "Organisation"
                    : "Tableau de bord personnel"}
                </span>
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

            {organizations && organizations.length > 0 && (
              <>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Organisations
                </DropdownMenuLabel>
                {organizations.map((org) => (
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
              </>
            )}
            {(!organizations || organizations.length === 0) && (
              <>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuItem
                  className="flex flex-row gap-2 items-center justify-start w-full"
                  onSelect={() => setIsStepperOpen(true)}
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Devenir Pro</span>
                    <span className="truncate text-xs">
                      Créer votre entreprise
                    </span>
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <Credenza open={isStepperOpen} onOpenChange={setIsStepperOpen}>
        <Stepper />
      </Credenza>
    </SidebarMenu>
  );
};

export default SidebarClientHeaderComponent;
