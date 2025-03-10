import { Loader2 } from "lucide-react"
import { Suspense } from "react"

import { Organization } from "@/src/db"

import { OrganizationsGrid } from "./organizations-grid"

interface MainContentProps {
  organizations: Organization[]
}

export function MainContent({ organizations }: MainContentProps) {
  return (
    <div className="w-full px-8 py-8 bg-background">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <OrganizationsGrid organizations={organizations} />
      </Suspense>
    </div>
  )
}
