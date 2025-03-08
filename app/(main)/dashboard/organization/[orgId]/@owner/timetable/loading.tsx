import React from "react"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const DashboardOrganizationTimetableLoading = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header skeleton */}
      <div className="pb-2">
        <Card className="overflow-hidden rounded-2xl">
          <div className="border-b border-gray-100 dark:border-gray-800 py-3 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-40" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Calendar View skeleton */}
      <div className="flex-1 overflow-hidden pb-4">
        <Card className="rounded-xl overflow-hidden h-full">
          <div className="h-full flex flex-col">
            {/* Calendar header */}
            <div className="flex justify-between items-center px-2 py-3 border-b">
              <Skeleton className="h-6 w-40" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
            </div>

            {/* Calendar grid */}
            <div className="flex-1 overflow-auto p-4">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={`weekday-${i}`} className="h-6" />
                  ))}
              </div>

              {/* Calendar days */}
              <div className="space-y-2">
                {Array(5)
                  .fill(0)
                  .map((_, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
                      {Array(7)
                        .fill(0)
                        .map((_, dayIndex) => (
                          <div
                            key={`day-${weekIndex}-${dayIndex}`}
                            className="min-h-[160px] md:min-h-[180px] rounded-xl border border-border/60 p-2"
                          >
                            <Skeleton className="h-6 w-6 rounded-full mb-2" />
                            {/* Appointment skeletons */}
                            <div className="space-y-2">
                              <Skeleton className="h-12 w-full rounded-lg" />
                              <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOrganizationTimetableLoading
