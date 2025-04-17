"use client"

import { CalendarDays, CalendarIcon, Calendar as CalendarMonth, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ViewMode } from "@/src/types/view-mode"
import { capitalizeFirstLetter } from "../../dashboard/shortcuts/calendar-widget"
import { cn } from "@/src/lib/utils"

interface CalendarHeaderProps {
  currentDate: Date
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarHeader({
  currentDate,
  viewMode,
  onViewModeChange,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <Card className="mb-4 p-4 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={24} className="text-primary" />
            <h2 className="text-xl sm:text-2xl font-semibold truncate">
              {capitalizeFirstLetter(
                currentDate.toLocaleString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })
              )}
            </h2>
          </div>
          <Button
            onClick={onToday}
            variant="outline"
            size="sm"
            className="items-center gap-2 border-primary/20 text-primary/80 hover:bg-primary/5 hover:text-primary hover:border-primary transition-all duration-200 hidden sm:flex"
          >
            <CalendarDays className="h-4 w-4" />
            Aujourd'hui
          </Button>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center">
            <div className="flex rounded-xl overflow-hidden border border-primary/20 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 px-4 rounded-none transition-all duration-200",
                  viewMode === "month"
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-primary/5 hover:text-primary"
                )}
                onClick={() => onViewModeChange("month")}
              >
                <CalendarMonth className="h-4 w-4 mr-2" />
                Mois
              </Button>
              <div className="w-[1px] bg-primary/20" />
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 px-4 rounded-none transition-all duration-200",
                  viewMode === "week"
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-primary/5 hover:text-primary"
                )}
                onClick={() => onViewModeChange("week")}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Semaine
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={onPrevious}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl text-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={onNext}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl text-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
