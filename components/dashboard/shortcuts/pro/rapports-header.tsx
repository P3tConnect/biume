"use client"

import { Calendar, Download, Filter } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const RapportsHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Rapports d&apos;activité
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Consultez et générez des rapports détaillés de votre activité
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Période</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <span>Filtres</span>
            </Button>
            <Button size="sm" className="text-xs h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
