import { Metadata } from "next"
import { DashboardHomeHeader } from "@/components/dashboard/shortcuts/pro/dashboard-home-header"
import { AppointmentRequests } from "@/components/dashboard/shortcuts/pro/appointment-requests/appointment-requests"
import { DashboardTabs } from "@/components/dashboard/shortcuts/pro/dashboard-tabs/dashboard-tabs"
import { UnifiedMetrics } from "@/components/dashboard/shortcuts/pro/widgets/unified-metrics"
import { StripeSetupCard } from "@/components/dashboard/shortcuts/pro/stripe-setup-card"
import NonPayedSubscription from "@/components/dashboard/shortcuts/pro/non-payed-subscription"
import { OnboardingExplications } from "@/components/dashboard/layout/onboarding-explications"

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord professionnel",
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
    <div className="flex flex-col h-full w-full gap-2 dark:gap-3">
      <DashboardHomeHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-2 dark:gap-3">
        <div className="space-y-2 dark:space-y-3 lg:col-span-2 h-full overflow-y-auto">
          <StripeSetupCard />
          <NonPayedSubscription />
          <UnifiedMetrics />
          <AppointmentRequests />
        </div>

        <div className="lg:col-span-4 2xl:col-span-6 space-y-2 dark:space-y-3 h-full">
          <DashboardTabs />
        </div>
      </div>
      <OnboardingExplications />
    </div>
  )
}

export default DashboardHomeProPage
