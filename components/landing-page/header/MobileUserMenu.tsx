"use client"

import { LogOut, Settings, User as UserIcon } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/src/lib/auth-client"

import { MobileUserMenuProps } from "./types"

export const MobileUserMenu = ({ session, setIsMobileMenuOpen }: MobileUserMenuProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
          <AvatarFallback className="bg-primary/10 text-primary">{session.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{session.user?.name}</span>
          <span className="text-xs text-muted-foreground">{session.user?.email}</span>
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
            signOut()
            setIsMobileMenuOpen(false)
          }}
          className="flex items-center py-2 px-4 text-sm text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
