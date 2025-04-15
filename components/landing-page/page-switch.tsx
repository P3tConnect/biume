"use client"

import { motion } from "framer-motion"
import { Stethoscope, User2Icon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/src/lib/utils"

export const PageSwitch = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentVersion = searchParams.get("version") || "user"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSwitch = (newVersion: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("version", newVersion)
    router.push(`${pathname}?${params.toString()}`)
  }

  if (!mounted) return null

  // Version desktop avec tabs
  return (
    <div className="relative inline-flex p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border">
      {["user", "pro"].map(version => {
        const isActive = currentVersion === version

        return (
          <button
            key={version}
            onClick={() => handleSwitch(version)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
              isActive ? "text-background" : "text-foreground/70 hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {version === "user" ? (
                <>
                  <User2Icon className="w-3.5 h-3.5" />
                  <span>Propriétaires</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Professionnels</span>
                </>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
