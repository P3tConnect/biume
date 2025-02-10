"use client";

import { Button } from "@/components/ui/button";
import {
  PawPrint,
  Stethoscope,
  Menu,
  X,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { useSession, signOut } from "@/src/lib/auth-client";
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
import Avvvatars from "avvvatars-react";

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const version = searchParams.get("version") || "user";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSwitch = (newVersion: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("version", newVersion);
    router.push(`${pathname}?${params.toString()}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl"></div>
      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/assets/images/Icone.png"
                alt="Pawthera"
                fill
                className="object-contain group-hover:animate-pulse"
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Biume
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted/50 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Switch */}
            <div className="bg-muted/50 rounded-full p-1.5 flex items-center gap-1 shadow-sm">
              <Button
                size="sm"
                variant={version === "user" ? "default" : "ghost"}
                className={cn(
                  "rounded-full transition-all duration-300",
                  version === "user" && "shadow-lg",
                )}
                onClick={() => handleSwitch("user")}
              >
                <PawPrint className="w-4 h-4 mr-2" />
                Propriétaires
              </Button>
              <Button
                size="sm"
                variant={version === "pro" ? "default" : "ghost"}
                className={cn(
                  "rounded-full transition-all duration-300",
                  version === "pro" && "shadow-lg",
                )}
                onClick={() => handleSwitch("pro")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Professionnels
              </Button>
            </div>

            {/* Auth Buttons or User Menu */}
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-8 w-8 rounded-full"
                  >
                    {session.user.image ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name || ""}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Avvvatars
                          value={session.user.email || ""}
                          size={32}
                          style="shape"
                        />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/user/${session.user.id}`}
                        className="flex items-center cursor-pointer"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Tableau de bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/user/${session.user.id}/settings`}
                        className="flex items-center cursor-pointer"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.push("/sign-in");
                          },
                        },
                      })
                    }
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/5 transition-colors duration-300"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-primary/90 hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-lg border-b",
              "transition-all duration-300 transform",
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0",
            )}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              {/* Switch */}
              <div className="flex flex-col gap-2">
                <Button
                  size="lg"
                  variant={version === "user" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSwitch("user")}
                >
                  <PawPrint className="w-5 h-5 mr-2" />
                  Propriétaires
                </Button>
                <Button
                  size="lg"
                  variant={version === "pro" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSwitch("pro")}
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Professionnels
                </Button>
              </div>

              {/* Auth Buttons or User Menu */}
              {session?.user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 py-3">
                    {session.user.image ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name || ""}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center">
                        <Avvvatars
                          value={session.user.email || ""}
                          size={40}
                          style="shape"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{session.user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/user/${session.user.id}`}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Tableau de bord
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/user/${session.user.id}/settings`}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Paramètres
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start"
                    onClick={() =>
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.push("/sign-in");
                            setIsMenuOpen(false);
                          },
                        },
                      })
                    }
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/sign-in" className="w-full">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="w-full">
                    <Button
                      size="lg"
                      className="w-full justify-center bg-primary/90 hover:bg-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
