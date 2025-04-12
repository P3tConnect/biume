import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 p-6">
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

      {/* Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
