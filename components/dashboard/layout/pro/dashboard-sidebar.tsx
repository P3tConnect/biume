import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useActiveOrganization } from "@/src/lib/auth-client"
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

interface DashboardSidebarProps {
  companyId: string
}

export function DashboardSidebar({ companyId }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: activeOrganization } = useActiveOrganization()
  const { state } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const t = useTranslations()

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

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="pb-0">
        <div className="flex items-center gap-3 px-2 py-2">
          {activeOrganization?.logo ? (
            <div className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-border/50">
              <Image
                src={activeOrganization.logo}
                alt={activeOrganization.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building className="h-4 w-4 text-primary" />
            </div>
          )}
          <span className="font-medium text-sm truncate">{activeOrganization?.name || "Organisation"}</span>
        </div>
      </SidebarHeader>

      {/* Barre de recherche */}
      <div className="p-2">
        <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50 hover:bg-accent/80 transition-all duration-200 cursor-text">
          <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
          <kbd className="hidden md:flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
            <Command className="h-3 w-3" /> /
          </kbd>
        </div>
      </div>

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
    </Sidebar>
  )
}
