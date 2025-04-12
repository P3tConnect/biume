"use client"

import React from "react"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { InvoicesHeader } from "./components/InvoicesHeader"
import { InvoicesTable } from "./components/InvoicesTable"
import { MetricsGrid } from "./components/MetricsGrid"
import { Invoice } from "@/src/db"

export type InvoiceMetrics = {
  totalRevenue: number
  unpaidInvoices: number
  overdueInvoices: number
  averagePaymentTime: number
}

const InvoicesPageComponent = ({
  invoices,
  invoiceMetrics,
}: {
  invoices: Invoice[]
  invoiceMetrics: InvoiceMetrics
}) => {
  const { shouldShowAlert, organizationId: subscriptionOrgId } = useSubscriptionCheck()

  return (
    <>
      {shouldShowAlert && subscriptionOrgId && <SubscriptionNonPayedAlert organizationId={subscriptionOrgId} />}
      <div className="flex flex-col gap-6">
        <InvoicesHeader />

        {invoiceMetrics && <MetricsGrid data={invoiceMetrics} />}

        <InvoicesTable invoices={invoices} />
      </div>
    </>
  )
}

export default InvoicesPageComponent
