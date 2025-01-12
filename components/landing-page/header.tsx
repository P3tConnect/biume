"use client";

import { Button } from "@/components/ui/button";
import { PawPrint, Stethoscope, Menu, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const version = searchParams.get("version") || "user";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                src="/logo.png"
                alt="Pawthera"
                fill
                className="object-contain group-hover:animate-pulse"
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pawthera
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
                  version === "user" && "shadow-lg"
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
                  version === "pro" && "shadow-lg"
                )}
                onClick={() => handleSwitch("pro")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Professionnels
              </Button>
            </div>

            {/* Auth Buttons */}
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
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-lg border-b",
              "transition-all duration-300 transform",
              isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
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

              {/* Auth Buttons */}
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}