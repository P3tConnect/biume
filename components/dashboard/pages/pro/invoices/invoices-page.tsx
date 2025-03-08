"use client";

import React from "react";
import { InvoicesHeader } from "./components/InvoicesHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { InvoicesTable } from "./components/InvoicesTable";
import { InvoiceDetails } from "./components/InvoiceDetails";
import { Sheet, SheetContent } from "@/components/ui";
import { useInvoices, useInvoiceMetrics } from "@/src/hooks";
import { InvoiceData, InvoiceMetricsData } from "@/src/actions/invoice.action";

// Types
export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  createdAt: string;
}

export interface InvoiceMetrics {
  totalRevenue: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  averagePaymentTime: number;
}

// Composant fallback pour l'état de chargement
const LoadingState = () => (
  <div className="flex items-center justify-center w-full py-10">
    <span className="text-primary animate-spin">Chargement...</span>
  </div>
);

// Composant pour afficher les erreurs
const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center w-full py-10 text-center">
    <p className="text-red-500 mb-2">{message}</p>
    <button
      className="px-4 py-2 mt-2 bg-primary text-white rounded-md"
      onClick={onRetry}
    >
      Réessayer
    </button>
  </div>
);

const InvoicesPageComponent = () => {
  // Dans un environnement réel, vous récupéreriez l'ID de l'organisation depuis un contexte ou un paramètre
  const organizationId = "current-organization-id";

  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(
    null,
  );

  // Utiliser les hooks de requête pour charger les données
  const {
    data: invoices,
    isLoading: isLoadingInvoices,
    error: invoicesError,
    refetch: refetchInvoices,
  } = useInvoices(organizationId);

  const {
    data: metrics,
    isLoading: isLoadingMetrics,
    error: metricsError,
    refetch: refetchMetrics,
  } = useInvoiceMetrics(organizationId);

  // Vérifier s'il y a des erreurs
  const error = invoicesError || metricsError;

  // Vérifier si les données sont en cours de chargement
  const isLoading = isLoadingInvoices || isLoadingMetrics;

  // Fonction pour réessayer toutes les requêtes
  const handleRetry = () => {
    refetchInvoices();
    refetchMetrics();
  };

  // Fallback pour l'état de chargement
  if (isLoading) {
    return <LoadingState />;
  }

  // Gestion des erreurs
  if (error) {
    return (
      <ErrorState
        message="Impossible de charger les données. Veuillez réessayer plus tard."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <InvoicesHeader />

      {metrics && <MetricsGrid data={metrics} />}

      <InvoicesTable
        invoices={invoices || []}
        onInvoiceSelect={setSelectedInvoice}
      />

      <Sheet
        open={!!selectedInvoice}
        onOpenChange={() => setSelectedInvoice(null)}
      >
        <SheetContent className="w-full sm:max-w-3xl">
          {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InvoicesPageComponent;
