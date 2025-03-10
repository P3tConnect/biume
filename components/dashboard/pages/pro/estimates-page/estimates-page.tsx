"use client"

import { Plus } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza"
import { CredenzaContent } from "@/components/ui/credenza"
import { Credenza } from "@/components/ui/credenza"
import { useQuotesSearchParams } from "@/src/hooks/use-quotes-search-params"

import { QuotesDataTable } from "./components/quotes-data-table"
import { QuotesFilters } from "./components/quotes-filters"

const NewQuoteDialog = () => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
          <Plus className="size-4 mr-2" />
          Nouveau devis
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[600px]">
        <CredenzaHeader>
          <CredenzaTitle>Créer un nouveau devis</CredenzaTitle>
          <CredenzaDescription>Remplissez les informations ci-dessous pour créer un nouveau devis.</CredenzaDescription>
        </CredenzaHeader>
        {/* TODO: Ajouter le formulaire de création de devis ici */}
      </CredenzaContent>
    </Credenza>
  )
}

const EstimatesHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Devis
            </CardTitle>
            <p className="text-sm text-muted-foreground">Gérez vos devis et convertissez-les en factures</p>
          </div>
          <NewQuoteDialog />
        </div>
      </CardHeader>
    </Card>
  )
}

export function DashboardEstimatesComponent() {
  const searchParams = useSearchParams()
  const { page, perPage, sort, status, search, dateRange, updateSearchParams } = useQuotesSearchParams()

  return (
    <div className="space-y-4">
      <EstimatesHeader />

      <QuotesFilters />

      <Card className="p-6">
        <QuotesDataTable />
      </Card>
    </div>
  )
}
