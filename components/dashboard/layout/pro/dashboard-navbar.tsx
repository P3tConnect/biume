"use client";

import { ModeToggle } from "../mode-toggle";
import { UserNav } from "../user-nav";
import Notifications from "../notifications";
import React from "react";
import {
  Button,
  CommandDialog,
  DialogTitle,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Home,
  Calendar,
  Building,
  Check,
  User,
  Plus,
  Users,
  DollarSign as DollarSignIcon,
  Briefcase,
  ClipboardList,
  Info,
  Book,
  Bell,
  Headphones,
  Cog,
  Activity,
  ChevronDown,
  Search,
  Menu,
  ArrowLeftRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  useSession,
  useActiveOrganization,
  useListOrganizations,
  organization,
  getSession,
} from "@/src/lib/auth-client";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { proMenuList } from "@/src/config/menu-list";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

export function DashboardNavbar({ companyId }: { companyId: string }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isWindows =
    typeof window !== "undefined" && window.navigator.platform.includes("Win");
  const shortcutKey = isWindows ? "Ctrl" : "⌘";
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { data: session } = useQuery({
    queryKey: ["user-informations"],
    queryFn: () => getSession(),
  });
  const { data: activeOrganization } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();
  const menuGroups = proMenuList(pathname || "", companyId);
  const [switchingOrg, setSwitchingOrg] = useState<string | null>(null);

  // Fonction pour obtenir l'icône pour chaque groupe de menu
  const getGroupIcon = (groupLabel: string) => {
    if (!groupLabel) return Home;

    // Mapper les icônes en fonction des libellés de groupe
    if (groupLabel.includes("management")) return Briefcase;
    if (groupLabel.includes("services")) return Activity;
    if (groupLabel.includes("informations")) return Info;
    if (groupLabel.includes("accounting")) return DollarSignIcon;
    if (groupLabel.includes("clients")) return Users;
    if (groupLabel.includes("settings")) return Cog;
    if (groupLabel.includes("help")) return Headphones;
    if (groupLabel.includes("notifications")) return Bell;
    if (groupLabel.includes("reports")) return ClipboardList;

    // Icône par défaut
    return Book;
  };

  const handleOrganizationSwitch = async (orgId: string) => {
    setSwitchingOrg(orgId);
    try {
      await organization.setActive({ organizationId: orgId });
      router.push(`/dashboard/organization/${orgId}`);
    } catch (error) {
      toast.error("Erreur lors du changement d'organisation", {
        description: "Veuillez réessayer",
      });
    } finally {
      setSwitchingOrg(null);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Classes communes pour la navigation
  const navIconClass = "h-4 w-4";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95 shadow-sm">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo et sélecteur d'organisation */}
        <div className="flex items-center">
          <DropdownMenu open={orgMenuOpen} onOpenChange={setOrgMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "flex items-center gap-2 text-xs mr-4 shadow-sm transition-all duration-300 group hover:shadow-md",
                  "bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 text-secondary",
                )}
              >
                {activeOrganization?.logo ? (
                  <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-secondary/30 transition-all duration-300 group-hover:ring-secondary/50 group-hover:ring-2">
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
                  {activeOrganization?.name || "Organisation"}
                </span>
                <ArrowLeftRight
                  className={`h-3.5 w-3.5 ml-1 opacity-70 transition-transform duration-300 ${orgMenuOpen ? "rotate-180" : "rotate-0"}`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64 p-2 rounded-lg border border-border/40 shadow-lg animate-in fade-in-50 zoom-in-95 slide-in-from-top-5 duration-200"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                  Compte personnel
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:translate-x-1 transition-all duration-200 hover:shadow-sm"
                  onSelect={() =>
                    router.push(`/dashboard/user/${session?.data?.user.id}`)
                  }
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
                    <span className="text-xs text-muted-foreground mt-1">
                      Compte personnel
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              {organizations && organizations.length > 0 && (
                <DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuLabel className="text-xs font-medium px-2 py-1.5 text-muted-foreground">
                    Comptes professionnels
                  </DropdownMenuLabel>
                  <div className="max-h-[200px] overflow-y-auto my-1 rounded-md space-y-0.5 pr-1">
                    {organizations.map((org) => (
                      <DropdownMenuItem
                        key={org.id}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-md transition-all duration-200",
                          companyId === org.id
                            ? "bg-secondary/10 text-secondary font-medium shadow-sm"
                            : "hover:bg-accent hover:translate-x-1 hover:shadow-sm",
                          switchingOrg === org.id && "animate-pulse opacity-70",
                        )}
                        onSelect={() => handleOrganizationSwitch(org.id)}
                        disabled={switchingOrg !== null}
                      >
                        {org.logo ? (
                          <div
                            className={cn(
                              "h-8 w-8 overflow-hidden rounded-md shadow-sm flex-shrink-0 transition-all duration-300",
                              companyId === org.id
                                ? "ring-2 ring-secondary/30"
                                : "ring-1 ring-border/50 hover:ring-secondary/20",
                            )}
                          >
                            <Image
                              src={org.logo}
                              alt={org.name}
                              width={32}
                              height={32}
                              className={cn(
                                "h-full w-full object-cover transition-transform duration-300",
                                companyId !== org.id && "hover:scale-110",
                              )}
                            />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300",
                              companyId === org.id
                                ? "bg-secondary/20"
                                : "bg-secondary/10 hover:bg-secondary/15",
                            )}
                          >
                            <Building className="h-4 w-4 text-secondary" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-none">
                            {org.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Compte professionnel
                          </span>
                        </div>
                        {companyId === org.id && (
                          <Check className="h-4 w-4 ml-auto text-secondary animate-in zoom-in-50 duration-300" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bouton Menu Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation principale - Desktop */}
        <div className="hidden md:flex items-center justify-center gap-3">
          {/* Éléments sans groupLabel (menu principal) */}
          {menuGroups
            .filter((group) => !group.groupLabel)
            .flatMap((group) =>
              group.menus.map((menu, menuIndex) => (
                <Link
                  key={`main-menu-${menuIndex}`}
                  href={menu.href}
                  className={cn(
                    "flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-200",
                    menu.active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent/80 hover:scale-105 hover:shadow-sm",
                  )}
                >
                  {menu.icon && (
                    <menu.icon
                      className={cn(
                        "h-3.5 w-3.5",
                        menu.active ? "text-primary-foreground" : "",
                      )}
                    />
                  )}
                  <span>{t(menu.label)}</span>
                </Link>
              )),
            )}

          {/* Groupes de menus */}
          {menuGroups
            .filter(
              (group) =>
                group.groupLabel && !group.groupLabel.includes("informations"),
            )
            .map((group, index) => {
              const GroupIcon = getGroupIcon(group.groupLabel);
              const isServicesGroup = group.groupLabel.includes("services");

              // Vérifier si un des menus ou sous-menus du groupe est actif
              const isGroupActive = group.menus.some(
                (menu) =>
                  menu.active ||
                  (menu.submenus &&
                    menu.submenus.some((submenu) => submenu.active)),
              );

              return (
                <React.Fragment key={index}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-200",
                          isGroupActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-accent/80 hover:scale-105 hover:shadow-sm",
                        )}
                      >
                        <GroupIcon
                          className={cn(
                            "h-3.5 w-3.5",
                            isGroupActive ? "text-primary-foreground" : "",
                          )}
                        />
                        <span>{t(group.groupLabel)}</span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 ml-0.5",
                            isGroupActive
                              ? "text-primary-foreground opacity-100"
                              : "opacity-70",
                          )}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      className="w-64 p-2 rounded-xl border border-border/40 shadow-lg"
                    >
                      <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider p-2 mb-2 text-muted-foreground/80 border-b border-border/30">
                        <div className="flex items-center gap-2">
                          <GroupIcon className="h-4 w-4" />
                          <span>{t(group.groupLabel)}</span>
                        </div>
                      </DropdownMenuLabel>
                      <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-1">
                        {group.menus.map((menu, menuIndex) =>
                          menu.submenus ? (
                            <DropdownMenuSub key={menuIndex}>
                              <DropdownMenuSubTrigger
                                className={cn(
                                  "flex items-center rounded-lg p-2 transition-all duration-200",
                                  menu.active
                                    ? "bg-accent/80 font-medium"
                                    : "hover:bg-accent hover:pl-1",
                                )}
                              >
                                {menu.icon && (
                                  <menu.icon className="h-4 w-4 mr-2" />
                                )}
                                <span>{t(menu.label)}</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent className="w-64 p-2 rounded-xl border border-border/40 shadow-lg">
                                  {menu.submenus.map((submenu, subIndex) => (
                                    <DropdownMenuItem
                                      key={subIndex}
                                      asChild
                                      className={cn(
                                        "rounded-lg p-2 transition-all duration-200",
                                        submenu.active
                                          ? "bg-accent/80 font-medium"
                                          : "hover:bg-accent hover:pl-1",
                                      )}
                                    >
                                      <Link
                                        href={submenu.href}
                                        className="flex w-full items-center"
                                      >
                                        {submenu.icon && (
                                          <submenu.icon className="h-4 w-4 mr-2" />
                                        )}
                                        <span>{t(submenu.label)}</span>
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          ) : (
                            <DropdownMenuItem
                              key={menuIndex}
                              asChild
                              className={cn(
                                "rounded-lg p-2 transition-all duration-200",
                                menu.active
                                  ? "bg-accent/80 font-medium"
                                  : "hover:bg-accent hover:pl-1",
                              )}
                            >
                              <Link
                                href={menu.href}
                                className="flex items-center"
                              >
                                {menu.icon && (
                                  <menu.icon className="h-4 w-4 mr-2" />
                                )}
                                <span>{t(menu.label)}</span>
                              </Link>
                            </DropdownMenuItem>
                          ),
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {isServicesGroup && (
                    <Link
                      href={`/dashboard/organization/${companyId}/settings`}
                      className={cn(
                        "flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all duration-200",
                        pathname ===
                          `/dashboard/organization/${companyId}/settings`
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-accent/80 hover:scale-105 hover:shadow-sm",
                      )}
                    >
                      <Cog
                        className={cn(
                          "h-3.5 w-3.5",
                          pathname ===
                            `/dashboard/organization/${companyId}/settings`
                            ? "text-primary-foreground"
                            : "",
                        )}
                      />
                      <span>{t("dashboard.sidebar.settings")}</span>
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-16 right-0 bottom-0 w-3/4 max-w-sm bg-background p-4 shadow-lg overflow-y-auto">
              <div className="space-y-4">
                {/* Éléments sans groupLabel (menu principal) */}
                {menuGroups
                  .filter((group) => !group.groupLabel)
                  .flatMap((group) =>
                    group.menus.map((menu, menuIndex) => (
                      <Link
                        key={`mobile-main-${menuIndex}`}
                        href={menu.href}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                          menu.active
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {menu.icon && <menu.icon className="h-5 w-5" />}
                        <span className="text-sm font-medium">
                          {t(menu.label)}
                        </span>
                      </Link>
                    )),
                  )}

                {/* Groupes de menus */}
                {menuGroups
                  .filter((group) => group.groupLabel)
                  .map((group, index) => {
                    const GroupIcon = getGroupIcon(group.groupLabel);
                    return (
                      <div key={`mobile-group-${index}`} className="space-y-2">
                        <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground border-b">
                          <GroupIcon className="h-4 w-4" />
                          <span>{t(group.groupLabel)}</span>
                        </div>
                        <div className="pl-3 space-y-1">
                          {group.menus.map((menu, menuIndex) => (
                            <Link
                              key={`mobile-menu-${menuIndex}`}
                              href={menu.href}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-lg transition-all duration-200",
                                menu.active
                                  ? "bg-accent/80 font-medium"
                                  : "hover:bg-accent hover:pl-1",
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {menu.icon && <menu.icon className="h-4 w-4" />}
                              <span className="text-sm">{t(menu.label)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Boutons utilitaires */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 text-xs rounded-lg transition-all duration-200 hover:shadow-md bg-secondary/5 hover:bg-secondary/10 text-secondary border-secondary/10"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="hidden lg:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span>{shortcutKey}</span>K
            </kbd>
          </Button>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg h-9 w-9 hover:bg-accent/70 transition-all duration-200 md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            <div className="h-9 w-9">
              <ModeToggle />
            </div>

            <div className="h-9 w-9">
              <Notifications />
            </div>

            <UserNav />
          </div>
        </div>
      </div>

      {/* Redesigned Command Dialog with neutral colors */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <VisuallyHidden>
          <DialogTitle>Recherche</DialogTitle>
        </VisuallyHidden>
        <CommandInput
          placeholder="Que recherchez-vous ?"
          className="h-14 w-full bg-transparent px-0 py-3 text-base outline-none placeholder:text-muted-foreground/70 focus:ring-0 focus:outline-none border-0"
        />
        <CommandList className="max-h-[60vh] overflow-y-auto py-2 px-1">
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-muted/30 p-3 mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Aucun résultat trouvé.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Essayez avec des termes différents.
              </p>
            </div>
          </CommandEmpty>

          <CommandGroup
            heading={
              <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                Suggestions
              </div>
            }
          >
            <CommandItem className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm transition-colors duration-200 hover:bg-accent/50 data-[selected=true]:bg-accent/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                <Users className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Clients</span>
                <span className="text-xs text-muted-foreground/70">
                  Gérer vos clients
                </span>
              </div>
            </CommandItem>
            <CommandItem className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm transition-colors duration-200 hover:bg-accent/50 data-[selected=true]:bg-accent/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                <Calendar className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Rendez-vous</span>
                <span className="text-xs text-muted-foreground/70">
                  Gérer votre agenda
                </span>
              </div>
            </CommandItem>
            <CommandItem className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm transition-colors duration-200 hover:bg-accent/50 data-[selected=true]:bg-accent/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                <ClipboardList className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Rapports</span>
                <span className="text-xs text-muted-foreground/70">
                  Consulter vos statistiques
                </span>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandGroup
            heading={
              <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 mt-2">
                Actions Rapides
              </div>
            }
          >
            <CommandItem className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm transition-colors duration-200 hover:bg-accent/50 data-[selected=true]:bg-accent/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                <Plus className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Nouveau client</span>
                <span className="text-xs text-muted-foreground/70">
                  Ajouter un nouveau client
                </span>
              </div>
            </CommandItem>
            <CommandItem className="rounded-lg py-2.5 px-2 flex items-center gap-3 text-sm transition-colors duration-200 hover:bg-accent/50 data-[selected=true]:bg-accent/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background shadow-sm">
                <Calendar className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Nouveau rendez-vous</span>
                <span className="text-xs text-muted-foreground/70">
                  Planifier un rendez-vous
                </span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between border-t border-border/30 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Parcourir</span>
            <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
              ↑
            </span>
            <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
              ↓
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Sélectionner</span>
            <span className="flex items-center justify-center rounded-sm border border-border/40 bg-muted/30 h-5 w-5 text-center">
              ↵
            </span>
          </div>
        </div>
      </CommandDialog>
    </header>
  );
}
