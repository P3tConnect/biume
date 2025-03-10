import { useQuery } from "@tanstack/react-query"

import { getInvoiceMetrics, getInvoices, InvoiceMetricsData } from "../actions/invoice.action"

const INVOICE_CACHE_KEY = "invoices"
const INVOICE_METRICS_CACHE_KEY = "invoice-metrics"

export function useInvoices(organizationId?: string) {
  return useQuery({
    queryKey: [INVOICE_CACHE_KEY, organizationId],
    queryFn: async () => {
      const response = await getInvoices(organizationId)

      if ("error" in response) {
        throw new Error(response.error)
      }

      const invoicesData = Array.isArray(response.data) ? response.data : []

      return invoicesData
    },
    staleTime: 30 * 1000, // 30 secondes avant de considérer les données comme périmées
  })
}

export function useInvoiceMetrics(organizationId?: string) {
  return useQuery({
    queryKey: [INVOICE_METRICS_CACHE_KEY, organizationId],
    queryFn: async () => {
      const response = await getInvoiceMetrics(organizationId)

      if ("error" in response) {
        throw new Error(response.error)
      }

      if (!response.data) {
        return {
          totalRevenue: 0,
          unpaidInvoices: 0,
          overdueInvoices: 0,
          averagePaymentTime: 0,
        } as InvoiceMetricsData
      }

      const metricsObj = response.data as unknown as InvoiceMetricsData

      return {
        totalRevenue: metricsObj.totalRevenue,
        unpaidInvoices: metricsObj.unpaidInvoices,
        overdueInvoices: metricsObj.overdueInvoices,
        averagePaymentTime: metricsObj.averagePaymentTime,
      }
    },
    staleTime: 60 * 1000, // 1 minute avant de considérer les données comme périmées
  })
}
