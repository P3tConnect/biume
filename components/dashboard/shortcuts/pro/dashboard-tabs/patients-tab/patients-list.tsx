"use client"

import { useQuery } from "@tanstack/react-query"
import { Dog, Search } from "lucide-react"
import { useState } from "react"

import { getProPatients } from "@/src/actions/pet.action"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { PatientItem } from "./patient-item"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Pet } from "@/src/db"

export const PatientsList = () => {
  const [search, setSearch] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Pet | null>(null)
  const [isCredenzaOpen, setIsCredenzaOpen] = useState(false)

  const { data: patientsResult, isLoading } = useQuery({
    queryKey: ["pro-patients"],
    queryFn: () => getProPatients({}),
  })

  const filteredPatients = patientsResult?.data?.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!patientsResult?.data?.length) {
    return (
      <Card className="border shadow-sm p-8">
        <div className="text-center text-muted-foreground">
          <Dog className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="mb-2">Aucun patient avec des rendez-vous confirmés</p>
          <p className="text-sm max-w-md mx-auto mb-4">Les patients avec des rendez-vous confirmés apparaîtront ici.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-2 dark:space-y-3">
      <div className="relative mx-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un patient..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-2 pb-4">
          {filteredPatients?.map(patient => (
            <PatientItem
              key={patient.id}
              patient={patient}
              onClick={() => {
                setSelectedPatient(patient)
                setIsCredenzaOpen(true)
              }}
            />
          ))}
        </div>
      </ScrollArea>

      {selectedPatient && (
        <AnimalCredenza isOpen={isCredenzaOpen} onOpenChange={setIsCredenzaOpen} petId={selectedPatient.id} />
      )}
    </div>
  )
}
