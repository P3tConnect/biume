"use client"

import { Calendar, Filter, Plus } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const RappelsHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              Rappels et notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gérez les rappels pour les propriétaires et les échéances importantes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Planifier</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <span>Filtrer</span>
            </Button>
            <Button size="sm" className="text-xs h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              <span>Nouveau rappel</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
