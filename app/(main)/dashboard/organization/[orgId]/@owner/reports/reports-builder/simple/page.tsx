'use client'

import { SimpleReportBuilder } from '@/components/reports-module'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation'

const SimpleReportsPage = () => {
  const params = useParams<{ orgId: string }>()

  return (
    <div className='flex flex-col w-full'>
      <div className='flex-1 w-full overflow-hidden'>
        <div className='w-full h-full'>
          <SimpleReportBuilder orgId={params.orgId} />
        </div>
      </div>
    </div>
  )
}

export default SimpleReportsPage