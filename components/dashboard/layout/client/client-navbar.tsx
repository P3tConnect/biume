"use client"

import { AlertCircle, Building, Check, Dog, Home, Plus, RefreshCw, Settings, Ticket, User } from "lucide-react"
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Credenza,
  CredenzaTrigger,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import React, { useEffect, useState } from "react"
import { organization, useActiveOrganization, useListOrganizations, useSession } from "@/src/lib/auth-client"
import { usePathname, useRouter } from "next/navigation"

import { AccountSwitchDialog } from "../account-switch-dialog"
import Image from "next/image"
import Link from "next/link"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "../mode-toggle"
import Notifications from "../notifications"
import { UserNav } from "../user-nav"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { cn } from "@/src/lib/utils"
import { toast } from "sonner"
import Stepper from "@/components/onboarding/components/stepper"

export function ClientNavbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [createOrgOpen, setCreateOrgOpen] = useState(false)
  const [switchingOrg, setSwitchingOrg] = useState<string | null>(null)
  const [switchingPersonal, setSwitchingPersonal] = useState(false)
  const [showPersonalDialog, setShowPersonalDialog] = useState(false)
  const [showProfessionalDialog, setShowProfessionalDialog] = useState(false)
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isWindows = typeof window !== "undefined" && window.navigator.platform.includes("Win")
  const shortcutKey = isWindows ? "Ctrl" : "⌘"
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { data: activeOrganization } = useActiveOrganization()
  const { data: organizations } = useListOrganizations()
  const userId = session?.user?.id

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
      toast.error("Erreur lors du changement d'organisation", {
        description: "Veuillez réessayer",
        icon: <AlertCircle className="h-5 w-5 text-white" />,
      })
      setShowProfessionalDialog(false)
    } finally {
      setSwitchingOrg(null)
    }
  }

  const isPersonalDashboard = pathname?.startsWith(`/dashboard/user/${session?.user?.id}`)

  const navigation = [
    {
      name: "Accueil",
      path: `/dashboard/user/${userId}`,
      icon: Home,
    },
    {
      name: "Mes réservations",
      path: `/dashboard/user/${userId}/reservations`,
      icon: Ticket,
    },
    {
      name: "Mes animaux",
      path: `/dashboard/user/${userId}/pets`,
      icon: Dog,
    },
    {
      name: "Paramètres",
      path: `/dashboard/user/${userId}/settings`,
      icon: Settings,
    },
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center">
          <Credenza open={createOrgOpen} onOpenChange={setCreateOrgOpen}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 text-xs mr-4 shadow-sm transition-all duration-300 group hover:shadow-md",
                    !isPersonalDashboard
                      ? "bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 text-secondary"
                      : "bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-secondary dark:bg-secondary/10 dark:hover:bg-secondary/20 dark:border-secondary/20 dark:text-secondary-foreground"
                  )}
                >
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
                  <span className="hidden md:inline-block font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:bg-current">
                    {isPersonalDashboard ? "Personnel" : "Pro"}
                  </span>
                  <RefreshCw
                    className={`h-3.5 w-3.5 ml-1 opacity-70 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64 p-2 rounded-lg border border-border/40 shadow-lg animate-in fade-in-50 zoom-in-95 slide-in-from-top-5 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-5"
              >
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
                    onSelect={handlePersonalAccountSwitch}
                    disabled={switchingPersonal || switchingOrg !== null}
                  >
                    {session?.user?.image ? (
                      <div
                        className={cn(
                          "h-8 w-8 overflow-hidden rounded-md shadow-sm flex-shrink-0 transition-all duration-300",
                          isPersonalDashboard
                            ? "ring-2 ring-secondary/30"
                            : "ring-1 ring-border/50 hover:ring-secondary/20"
                        )}
                      >
                        <Image
                          src={session?.user?.image ?? undefined}
                          alt={session?.user?.name || ""}
                          width={32}
                          height={32}
                          className={cn(
                            "h-full w-full object-cover transition-transform duration-300",
                            !isPersonalDashboard && "hover:scale-110"
                          )}
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300",
                          isPersonalDashboard
                            ? "bg-secondary/20 dark:bg-secondary/20"
                            : "bg-secondary/10 dark:bg-secondary/10 hover:bg-secondary/20 dark:hover:bg-secondary/20"
                        )}
                      >
                        <User className="h-4 w-4 text-secondary dark:text-secondary-foreground" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{session?.user?.name || "Personnel"}</span>
                      <span className="text-xs text-muted-foreground mt-1">Compte personnel</span>
                    </div>
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
                          onSelect={() => handleOrganizationSwitch(org.id)}
                          disabled={switchingOrg !== null}
                        >
                          {org.logo ? (
                            <div
                              className={cn(
                                "h-8 w-8 overflow-hidden rounded-md shadow-sm flex-shrink-0 transition-all duration-300",
                                !isPersonalDashboard && activeOrganization?.id === org.id
                                  ? "ring-2 ring-secondary/30"
                                  : "ring-1 ring-border/50 hover:ring-secondary/20"
                              )}
                            >
                              <Image
                                src={org.logo}
                                alt={org.name}
                                width={32}
                                height={32}
                                className={cn(
                                  "h-full w-full object-cover transition-transform duration-300",
                                  isPersonalDashboard || activeOrganization?.id !== org.id ? "hover:scale-110" : ""
                                )}
                              />
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300",
                                !isPersonalDashboard && activeOrganization?.id === org.id
                                  ? "bg-secondary/20"
                                  : "bg-secondary/10 hover:bg-secondary/15"
                              )}
                            >
                              <Building className="h-4 w-4 text-secondary dark:text-secondary-foreground" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium leading-none">{org.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">Compte professionnel</span>
                          </div>
                          {!isPersonalDashboard && activeOrganization?.id === org.id && (
                            <Check className="h-4 w-4 ml-auto text-secondary animate-in zoom-in-50 duration-300" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuGroup>
                ) : (
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                      Devenir professionnel
                    </DropdownMenuLabel>
                    <CredenzaTrigger asChild>
                      <DropdownMenuItem
                        className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:translate-x-1 transition-all cursor-pointer duration-200 hover:shadow-sm"
                        onSelect={e => {
                          e.preventDefault()
                          setDropdownOpen(false)
                          setCreateOrgOpen(true)
                        }}
                      >
                        <div className="h-8 w-8 rounded-md bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-secondary/20 dark:hover:bg-secondary/30">
                          <Plus className="h-4 w-4 text-secondary dark:text-secondary-foreground" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-none">Créer une organisation</span>
                          <span className="text-xs text-muted-foreground mt-1">Devenez professionnel</span>
                        </div>
                      </DropdownMenuItem>
                    </CredenzaTrigger>
                  </DropdownMenuGroup>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Stepper />
          </Credenza>
        </div>

        <nav className="flex flex-1 items-center justify-center space-x-1">
          {navigation.map(item => {
            const isActive = pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "group flex items-center gap-x-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:bg-accent",
                  isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-secondary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="hidden sm:inline-block">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs transition-all duration-200 hover:shadow-sm bg-secondary/5 hover:bg-secondary/10 text-secondary border-secondary/10"
            onClick={() => setSearchOpen(true)}
          >
            <MagnifyingGlassIcon className="mr-2 h-3 w-3" />
            <span className="hidden lg:inline-flex">{shortcutKey}+K</span>
          </Button>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Notifications />
            <UserNav />
          </div>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <VisuallyHidden>
          <DialogTitle>Recherche</DialogTitle>
        </VisuallyHidden>
        <CommandInput placeholder="Que recherchez-vous ?" />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Clients</CommandItem>
            <CommandItem>Rendez-vous</CommandItem>
            <CommandItem>Rapports</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

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
    </header>
  )
}
