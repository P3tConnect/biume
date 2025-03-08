import { Suspense } from "react"

import { Skeleton } from "@/components/ui"
import { getPets } from "@/src/actions"

import PetsGrid from "./components/pets-grid"
import TitlePage from "./components/title-page"

export default function PetsPage() {
  const pets = getPets({})

  return (
    <div className="space-y-6">
      <TitlePage />
      <Suspense fallback={<Skeleton className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />}>
        <PetsGrid pets={pets} />
      </Suspense>
    </div>
  )
}
