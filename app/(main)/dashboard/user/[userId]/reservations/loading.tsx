import { Skeleton } from "@/components/ui/skeleton"

export function Loading() {
  return (
    <div className="space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Filtres */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Liste des réservations */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
