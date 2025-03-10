"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { UserNav } from "@/components/dashboard/layout/user-nav"
import { Button } from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"

export function ProHeader() {
  const { data: session } = useSession()

  return (
    <header className="w-full border-b border-border/30 bg-background/95 backdrop-blur-sm z-10 sticky top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Accueil</span>
          </Button>
        </Link>

        {session ? (
          <UserNav />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Inscription</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
