import { Metadata } from "next"
import { DashboardHomeHeader } from "@/components/dashboard/shortcuts/pro/dashboard-home-header"
import { AppointmentRequests } from "@/components/dashboard/shortcuts/pro/appointment-requests/appointment-requests"
import { DashboardTabs } from "@/components/dashboard/shortcuts/pro/dashboard-tabs/dashboard-tabs"
import { UnifiedMetrics } from "@/components/dashboard/shortcuts/pro/widgets/unified-metrics"
import { StripeSetupCard } from "@/components/dashboard/shortcuts/pro/stripe-setup-card"
import NonPayedSubscription from "@/components/dashboard/shortcuts/pro/non-payed-subscription"

export const metadata: Metadata = {
  title: "Dashboard Vétérinaire",
  description: "Dashboard pour professionnels de santé animale",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const DashboardHomeProPage = () => {
  return (
    <div className="flex flex-col h-full w-full gap-4">
      <DashboardHomeHeader />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="space-y-4 lg:col-span-2 h-full">
          <StripeSetupCard />
          <NonPayedSubscription />
          <UnifiedMetrics />
          <AppointmentRequests />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <DashboardTabs />
        </div>
      </div>
    </div>
  )
}

export default DashboardHomeProPage
