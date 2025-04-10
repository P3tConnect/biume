import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import ClientDashboardReservationsComponent from "@/components/dashboard/pages/user/reservations-page/reservations-page"

export default function ReservationsPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <ClientDashboardReservationsComponent />
      </Suspense>
    </div>
  )
}
