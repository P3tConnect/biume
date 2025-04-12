"use client"

import { Button } from "@/components/ui"
import { ChevronLeftIcon, EyeIcon, SaveIcon } from "lucide-react"

interface ReportHeaderProps {
  title: string
  selectedPet: { id: string; name: string; species: string } | undefined
  selectedAppointment: { id: string; date: string; type: string } | undefined
  handleGoBack: () => void
  setShowPreview: (show: boolean) => void
  handleSaveReport: () => void
}

export function ReportHeader({
  title,
  selectedPet,
  selectedAppointment,
  handleGoBack,
  setShowPreview,
  handleSaveReport,
}: ReportHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {selectedPet && (
              <span>
                {selectedPet.name} ({selectedPet.species})
              </span>
            )}
            {selectedAppointment && (
              <>
                <span>•</span>
                <span>
                  {selectedAppointment.date} - {selectedAppointment.type}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          <EyeIcon className="h-4 w-4 mr-1" />
          Aperçu
        </Button>
        <Button onClick={handleSaveReport}>
          <SaveIcon className="h-4 w-4 mr-1" />
          Enregistrer
        </Button>
      </div>
    </div>
  )
} 