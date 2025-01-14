"use client";

import React from "react";
import { InvoicesHeader } from "./components/InvoicesHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { InvoicesTable } from "./components/InvoicesTable";
import { InvoiceDetails } from "./components/InvoiceDetails";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui";

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

// Mock data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    clientName: "Sophie Martin",
    amount: 850,
    status: "paid",
    dueDate: "2024-02-28",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    number: "INV-2024-002",
    clientName: "Jean Dupont",
    amount: 1200,
    status: "pending",
    dueDate: "2024-03-15",
    createdAt: "2024-02-15",
  },
  {
    id: "3",
    number: "INV-2024-003",
    clientName: "Marie Bernard",
    amount: 750,
    status: "overdue",
    dueDate: "2024-02-10",
    createdAt: "2024-01-25",
  },
];

const mockMetrics = {
  totalRevenue: 28500,
  unpaidInvoices: 4200,
  overdueInvoices: 1500,
  averagePaymentTime: 15,
};

const InvoicesPageComponent = () => {
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(
    null
  );

  return (
    <div className="flex flex-col gap-6">
      <InvoicesHeader />

      <MetricsGrid data={mockMetrics} />

      <InvoicesTable
        invoices={mockInvoices}
        onInvoiceSelect={setSelectedInvoice}
      />

      <Sheet
        open={!!selectedInvoice}
        onOpenChange={() => setSelectedInvoice(null)}
      >
        <SheetHeader>
          <SheetTitle>Détails de la facture</SheetTitle>
        </SheetHeader>
        <SheetContent className="w-full sm:max-w-3xl">
          {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InvoicesPageComponent;
