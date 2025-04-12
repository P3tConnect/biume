'use client'

import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'
import { PrescriptionBuilder } from '@/components/reports-module/prescriptions/prescription-builder'
import { useParams } from 'next/navigation'

const PrescriptionCreatePage = () => {
  const params = useParams<{ orgId: string }>()

  return (
    <div className="flex flex-col w-full">
      <div className="border-b bg-background w-full shrink-0">
        <div className="w-full px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <Link href={`/dashboard/organization/${params.orgId}/reports`}>
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Link>
            </Button>
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Gestion des Ordonnances</h1>
                <p className="text-sm text-muted-foreground">Créez ou importez des ordonnances pour vos patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full">
          <PrescriptionBuilder orgId={params.orgId} />
        </div>
      </div>
    </div>
  )
}

export default PrescriptionCreatePage