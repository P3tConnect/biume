"use client"

import { Textarea } from "@/components/ui/textarea"

interface NotesTabProps {
  notes: string
  setNotes: (notes: string) => void
}

export function NotesTab({ notes, setNotes }: NotesTabProps) {
  return (
    <div className="flex flex-col h-full">
      <Textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Informations supplémentaires..."
        className="h-full resize-none"
      />
    </div>
  )
} 