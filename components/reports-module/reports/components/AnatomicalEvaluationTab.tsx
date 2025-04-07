"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon, TrashIcon, AlertCircleIcon, ActivityIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Observation, anatomicalRegions, dysfunctionTypes } from "./types"
import { AddAnatomicalIssueDialog } from "./AddAnatomicalIssueDialog"

interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
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
  setIsAddModalOpen
}: AnatomicalEvaluationTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"dysfunctions" | "suspicions">("dysfunctions")
  const [newIssue, setNewIssue] = useState<Omit<AnatomicalIssue, "id">>({
    type: "dysfunction",
    region: "",
    severity: 2,
    notes: ""
  })

  const handleRemoveDysfunction = (id: string) => {
    setDysfunctions(dysfunctions.filter(d => d.id !== id))
  }

  const handleAddNewIssue = () => {
    if (!newIssue.region) return

    onAddDysfunction({
      ...newIssue,
      type: activeSubTab === "dysfunctions" ? "dysfunction" : "anatomicalSuspicion"
    })

    // Réinitialiser le formulaire mais garder le type
    setNewIssue({
      type: activeSubTab === "dysfunctions" ? "dysfunction" : "anatomicalSuspicion",
      region: "",
      severity: 2,
      notes: ""
    })

    // Fermer la modale
    setIsAddModalOpen(false)
  }

  const handleOpenAddModal = (type: "dysfunction" | "anatomicalSuspicion") => {
    setNewIssue({
      type,
      region: "",
      severity: 2,
      notes: ""
    })
    setIsAddModalOpen(true)
  }

  // Filtrer les dysfonctions et suspicions
  const confirmedDysfunctions = dysfunctions.filter(d => d.type === "dysfunction")
  const anatomicalSuspicions = dysfunctions.filter(d => d.type === "anatomicalSuspicion")

  // Fonction pour afficher le niveau de sévérité
  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 1: return "Légère"
      case 2: return "Modérée"
      case 3: return "Importante"
      case 4: return "Sévère"
      case 5: return "Critique"
      default: return "Modérée"
    }
  }

  // Fonction pour obtenir la couleur selon la sévérité
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return "bg-green-500"
      case 2: return "bg-yellow-500"
      case 3: return "bg-orange-500"
      case 4: return "bg-red-500"
      case 5: return "bg-purple-500"
      default: return "bg-yellow-500"
    }
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <Tabs
        defaultValue="dysfunctions"
        value={activeSubTab}
        onValueChange={(value) => setActiveSubTab(value as "dysfunctions" | "suspicions")}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList className="w-fit grid grid-cols-2">
            <TabsTrigger value="dysfunctions" className="flex items-center gap-1.5">
              <ActivityIcon className="h-4 w-4" />
              Dysfonctions
            </TabsTrigger>
            <TabsTrigger value="suspicions" className="flex items-center gap-1.5">
              <AlertCircleIcon className="h-4 w-4" />
              Suspicions d'atteinte
            </TabsTrigger>
          </TabsList>

          <Button
            onClick={() => handleOpenAddModal(activeSubTab === "dysfunctions" ? "dysfunction" : "anatomicalSuspicion")}
            className="gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter {activeSubTab === "dysfunctions" ? "une dysfonction" : "une suspicion"}
          </Button>
        </div>

        <TabsContent value="dysfunctions" className="mt-0">
          <div className="flex flex-col gap-4">
            {confirmedDysfunctions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md bg-muted/10">
                Aucune dysfonction à afficher. Utilisez le bouton "Ajouter une dysfonction" pour compléter cette section.
              </div>
            ) : (
              <ul className="space-y-2">
                {confirmedDysfunctions.map((dysfunction, index) => (
                  <li key={dysfunction.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getSeverityColor(dysfunction.severity)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {anatomicalRegions.find(r => r.value === dysfunction.region)?.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({getSeverityLabel(dysfunction.severity)})
                        </span>
                      </div>
                      {dysfunction.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{dysfunction.notes}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDysfunction(dysfunction.id)}
                      className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>

        <TabsContent value="suspicions" className="mt-0">
          <div className="flex flex-col gap-4">
            {anatomicalSuspicions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md bg-muted/10">
                Aucune suspicion d'atteinte à afficher. Utilisez le bouton "Ajouter une suspicion" pour compléter cette section.
              </div>
            ) : (
              <ul className="space-y-2">
                {anatomicalSuspicions.map((suspicion, index) => (
                  <li key={suspicion.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getSeverityColor(suspicion.severity)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {anatomicalRegions.find(r => r.value === suspicion.region)?.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          (Indice: {getSeverityLabel(suspicion.severity)})
                        </span>
                      </div>
                      {suspicion.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{suspicion.notes}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDysfunction(suspicion.id)}
                      className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      </Tabs>

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