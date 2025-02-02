'use client'

import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>

      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/${paths.slice(0, index + 1).join('/')}`}
            className="capitalize hover:text-foreground"
          >
            {path}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
} 