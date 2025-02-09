import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Building, Check, ChevronsUpDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@remix-run/react";

// Types pour les données simulées
interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
}

// Hook simulé pour l'organisation active
const useActiveOrganization = () => {
  return {
    data: {
      id: "1",
      name: "Biume Studio",
      slug: "biume-studio",
      logo: "https://picsum.photos/200",
    } as Organization,
  };
};

// Hook simulé pour la liste des organisations
const useListOrganizations = () => {
  return {
    data: [
      {
        id: "1",
        name: "Biume Studio",
        slug: "biume-studio",
        logo: "https://picsum.photos/200",
      },
      {
        id: "2",
        name: "Digital Agency",
        slug: "digital-agency",
        logo: null,
      },
      {
        id: "3",
        name: "Tech Solutions",
        slug: "tech-solutions",
        logo: "https://picsum.photos/201",
      },
    ] as Organization[],
  };
};

// Service simulé pour la gestion des organisations
const organization = {
  setActive: async ({ organizationId }: { organizationId: string }) => {
    return Promise.resolve();
  },
};

// Logger simulé
const logger = {
  error: (message: string, error: unknown) => {
    console.error(message, error);
  },
};

// Composant Stepper simulé
const Stepper = () => null;

// Composant Image simulé
const Image = ({ src, alt, width, height, className }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);

const SidebarHeaderPro = () => {
  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();
  const navigate = useNavigate();

  const handleOrganizationSwitch = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId });
      navigate(`/dashboard/organization/${orgId}`);
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
                        className="object-cover rounded-full"
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

export default SidebarHeaderPro;
