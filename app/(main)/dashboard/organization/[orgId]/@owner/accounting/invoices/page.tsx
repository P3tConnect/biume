import InvoicesPageComponent from "@/components/dashboard/pages/pro/invoices/invoices-page"
import { getInvoiceMetrics, getInvoices } from "@/src/actions/invoice.action"
import { Metadata } from "next"
import { Suspense } from "react"
import InvoicesPageLoading from "./loading"

export const metadata: Metadata = {
  title: "Factures | Comptabilité",
  description: "Factures",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const ProDashboardInvoicesPage = async () => {
  const [{ data: invoices }, { data: invoiceMetrics }] = await Promise.all([getInvoices({}), getInvoiceMetrics({})])

  return (
    <Suspense fallback={<InvoicesPageLoading />}>
      <InvoicesPageComponent invoices={invoices!} invoiceMetrics={invoiceMetrics!} />
    </Suspense>
  )
}

export default ProDashboardInvoicesPage
