import React from 'react'
import { Separator } from "@/components/ui/separator"

export const DashboardFooter = () => {
  return (
    <footer className="border-t py-2 px-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Votre Application
        </p>
        <div className="flex items-center gap-3 text-xs">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Confidentialité
          </a>
          <Separator orientation="vertical" className="h-3" />
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Conditions
          </a>
          <Separator orientation="vertical" className="h-3" />
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
} 