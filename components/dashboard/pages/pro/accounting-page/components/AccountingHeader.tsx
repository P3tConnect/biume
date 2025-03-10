"use client"

import { Euro, FileText } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const AccountingHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Comptabilité
            </CardTitle>
            <p className="text-sm text-muted-foreground">Aperçu de vos finances</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
            >
              <FileText className="size-4 mr-2" />
              Créer un devis
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
              <Euro className="size-4 mr-2" />
              Créer une facture
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
