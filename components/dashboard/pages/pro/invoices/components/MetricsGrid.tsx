"use client"

import { AlertCircle, Clock, FileText, TrendingUp } from "lucide-react"
import React from "react"

import { CountAnimation } from "@/components/common/count-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsGridProps {
  data: {
    totalRevenue: number
    unpaidInvoices: number
    overdueInvoices: number
    averagePaymentTime: number
  }
}

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-transparent dark:hover:from-green-950/30 dark:hover:to-transparent transition-all duration-300">
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Chiffre d&apos;affaires</CardTitle>
          <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950 p-4">
            <TrendingUp className="size-5 text-green-700 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold text-green-700 dark:text-green-400">
            <CountAnimation value={data.totalRevenue} />€
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12.5%</span> vs dernier mois
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl hover:bg-gradient-to-br hover:from-yellow-50 hover:to-transparent dark:hover:from-yellow-950/30 dark:hover:to-transparent transition-all duration-300">
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Factures impayées</CardTitle>
          <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-950 p-4">
            <FileText className="size-5 text-yellow-700 dark:text-yellow-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
            <CountAnimation value={data.unpaidInvoices} />€
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((data.unpaidInvoices / data.totalRevenue) * 100)}% du CA total
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl hover:bg-gradient-to-br hover:from-red-50 hover:to-transparent dark:hover:from-red-950/30 dark:hover:to-transparent transition-all duration-300">
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Factures en retard</CardTitle>
          <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-red-200 to-red-100 dark:from-red-900 dark:to-red-950 p-4">
            <AlertCircle className="size-5 text-red-700 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold text-red-700 dark:text-red-400">
            <CountAnimation value={data.overdueInvoices} />€
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((data.overdueInvoices / data.unpaidInvoices) * 100)}% des impayés
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30 dark:hover:to-transparent transition-all duration-300">
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Délai de paiement</CardTitle>
          <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950 p-4">
            <Clock className="size-5 text-blue-700 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            <CountAnimation value={data.averagePaymentTime} /> jours
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">-2.3</span> vs dernier mois
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
