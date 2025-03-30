"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AnatomyTabProps {
  selectedView: "left" | "right"
  setSelectedView: (view: "left" | "right") => void
}

export function AnatomyTab({ selectedView, setSelectedView }: AnatomyTabProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <h2 className="font-medium">Vue anatomique</h2>
        <div className="flex gap-1">
          <Button
            variant={selectedView === "left" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("left")}
          >
            Gauche
          </Button>
          <Button
            variant={selectedView === "right" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("right")}
          >
            Droite
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p className="text-center">
            Visualisation anatomique {selectedView === "left" ? "(gauche)" : "(droite)"}<br />
            <span className="text-sm text-muted-foreground/70">Cette fonctionnalité sera améliorée prochainement</span>
          </p>
        </div>
      </div>
    </Card>
  )
} 