'use client'

import React from 'react'
import { PrescriptionBuilder } from '@/components/reports-module/prescriptions/prescription-builder'
import { useParams } from 'next/navigation'

const PrescriptionCreatePage = () => {
  const params = useParams<{ orgId: string }>()

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full">
          <PrescriptionBuilder orgId={params.orgId} />
        </div>
      </div>
    </div>
  )
}

export default PrescriptionCreatePage