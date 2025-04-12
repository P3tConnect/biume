"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ArrowRight as ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useActiveOrganization } from "@/src/lib/auth-client"

export const PlanningHeader = () => {
  const { data: activeOrganization } = useActiveOrganization()

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Mon planning
            </CardTitle>
            <p className="text-sm text-muted-foreground">Gérez vos rendez-vous et consultations</p>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/organization/${activeOrganization?.data?.id}/clients`}>
              <span className="flex items-center gap-2">
                Voir plus
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
