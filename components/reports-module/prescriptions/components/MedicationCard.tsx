"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Trash2 } from "lucide-react"

interface MedicationCardProps {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
  onRemove: (id: string) => void
}

export function MedicationCard({
  id,
  name,
  dosage,
  frequency,
  duration,
  notes,
  onRemove
}: MedicationCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-200">
      <div className="bg-primary/5 py-2 px-3 border-b font-medium flex items-center justify-between">
        <div className="flex items-center">
          <Pill className="h-4 w-4 mr-2 text-primary" />
          <span className="truncate">{name}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <CardContent className="p-3 text-sm space-y-2">
        <div className="flex">
          <span className="text-muted-foreground w-24 flex-shrink-0">Dosage:</span>
          <span className="font-medium">{dosage}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-24 flex-shrink-0">Fréquence:</span>
          <span className="font-medium">{frequency}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-24 flex-shrink-0">Durée:</span>
          <span className="font-medium">{duration}</span>
        </div>
        {notes && (
          <div className="pt-2 border-t mt-2">
            <span className="text-muted-foreground">Notes:</span>
            <p className="mt-1">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 