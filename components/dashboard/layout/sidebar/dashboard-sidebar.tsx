'use client'

import React, { useState } from 'react'
import { cn } from '@/src/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home, Users, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/dashboard' },
    { icon: Users, label: 'Utilisateurs', href: '/dashboard/users' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Aide', href: '/dashboard/help' },
  ]

  return (
    <aside className={cn(
      "h-screen border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[220px]"
    )}>
      {/* Logo */}
      <div className="h-14 border-b flex items-center justify-between px-3">
        {!isCollapsed && <span className="font-semibold text-sm">Logo</span>}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-1.5 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                "text-muted-foreground hover:text-foreground",
                isActive && "bg-accent text-accent-foreground hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 