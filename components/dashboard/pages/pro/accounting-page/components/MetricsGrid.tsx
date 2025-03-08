"use client"

import { FileText, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import React from "react"

import { CountAnimation } from "@/components/count-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsGridProps {
  data: {
    revenue: number
    expenses: number
    profit: number
    unpaidInvoices: number
  }
}

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="grid space-y-2 md:grid-cols-2 lg:grid-cols-4 lg:space-y-0">
        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-green-50 hover:to-transparent dark:hover:from-green-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Revenus du mois</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950 p-4">
              <TrendingUp className="size-5 text-green-700 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">
              <CountAnimation value={data.revenue} />€
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-red-50 hover:to-transparent dark:hover:from-red-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Dépenses du mois</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-red-200 to-red-100 dark:from-red-900 dark:to-red-950 p-4">
              <TrendingDown className="size-5 text-red-700 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-red-700 dark:text-red-400">
              <CountAnimation value={data.expenses} />€
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-8.3%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Bénéfice net</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950 p-4">
              <PieChart className="size-5 text-blue-700 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              <CountAnimation value={data.profit} />€
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-transparent hover:bg-gradient-to-br hover:from-orange-50 hover:to-transparent dark:hover:from-orange-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Factures impayées</CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900 dark:to-orange-950 p-4">
              <FileText className="size-5 text-orange-700 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
              <CountAnimation value={data.unpaidInvoices} />€
            </div>
            <p className="text-xs text-muted-foreground">4 factures en attente</p>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
