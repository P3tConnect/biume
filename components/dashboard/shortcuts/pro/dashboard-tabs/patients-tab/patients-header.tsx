"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useActiveOrganization } from "@/src/lib/auth-client"

export const PatientsHeader = () => {
  const { data: activeOrganization } = useActiveOrganization()

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Mes patients
            </CardTitle>
            <p className="text-sm text-muted-foreground">Gérez les dossiers médicaux de vos patients</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" asChild>
            <Link href={`/dashboard/organization/${activeOrganization?.data?.id}/patients`}>
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Voir plus
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
