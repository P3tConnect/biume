"use client"

import { AdvancedReportBuilder } from "@/components/reports-module"
import { useParams } from "next/navigation"
import React from "react"

const AdvancedReportsPage = () => {
  const params = useParams<{ orgId: string }>()

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full">
          <AdvancedReportBuilder orgId={params.orgId} />
        </div>
      </div>
    </div>
  )
}

export default AdvancedReportsPage
