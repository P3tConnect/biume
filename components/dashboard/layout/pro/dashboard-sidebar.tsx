import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { getSession, organization, useActiveOrganization } from "@/src/lib/auth-client"
import { proMenuList } from "@/src/config/menu-list"
import { Building, Cog, User, AlertCircle, Check, Plus, ChevronsUpDown, ChevronRight } from "lucide-react"
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { cn } from "@/src/lib/utils"
import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import { AccountSwitchDialog } from "../account-switch-dialog"
import { toast } from "sonner"
import { getAllOrganizationsByUserId } from "@/src/actions/organization.action"
import { useQueries } from "@tanstack/react-query"
import { Credenza, CredenzaContent } from "@/components/ui/credenza"
import { CommandDialog } from "@/components/common/command/command-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Stepper from "@/components/onboarding/components/stepper"

interface DashboardSidebarProps {
  companyId: string
}

export function DashboardSidebar({ companyId }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: activeOrganization } = useActiveOrganization()
  const { state } = useSidebar()
  const t = useTranslations()
  const [switchingOrg, setSwitchingOrg] = useState<string | null>(null)
  const [switchingPersonal, setSwitchingPersonal] = useState(false)
  const [showPersonalDialog, setShowPersonalDialog] = useState(false)
  const [showProfessionalDialog, setShowProfessionalDialog] = useState(false)
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCommandDialog, setShowCommandDialog] = useState(false)
  const [showCredenza, setShowCredenza] = useState(false)

  const [{ data: session }, { data: organizations }] = useQueries({
    queries: [
      {
        queryKey: ["user-informations"],
        queryFn: () => getSession(),
      },
      {
        queryKey: ["user-organizations"],
        queryFn: () => getAllOrganizationsByUserId({}),
      },
    ],
  })

  // Récupérer les menus
  const menuGroups = proMenuList(pathname || "", companyId)

  const handlePersonalAccountSwitch = async () => {
    if (pathname?.startsWith(`/dashboard/user/${session?.data?.user.id}`)) return

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

      router.push(`/dashboard/user/${session?.data?.user.id}`)
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

  const isPersonalDashboard = pathname?.startsWith(`/dashboard/user/${session?.data?.user.id}`)

  // Composant pour le menu replié avec dropdown
  const CollapsedSubMenu = ({ menu, t }: { menu: any; t: any }) => {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton isActive={menu.active} tooltip={t(menu.label)}>
              {menu.icon && <menu.icon className="h-4 w-4" />}
              <span>{t(menu.label)}</span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuLabel>{t(menu.label)}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menu.submenus?.map((submenu: any, index: number) => (
              <DropdownMenuItem key={index} asChild>
                <a
                  href={submenu.href}
                  className={cn("flex items-center gap-2", submenu.active && "bg-accent text-accent-foreground")}
                >
                  {submenu.icon && <submenu.icon className="h-4 w-4" />}
                  <span>{t(submenu.label)}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  // Composant pour le menu déployé avec sous-menus
  const ExpandedSubMenu = ({ menu, t }: { menu: any; t: any }) => {
    return (
      <Collapsible defaultOpen={menu.active}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="group" isActive={menu.active}>
              {menu.icon && <menu.icon className="h-4 w-4" />}
              <span>{t(menu.label)}</span>
              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {menu.submenus?.map((submenu: any, index: number) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSubButton asChild isActive={submenu.active}>
                    <a href={submenu.href} className="flex items-center gap-2">
                      {submenu.icon && <submenu.icon className="h-4 w-4" />}
                      <span>{t(submenu.label)}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Credenza>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
                      <span className="truncate font-semibold">{activeOrganization?.name}</span>
                      <span className="truncate text-xs">{activeOrganization?.name}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="right"
                  className="w-64 p-2 rounded-lg border border-border/40 shadow-lg animate-in fade-in-50 zoom-in-95 slide-in-from-top-5 duration-200"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                      Compte personnel
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      className={cn(
                        "group flex items-center gap-3 p-2 rounded-md transition-all duration-200 hover:bg-accent hover:translate-x-1 hover:shadow-sm cursor-pointer",
                        switchingPersonal && "animate-pulse opacity-70"
                      )}
                      onSelect={handlePersonalAccountSwitch}
                      disabled={switchingPersonal || switchingOrg !== null}
                    >
                      {session?.data?.user?.image ? (
                        <div className="h-8 w-8 overflow-hidden rounded-md shadow-sm flex-shrink-0 transition-all duration-300 ring-1 ring-border/50 hover:ring-primary/20">
                          <Image
                            src={session.data.user.image}
                            alt={session.data.user.name || ""}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-primary/20">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">
                          {session?.data?.user?.name || "Personnel"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">Compte personnel</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {organizations && organizations.data && organizations.data.length > 0 && (
                    <>
                      <DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                          Comptes professionnels
                        </DropdownMenuLabel>
                        <div className="max-h-[200px] overflow-y-auto my-1 rounded-md space-y-0.5 pr-1">
                          {organizations.data.map(org => (
                            <DropdownMenuItem
                              key={org.id}
                              className={cn(
                                "group flex items-center gap-3 p-2 rounded-md transition-all cursor-pointer duration-200",
                                companyId === org.id
                                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                                  : "hover:bg-accent hover:translate-x-1 hover:shadow-sm",
                                switchingOrg === org.id && "animate-pulse opacity-70"
                              )}
                              onSelect={() => handleOrganizationSwitch(org.id)}
                              disabled={switchingOrg !== null}
                            >
                              {org.logo ? (
                                <div
                                  className={cn(
                                    "h-8 w-8 overflow-hidden rounded-md shadow-sm flex-shrink-0 transition-all duration-300",
                                    companyId === org.id
                                      ? "ring-2 ring-primary/30"
                                      : "ring-1 ring-border/50 hover:ring-primary/20"
                                  )}
                                >
                                  <Image
                                    src={org.logo}
                                    alt={org.name}
                                    width={32}
                                    height={32}
                                    className={cn(
                                      "h-full w-full object-cover transition-transform duration-300",
                                      companyId !== org.id && "hover:scale-110"
                                    )}
                                  />
                                </div>
                              ) : (
                                <div
                                  className={cn(
                                    "h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300",
                                    companyId === org.id ? "bg-primary/20" : "bg-primary/10 hover:bg-primary/15"
                                  )}
                                >
                                  <Building className="h-4 w-4 text-primary" />
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium leading-none">{org.name}</span>
                                <span className="text-xs text-muted-foreground mt-1">Compte professionnel</span>
                              </div>
                              {companyId === org.id && (
                                <Check className="h-4 w-4 ml-auto text-primary animate-in zoom-in-50 duration-300" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuGroup>
                      <DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                          Nouvelle entreprise
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => setShowCredenza(true)}
                          className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:translate-x-1 transition-all cursor-pointer duration-200 hover:shadow-sm"
                        >
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-primary/20">
                            <Plus className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium leading-none">Créer une entreprise</span>
                            <span className="text-xs text-muted-foreground mt-1">Devenez professionnel</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </Credenza>
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
                {group.menus.map((menu, menuIndex) => {
                  if (menu.submenus) {
                    return state === "collapsed" ? (
                      <CollapsedSubMenu key={menuIndex} menu={menu} t={t} />
                    ) : (
                      <ExpandedSubMenu key={menuIndex} menu={menu} t={t} />
                    )
                  }
                  return (
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
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}

        {/* Groupes de menus */}
        {menuGroups
          .filter(group => group.groupLabel)
          .map((group, groupIndex) => {
            return (
              <SidebarGroup key={groupIndex}>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <span>{t(group.groupLabel)}</span>
                </SidebarGroupLabel>

                <SidebarMenu>
                  {group.menus.map((menu, menuIndex) => {
                    if (menu.submenus) {
                      return state === "collapsed" ? (
                        <CollapsedSubMenu key={menuIndex} menu={menu} t={t} />
                      ) : (
                        <ExpandedSubMenu key={menuIndex} menu={menu} t={t} />
                      )
                    }
                    return (
                      <SidebarMenuItem key={menuIndex}>
                        <SidebarMenuButton
                          asChild
                          isActive={menu.active && !menu.comingSoon}
                          disabled={menu.comingSoon}
                          tooltip={state === "collapsed" ? t(menu.label) : undefined}
                        >
                          <a href={menu.href} className={cn("flex items-center gap-3", menu.active && "font-medium")}>
                            {menu.icon && <menu.icon className="h-4 w-4" />}
                            <span>{t(menu.label)}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
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
        organizationName={organizations?.data?.find(org => org.id === activeOrgId)?.name}
        isLoading={isLoading}
      />

      <CommandDialog open={showCommandDialog} onOpenChange={setShowCommandDialog} companyId={companyId} />
      <Credenza open={showCredenza} onOpenChange={setShowCredenza}>
        <CredenzaContent>
          <Stepper />
        </CredenzaContent>
      </Credenza>
    </Sidebar>
  )
}
