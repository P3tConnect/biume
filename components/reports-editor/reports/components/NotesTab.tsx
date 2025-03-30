"use client"

import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface NotesTabProps {
  notes: string
  setNotes: (notes: string) => void
}

export function NotesTab({ notes, setNotes }: NotesTabProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-3 border-b">
        <h2 className="font-medium">Notes complémentaires</h2>
      </div>

      <div className="p-3 flex-1">
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Informations supplémentaires..."
          className="h-full resize-none"
        />
      </div>
    </Card>
  )
} 