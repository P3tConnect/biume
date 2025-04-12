import React from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SettingsLoading = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        {/* Navigation latérale */}
        <div className="w-full md:w-72 lg:w-80 shrink-0">
          <Card className="sticky top-0">
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>Gérez les paramètres et les préférences de votre organisation</CardDescription>
            </CardHeader>
            <div className="p-6 space-y-4">
              {/* Skeleton pour les catégories */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <div className="pl-4 space-y-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-[80%]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contenu */}
        <div className="w-full">
          <Card className="p-6">
            {/* Header section */}
            <div className="space-y-6 mb-8">
              <Skeleton className="h-8 w-1/3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>

            {/* Main content section */}
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-1/4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsLoading
