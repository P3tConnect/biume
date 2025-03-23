"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface AppointmentActionsProps {
  onEdit: () => void
  onDelete: () => void
}

export function AppointmentActions({ onEdit, onDelete }: AppointmentActionsProps) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Button variant="outline" size="sm" className="flex-1 gap-1.5 h-8" onClick={onEdit}>
        <Edit className="h-3.5 w-3.5" />
        <span>Modifier</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
