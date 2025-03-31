"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlignLeft } from "lucide-react"

interface NotesTabProps {
  notes: string
  setNotes: (notes: string) => void
}

export function NotesTab({ notes, setNotes }: NotesTabProps) {
  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border rounded-lg shadow-sm h-full overflow-hidden">
        <div className="bg-primary/5 py-2 px-3 border-b font-medium">
          <div className="flex items-center">
            <AlignLeft className="h-4 w-4 mr-2 text-primary" />
            <span>Notes et recommandations générales</span>
          </div>
        </div>
        <CardContent className="p-4 h-full">
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Ajoutez des recommandations générales ou des instructions supplémentaires pour le propriétaire..."
            className="resize-none h-full min-h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  )
} 