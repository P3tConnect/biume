"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, TrashIcon, AlertCircleIcon, ActivityIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Observation, anatomicalRegions, dysfunctionTypes, interventionZones } from "./types"
import { AddAnatomicalIssueDialog } from "./AddAnatomicalIssueDialog"

interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
  interventionZone?: string
}

interface AnatomicalEvaluationTabProps {
  dysfunctions: AnatomicalIssue[]
  setDysfunctions: (dysfunctions: AnatomicalIssue[]) => void
  onAddDysfunction: (dysfunction: Omit<AnatomicalIssue, "id">) => void
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
}

export function AnatomicalEvaluationTab({
  dysfunctions,
  setDysfunctions,
  onAddDysfunction,
  isAddModalOpen,
  setIsAddModalOpen,
}: AnatomicalEvaluationTabProps) {
  const [newIssue, setNewIssue] = useState<Omit<AnatomicalIssue, "id">>({
    type: "dysfunction",
    region: "",
    severity: 2,
    notes: "",
    interventionZone: undefined,
  })

  const handleRemoveDysfunction = (id: string) => {
    setDysfunctions(dysfunctions.filter(d => d.id !== id))
  }

  const handleAddNewIssue = () => {
    if (!newIssue.region) return

    onAddDysfunction({
      ...newIssue,
    })

    // Réinitialiser le formulaire mais garder le type
    setNewIssue({
      type: "dysfunction",
      region: "",
      severity: 2,
      notes: "",
      interventionZone: undefined,
    })

    // Fermer la modale
    setIsAddModalOpen(false)
  }

  const handleOpenAddModal = () => {
    setNewIssue({
      type: "dysfunction",
      region: "",
      severity: 2,
      notes: "",
      interventionZone: undefined,
    })
    setIsAddModalOpen(true)
  }

  // Fonction pour afficher le niveau de sévérité
  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 1:
        return "Légère"
      case 2:
        return "Modérée"
      case 3:
        return "Importante"
      case 4:
        return "Sévère"
      case 5:
        return "Critique"
      default:
        return "Modérée"
    }
  }

  // Fonction pour obtenir la couleur selon la sévérité
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-orange-500"
      case 4:
        return "bg-red-500"
      case 5:
        return "bg-purple-500"
      default:
        return "bg-yellow-500"
    }
  }

  // Fonction pour obtenir l'icône selon le type
  const getTypeIcon = (type: "dysfunction" | "anatomicalSuspicion") => {
    return type === "dysfunction" ? (
      <ActivityIcon className="h-4 w-4 text-primary" />
    ) : (
      <AlertCircleIcon className="h-4 w-4 text-amber-500" />
    )
  }

  // Fonction pour obtenir le libellé du type
  const getTypeLabel = (type: "dysfunction" | "anatomicalSuspicion") => {
    return type === "dysfunction" ? "Dysfonction" : "Suspicion d'atteinte"
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Évaluation anatomique</h3>

        <Button onClick={handleOpenAddModal} className="gap-1">
          <PlusIcon className="h-4 w-4" />
          Ajouter un élément
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {dysfunctions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md bg-muted/10">
            Aucun élément à afficher. Utilisez le bouton "Ajouter un élément" pour compléter cette section.
          </div>
        ) : (
          <ul className="space-y-2">
            {dysfunctions.map(issue => (
              <li key={issue.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-muted/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${getSeverityColor(issue.severity)}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {getTypeIcon(issue.type)}
                      <span className="text-xs font-medium text-muted-foreground">{getTypeLabel(issue.type)}</span>
                    </div>
                    <span className="font-medium">{anatomicalRegions.find(r => r.value === issue.region)?.label}</span>
                    <span className="text-xs text-muted-foreground">
                      ({issue.type === "dysfunction" ? "" : "Indice: "}
                      {getSeverityLabel(issue.severity)})
                    </span>

                    {issue.interventionZone && (
                      <span className="text-xs bg-muted/70 px-2 py-0.5 rounded-full">
                        {interventionZones.find(z => z.value === issue.interventionZone)?.label ||
                          issue.interventionZone}
                      </span>
                    )}
                  </div>
                  {issue.notes && <p className="text-sm text-muted-foreground mt-1">{issue.notes}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDysfunction(issue.id)}
                  className="h-6 w-6 text-destructive hover:bg-destructive/10"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modale d'ajout de problème anatomique */}
      <AddAnatomicalIssueDialog
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        issueType={newIssue.type}
        newIssue={newIssue}
        setNewIssue={setNewIssue}
        onAdd={handleAddNewIssue}
      />
    </div>
  )
}
