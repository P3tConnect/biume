"use client"

import { PrescriptionUploader } from "@/components/reports-module"
import React from "react"
import { useParams } from "next/navigation"

const PrescriptionUploadPage = () => {
  const params = useParams<{ orgId: string }>()

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full">
          <PrescriptionUploader orgId={params.orgId} />
        </div>
      </div>
    </div>
  )
}

export default PrescriptionUploadPage
