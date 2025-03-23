"use client"

interface AppointmentNotesProps {
  content?: string
}

export function AppointmentNotes({ content }: AppointmentNotesProps) {
  if (!content) return null

  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
    </div>
  )
}
