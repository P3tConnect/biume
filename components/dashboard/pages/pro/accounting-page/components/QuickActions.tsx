"use client"

import { Euro, FileText, PieChart } from "lucide-react"
import React from "react"

import { Card, CardContent } from "@/components/ui/card"

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950">
            <FileText className="size-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h3 className="text-lg font-medium">Gérer les devis</h3>
          <p className="text-sm text-muted-foreground text-center">Voir et créer des devis</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-200 to-purple-100 dark:from-purple-900 dark:to-purple-950">
            <Euro className="size-6 text-purple-700 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h3 className="text-lg font-medium">Gérer les factures</h3>
          <p className="text-sm text-muted-foreground text-center">Voir et créer des factures</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950">
            <PieChart className="size-6 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h3 className="text-lg font-medium">Rapports financiers</h3>
          <p className="text-sm text-muted-foreground text-center">Générer des rapports détaillés</p>
        </CardContent>
      </Card>
    </div>
  )
}
