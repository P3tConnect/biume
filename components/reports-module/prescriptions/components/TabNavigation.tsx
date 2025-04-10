"use client"

import { AlignLeft, Pill, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TabNavigationProps {
  activeTab: "medications" | "notes"
  setActiveTab: (tab: "medications" | "notes") => void
  onAddMedication?: () => void
}

export function TabNavigation({
  activeTab,
  setActiveTab,
  onAddMedication
}: TabNavigationProps) {
  return (
    <div className="px-4 pt-4 pb-0 flex justify-between border-b">
      <div className="flex">
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "medications" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("medications")}
        >
          <Pill className="h-4 w-4 mr-2" />
          Médicaments
        </button>
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("notes")}
        >
          <AlignLeft className="h-4 w-4 mr-2" />
          Notes
        </button>
      </div>

      {activeTab === "medications" && onAddMedication && (
        <Button
          size="sm"
          variant="outline"
          className="mb-2 h-8"
          onClick={onAddMedication}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter un médicament
        </Button>
      )}
    </div>
  )
} 