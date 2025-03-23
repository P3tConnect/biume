"use client"

import React from "react"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { Sheet, SheetContent, Skeleton } from "@/components/ui"
import { InvoiceDetails } from "./components/InvoiceDetails"
import { InvoicesHeader } from "./components/InvoicesHeader"
import { InvoicesTable } from "./components/InvoicesTable"
import { MetricsGrid } from "./components/MetricsGrid"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getInvoiceMetrics, getInvoices, InvoiceMetricsData } from "@/src/actions/invoice.action"
import { Invoice } from "@/src/db"

// Composant fallback pour l'état de chargement
const LoadingState = () => (
  <div className="w-full space-y-6">
    {/* En-tête simulé */}
    <div className="flex justify-between items-center">
      <Skeleton className="h-10 w-[200px]" />
      <Skeleton className="h-10 w-[120px]" />
    </div>

    {/* Métriques simulées */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
    </div>

    {/* Tableau simulé */}
    <div className="border rounded-lg p-4">
      <div className="space-y-4">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
      </div>
    </div>
  </div>
)

// Composant pour afficher les erreurs
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center w-full py-10 text-center">
    <p className="text-red-500 mb-2">{message}</p>
    <button className="px-4 py-2 mt-2 bg-primary text-white rounded-md" onClick={onRetry}>
      Réessayer
    </button>
  </div>
)

const InvoicesPageComponent = () => {
  // Dans un environnement réel, vous récupéreriez l'ID de l'organisation depuis un contexte ou un paramètre

  const queryClient = useQueryClient()
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null)
  const { shouldShowAlert, organizationId: subscriptionOrgId } = useSubscriptionCheck()

  const {
    data: invoices,
    isLoading: isLoadingInvoices,
    error: invoicesError,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices({}),
  })

  const {
    data: invoiceMetrics,
    isLoading: isLoadingMetrics,
    error: metricsError,
  } = useQuery({
    queryKey: ["invoice-metrics"],
    queryFn: () => getInvoiceMetrics({}),
  })

  // Vérifier s'il y a des erreurs
  const error = invoicesError || metricsError

  // Vérifier si les données sont en cours de chargement
  const isLoading = isLoadingInvoices || isLoadingMetrics

  // Fonction pour réessayer toutes les requêtes
  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["invoices"] })
    queryClient.invalidateQueries({ queryKey: ["invoice-metrics"] })
  }

  // Fallback pour l'état de chargement
  if (isLoading) {
    return <LoadingState />
  }

  // Gestion des erreurs
  if (error) {
    return (
      <ErrorState message="Impossible de charger les données. Veuillez réessayer plus tard." onRetry={handleRetry} />
    )
  }

  return (
    <>
      {shouldShowAlert && subscriptionOrgId && <SubscriptionNonPayedAlert organizationId={subscriptionOrgId} />}
      <div className="flex flex-col gap-6">
        <InvoicesHeader />

        {invoiceMetrics?.data && <MetricsGrid data={invoiceMetrics.data} />}

        <InvoicesTable invoices={invoices?.data as Invoice[]} onInvoiceSelect={setSelectedInvoice} />

        <Sheet open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <SheetContent className="w-full sm:max-w-3xl">
            {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default InvoicesPageComponent
