"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, PlusCircle, X } from "lucide-react"
import { ReportItem } from "./types"

interface ItemsTabProps {
  items: ReportItem[]
  onRemoveItem: (id: string) => void
  onOpenAddSheet: () => void
}

export function ItemsTab({ items, onRemoveItem, onOpenAddSheet }: ItemsTabProps) {
  const getItemTypeLabel = (type: ReportItem["type"]) => {
    switch (type) {
      case "observation":
        return "Observation"
      case "intervention":
        return "Intervention réalisée"
      case "recommendation":
        return "Recommandation"
      default:
        return "Item"
    }
  }

  const getItemIcon = (type: ReportItem["type"]) => {
    switch (type) {
      case "observation":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "intervention":
        return <FileText className="h-4 w-4 text-green-500" />
      case "recommendation":
        return <FileText className="h-4 w-4 text-amber-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-medium">Éléments du compte rendu</h2>
        <Button variant="outline" size="sm" className="text-primary" onClick={onOpenAddSheet}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un élément
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-8 flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Aucun élément ajouté.
            <br />
            Cliquez sur le bouton pour ajouter un élément.
          </p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]">
          {items.map(item => (
            <Card
              key={item.id}
              className={`relative border-l-4 bg-background/30 backdrop-blur-sm hover:bg-background/40 transition-colors ${item.type === "observation"
                ? "border-l-blue-500"
                : item.type === "intervention"
                  ? "border-l-green-500"
                  : "border-l-amber-500"
                }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-50 hover:opacity-100"
                onClick={() => onRemoveItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    {getItemIcon(item.type)}
                    <span className="ml-2 font-medium">
                      {getItemTypeLabel(item.type)}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{item.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 