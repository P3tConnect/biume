"use client"

import React from "react"
import { Calendar, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/src/lib/utils"
import { ViewMode } from "@/src/types/view-mode"

interface TimetableHeaderClientProps {
  view: "calendar" | "list"
  onViewChange: (view: "calendar" | "list") => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function TimetableHeaderClient({ view, onViewChange, viewMode, onViewModeChange }: TimetableHeaderClientProps) {
  return (
    <div className="pb-2">
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Mes rendez-vous
              </CardTitle>
              <p className="text-sm text-muted-foreground">Consultez et gérez vos rendez-vous</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-muted/40 rounded-xl p-1 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange("calendar")}
                  className={cn(
                    "h-10 px-3 rounded-lg",
                    view === "calendar"
                      ? "bg-card text-foreground shadow-sm"
                      : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Calendrier</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange("list")}
                  className={cn(
                    "h-10 px-3 rounded-lg",
                    view === "list"
                      ? "bg-card text-foreground shadow-sm"
                      : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <List className="mr-2 h-5 w-5" />
                  <span>Liste</span>
                </Button>
              </div>

              {view === "calendar" && (
                <div className="bg-muted/40 rounded-xl p-1 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewModeChange("month")}
                    className={cn(
                      "h-10 px-3 rounded-lg",
                      viewMode === "month"
                        ? "bg-card text-foreground shadow-sm"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <span>Mois</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewModeChange("week")}
                    className={cn(
                      "h-10 px-3 rounded-lg",
                      viewMode === "week"
                        ? "bg-card text-foreground shadow-sm"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <span>Semaine</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
