"use client"

import { CircleDollarSign, Calendar, FileText } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const AccountingHeader = () => {
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleString('fr-FR', { month: 'long', year: 'numeric' })

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-3 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                Comptabilité
              </CardTitle>
              <p className="text-xs text-muted-foreground">Aperçu de vos finances</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue={currentMonth.toLowerCase()}>
              <SelectTrigger className="w-[160px] h-8 text-sm">
                <Calendar className="mr-2 h-3 w-3" />
                <SelectValue placeholder="Sélectionnez une période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={currentMonth.toLowerCase()}>{currentMonth}</SelectItem>
                <SelectItem value={previousMonth.toLowerCase()}>{previousMonth}</SelectItem>
                <SelectItem value={twoMonthsAgo.toLowerCase()}>{twoMonthsAgo}</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-8 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
              <FileText className="mr-2 h-3 w-3" />
              Nouvelle facture
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default AccountingHeader
