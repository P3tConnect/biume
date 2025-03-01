"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import { PageSwitch } from "@/components/landing-page/page-switch";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useSession, signOut } from "@/src/lib/auth-client";
import {
  PawPrint,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Settings,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "Tarifs", href: "#pricing" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed transition-all duration-500 z-50",
        isScrolled
          ? "top-5 left-1/2 -translate-x-1/2 max-w-5xl w-[95%] rounded-full py-2 shadow-lg border border-border/30"
          : "top-0 left-0 right-0 py-5",
      )}
    >
      <div
        className={cn(
          "transition-all duration-500 backdrop-blur-lg -z-10",
          isScrolled
            ? "absolute inset-0 bg-background/85 rounded-full"
            : "absolute inset-0 bg-transparent",
        )}
      />

      <div
        className={cn(
          "container mx-auto px-4 relative z-10",
          isScrolled ? "px-5" : "",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                <PawPrint
                  className={
                    isScrolled ? "w-4 h-4 text-white" : "w-5 h-5 text-white"
                  }
                />
              </div>
            </motion.div>
            <span
              className={cn(
                "font-bold tracking-tight transition-all",
                isScrolled ? "text-lg" : "text-xl",
              )}
            >
              Biume
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav
            className={cn(
              "items-center gap-4 transition-all duration-300",
              isScrolled ? "hidden lg:flex" : "hidden md:flex gap-6",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Switcher et Boutons - Desktop */}
          <div
            className={cn(
              "items-center transition-all duration-300",
              isScrolled ? "hidden lg:flex gap-3" : "hidden md:flex gap-4",
            )}
          >
            <PageSwitch />

            <ModeToggle />

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full h-9 w-9 p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {session.user?.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/user/${session.user?.id}`)}>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Tableau de bord</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/user/${session.user?.id}/settings`)}>
                      <UserIcon className="w-4 h-4 mr-2" />
                      <span>Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/user/${session.user?.id}/reservations`)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Rendez-vous</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login");
                      },
                    },
                  })}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div
                className={cn(
                  "items-center transition-all duration-300",
                  isScrolled ? "hidden md:flex gap-2" : "flex gap-3",
                )}
              >
                <Button
                  variant="ghost"
                  size={isScrolled ? "sm" : "default"}
                  asChild
                >
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button size={isScrolled ? "sm" : "default"} asChild>
                  <Link href="/register">Inscription</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Menu Mobile */}
          <div
            className={cn(
              "flex items-center transition-all",
              isScrolled ? "gap-1 lg:hidden" : "gap-2 md:hidden",
            )}
          >
            <ModeToggle />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[275px] sm:w-[350px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <PawPrint className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold">Biume</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="flex justify-center mb-6">
                    <PageSwitch />
                  </div>

                  <nav className="space-y-1 mb-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center py-3 px-4 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto">
                    {session ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-4 py-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={session.user?.image || ""}
                              alt={session.user?.name || "User"}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {session.user?.name?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {session.user?.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {session.user?.email}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-3">
                          <Link
                            href="/dashboard"
                            className="flex items-center py-2 px-4 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Tableau de bord
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center py-2 px-4 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <UserIcon className="w-4 h-4 mr-3" />
                            Profil
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center py-2 px-4 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors w-full text-left"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 space-y-3">
                        <Button asChild className="w-full" variant="default">
                          <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Inscription
                          </Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                          <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Connexion
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
