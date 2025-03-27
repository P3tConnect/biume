import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { organization, useActiveOrganization, useListOrganizations, useSession } from "@/src/lib/auth-client"
import { proMenuList } from "@/src/config/menu-list"
import {
  Building,
  Home,
  Activity,
  Info,
  DollarSign,
  Users,
  Cog,
  Headphones,
  Bell,
  ClipboardList,
  Book,
  Command,
  Search,
  User,
  AlertCircle,
  ChevronDown,
  Check,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { cn } from "@/src/lib/utils"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui"
import { AccountSwitchDialog } from "../account-switch-dialog";
import { toast } from "sonner"

interface DashboardSidebarProps {
  companyId: string
}

export function DashboardSidebar({ companyId }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { data: activeOrganization } = useActiveOrganization()
  const { data: organizations } = useListOrganizations()
  const { state } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const t = useTranslations()
  const [switchingOrg, setSwitchingOrg] = useState<string | null>(null)
  const [switchingPersonal, setSwitchingPersonal] = useState(false)
  const [showPersonalDialog, setShowPersonalDialog] = useState(false)
  const [showProfessionalDialog, setShowProfessionalDialog] = useState(false)
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Récupérer les menus
  const menuGroups = proMenuList(pathname || "", companyId)

  // Fonction pour obtenir l'icône pour chaque groupe de menu
  const getGroupIcon = (groupLabel: string) => {
    if (!groupLabel) return Home
    if (groupLabel.includes("management")) return Activity
    if (groupLabel.includes("services")) return Activity
    if (groupLabel.includes("informations")) return Info
    if (groupLabel.includes("accounting")) return DollarSign
    if (groupLabel.includes("clients")) return Users
    if (groupLabel.includes("settings")) return Cog
    if (groupLabel.includes("help")) return Headphones
    if (groupLabel.includes("notifications")) return Bell
    if (groupLabel.includes("reports")) return ClipboardList
    return Book
  }

  const handlePersonalAccountSwitch = async () => {
    if (pathname?.startsWith(`/dashboard/user/${session?.user?.id}`)) return

    setSwitchingPersonal(true)
    setIsLoading(true)
    setShowPersonalDialog(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))

      const result = await organization.setActive({
        organizationId: "",
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      router.push(`/dashboard/user/${session?.user?.id}`)
      setIsLoading(false)
    } catch (error) {
      toast.error("Erreur lors du changement de compte", {
        description: "Veuillez réessayer",
        icon: <AlertCircle className="h-5 w-5 text-white" />,
      })
      setShowPersonalDialog(false)
    } finally {
      setSwitchingPersonal(false)
    }
  }

  const handleOrganizationSwitch = async (orgId: string) => {
    if (pathname?.startsWith(`/dashboard/organization/${orgId}`)) return

    setSwitchingOrg(orgId)
    setActiveOrgId(orgId)
    setIsLoading(true)
    setShowProfessionalDialog(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))

      const result = await organization.setActive({
        organizationId: orgId,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      router.push(`/dashboard/organization/${orgId}`)
      setIsLoading(false)
    } catch (error) {
      toast.error("Erreur lors du changement de compte", {
        description: "Veuillez réessayer",
        icon: <AlertCircle className="h-5 w-5 text-white" />,
      })
      setShowProfessionalDialog(false)
    } finally {
      setSwitchingOrg(null)
    }
  }

  const isPersonalDashboard = pathname?.startsWith(`/dashboard/user/${session?.user?.id}`)

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-accent transition-colors">
                  {isPersonalDashboard ? (
                    session?.user?.image ? (
                      <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-secondary/30 transition-all duration-300 group-hover:ring-secondary/50 group-hover:ring-2">
                        <Image
                          src={session?.user?.image ?? undefined}
                          alt={session?.user?.name || ""}
                          width={20}
                          height={20}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-secondary/30 dark:bg-secondary/20 dark:group-hover:bg-secondary/30">
                        <User className="h-3 w-3 text-secondary dark:text-secondary-foreground" />
                      </div>
                    )
                  ) : activeOrganization?.logo ? (
                    <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-secondary/30 shadow-sm transition-all duration-300 group-hover:ring-secondary/50 group-hover:ring-2">
                      <Image
                        src={activeOrganization.logo}
                        alt={activeOrganization.name}
                        width={20}
                        height={20}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-secondary/20">
                      <Building className="h-3 w-3 text-secondary" />
                    </div>
                  )}
                  {/* <span className="flex-1 text-left">
                    {isPersonalDashboard
                      ? session?.user?.name || "Compte personnel"
                      : activeOrganization?.name || "Organisation"}
                  </span> */}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                    Compte personnel
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className={cn(
                      "group flex items-center gap-3 p-2 rounded-md transition-all cursor-pointer duration-200",
                      isPersonalDashboard
                        ? "bg-secondary/10 text-secondary dark:bg-secondary/10 dark:text-secondary-foreground font-medium shadow-sm"
                        : "hover:bg-accent hover:translate-x-1 hover:shadow-sm",
                      switchingPersonal && "animate-pulse opacity-70"
                    )}
                    disabled={switchingPersonal || switchingOrg !== null}
                    onClick={handlePersonalAccountSwitch}
                  >
                    {session?.user?.image ? (
                      <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-secondary/30">
                        <Image
                          src={session?.user?.image}
                          alt={session?.user?.name || ""}
                          width={20}
                          height={20}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center">
                        <User className="h-3 w-3 text-secondary dark:text-secondary-foreground" />
                      </div>
                    )}
                    <span className="flex-1">{session?.user?.name || "Compte personnel"}</span>
                    {isPersonalDashboard && (
                      <Check className="h-4 w-4 ml-auto text-secondary dark:text-secondary-foreground animate-in zoom-in-50 duration-300" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {organizations && organizations.length > 0 ? (
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                      Comptes professionnels
                    </DropdownMenuLabel>
                    <div className="max-h-[200px] overflow-y-auto my-1 rounded-md space-y-0.5 pr-1">
                      {organizations.map(org => (
                        <DropdownMenuItem
                          key={org.id}
                          className={cn(
                            "group flex items-center gap-3 p-2 rounded-md transition-all cursor-pointer duration-200",
                            !isPersonalDashboard && activeOrganization?.id === org.id
                              ? "bg-secondary/10 text-secondary font-medium shadow-sm"
                              : "hover:bg-accent hover:translate-x-1 hover:shadow-sm",
                            switchingOrg === org.id && "animate-pulse opacity-70"
                          )}
                          disabled={switchingOrg !== null}
                          onClick={() => handleOrganizationSwitch(org.id)}
                        >
                          {org.logo ? (
                            <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-secondary/30">
                              <Image src={org.logo} alt={org.name} width={20} height={20} className="h-full w-full object-cover" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center">
                              <Building className="h-3 w-3 text-secondary" />
                            </div>
                          )}
                          <span className="flex-1">{org.name}</span>
                          {!isPersonalDashboard && activeOrganization?.id === org.id && (
                            <Check className="h-4 w-4 ml-auto text-secondary animate-in zoom-in-50 duration-300" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuGroup>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Menus principaux sans groupe */}
        {menuGroups
          .filter(group => !group.groupLabel)
          .map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              <SidebarMenu>
                {group.menus.map((menu, menuIndex) => (
                  <SidebarMenuItem key={menuIndex}>
                    <SidebarMenuButton
                      asChild
                      isActive={menu.active}
                      tooltip={state === "collapsed" ? t(menu.label) : undefined}
                    >
                      <a href={menu.href} className={cn("flex items-center gap-3", menu.active && "font-medium")}>
                        {menu.icon && <menu.icon className="h-4 w-4" />}
                        <span>{t(menu.label)}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}

        {/* Groupes de menus */}
        {menuGroups
          .filter(group => group.groupLabel)
          .map((group, groupIndex) => {
            const GroupIcon = getGroupIcon(group.groupLabel)
            return (
              <SidebarGroup key={groupIndex}>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <GroupIcon className="h-4 w-4" />
                  <span>{t(group.groupLabel)}</span>
                </SidebarGroupLabel>

                <SidebarMenu>
                  {group.menus.map((menu, menuIndex) => (
                    <SidebarMenuItem key={menuIndex}>
                      <SidebarMenuButton
                        asChild
                        isActive={menu.active}
                        tooltip={state === "collapsed" ? t(menu.label) : undefined}
                      >
                        <a href={menu.href} className={cn("flex items-center gap-3", menu.active && "font-medium")}>
                          {menu.icon && <menu.icon className="h-4 w-4" />}
                          <span>{t(menu.label)}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            )
          })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          asChild
          isActive={pathname === `/dashboard/organization/${companyId}/settings`}
          tooltip={state === "collapsed" ? "Paramètres" : undefined}
          onClick={() => router.push(`/dashboard/organization/${companyId}/settings`)}
        >
          <button className="flex items-center gap-3 w-full">
            <Cog className="h-4 w-4" />
            <span>Paramètres</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>

      <AccountSwitchDialog
        open={showPersonalDialog}
        onOpenChange={setShowPersonalDialog}
        type="personal"
        isLoading={isLoading}
      />

      <AccountSwitchDialog
        open={showProfessionalDialog}
        onOpenChange={setShowProfessionalDialog}
        type="professional"
        organizationName={organizations?.find(org => org.id === activeOrgId)?.name}
        isLoading={isLoading}
      />
    </Sidebar>
  )
}
