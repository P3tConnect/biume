"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib"
import { PlusIcon, TrashIcon, AlertCircleIcon, ActivityIcon } from "lucide-react"
import { anatomicalRegions, interventionZones } from "./types"
import { AddAnatomicalIssueDialog } from "./AddAnatomicalIssueDialog"

interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
  interventionZone?: string
  laterality: "left" | "right" | "bilateral"
}

interface AnatomicalRegionMap {
  [key: string]: {
    left: {
      path: string
      viewBox: string
    }
    right: {
      path: string
      viewBox: string
    }
  }
}

// Carte des régions anatomiques avec les coordonnées SVG pour chaque côté
const anatomicalRegionPaths: AnatomicalRegionMap = {
  head: {
    left: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
    right: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
  },
  neck: {
    left: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
    right: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
  },
  back: {
    left: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
    right: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
  },
  chest: {
    left: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
    right: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
  },
  lungs: {
    left: {
      path: "M125,130 C135,120 145,118 155,122 C165,130 168,145 160,155 C150,165 135,165 125,160 C118,150 115,140 125,130",
      viewBox: "115 115 60 60",
    },
    right: {
      path: "M125,130 C135,120 145,118 155,122 C165,130 168,145 160,155 C150,165 135,165 125,160 C118,150 115,140 125,130",
      viewBox: "115 115 60 60",
    },
  },
  frontLeg: {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  hindLeg: {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  tail: {
    left: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
    right: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
  },
  // Mapping pour les régions anatomiques existantes dans le fichier types.ts
  tete: {
    left: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
    right: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
  },
  cou: {
    left: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
    right: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
  },
  thorax: {
    left: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
    right: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
  },
  dos: {
    left: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
    right: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
  },
  queue: {
    left: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
    right: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
  },
  "patte-avant-gauche": {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  "patte-avant-droite": {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  "patte-arriere-gauche": {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  "patte-arriere-droite": {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  "oeil-gauche": {
    left: {
      path: "M45,60 C50,55 55,55 60,60 C65,65 65,70 60,75 C55,80 50,80 45,75 C40,70 40,65 45,60",
      viewBox: "35 50 30 30",
    },
    right: {
      path: "M45,60 C50,55 55,55 60,60 C65,65 65,70 60,75 C55,80 50,80 45,75 C40,70 40,65 45,60",
      viewBox: "35 50 30 30",
    },
  },
  "oeil-droit": {
    left: {
      path: "M65,60 C70,55 75,55 80,60 C85,65 85,70 80,75 C75,80 70,80 65,75 C60,70 60,65 65,60",
      viewBox: "55 50 30 30",
    },
    right: {
      path: "M65,60 C70,55 75,55 80,60 C85,65 85,70 80,75 C75,80 70,80 65,75 C60,70 60,65 65,60",
      viewBox: "55 50 30 30",
    },
  },
  "oreille-gauche": {
    left: {
      path: "M30,40 Q35,30 45,35 Q50,45 45,55 Q35,60 30,50 Q25,45 30,40",
      viewBox: "20 25 35 40",
    },
    right: {
      path: "M30,40 Q35,30 45,35 Q50,45 45,55 Q35,60 30,50 Q25,45 30,40",
      viewBox: "20 25 35 40",
    },
  },
  "oreille-droite": {
    left: {
      path: "M75,40 Q70,30 60,35 Q55,45 60,55 Q70,60 75,50 Q80,45 75,40",
      viewBox: "50 25 35 40",
    },
    right: {
      path: "M75,40 Q70,30 60,35 Q55,45 60,55 Q70,60 75,50 Q80,45 75,40",
      viewBox: "50 25 35 40",
    },
  },
  poumons: {
    left: {
      path: "M120,140 C135,130 155,125 175,135 C185,145 190,160 185,175 C175,190 160,195 140,190 C125,185 115,175 110,160 C105,145 110,145 120,140 Z",
      viewBox: "100 125 95 75",
    },
    right: {
      path: "M120,140 C135,130 155,125 175,135 C185,145 190,160 185,175 C175,190 160,195 140,190 C125,185 115,175 110,160 C105,145 110,145 120,140 Z",
      viewBox: "100 125 100 100",
    },
  },
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
    laterality: "left",
  })
  const [anatomicalView, setAnatomicalView] = useState<"gauche" | "droite">("gauche")

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
      laterality: "left",
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
      laterality: "left",
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

  // Fonction pour obtenir la couleur de remplissage pour le SVG en fonction de la sévérité
  const getSeverityFillColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "rgba(34, 197, 94, 0.5)" // green-500 avec transparence
      case 2:
        return "rgba(234, 179, 8, 0.5)" // yellow-500 avec transparence
      case 3:
        return "rgba(249, 115, 22, 0.5)" // orange-500 avec transparence
      case 4:
        return "rgba(239, 68, 68, 0.5)" // red-500 avec transparence
      case 5:
        return "rgba(168, 85, 247, 0.5)" // purple-500 avec transparence
      default:
        return "rgba(234, 179, 8, 0.5)" // yellow-500 avec transparence
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

  // Fonction pour obtenir le libellé de latéralité
  const getLateralityLabel = (laterality: "left" | "right" | "bilateral") => {
    switch (laterality) {
      case "left":
        return "Gauche"
      case "right":
        return "Droite"
      case "bilateral":
        return "Bilatéral"
      default:
        return "Gauche"
    }
  }

  // Filtrer les dysfonctions selon la vue actuelle (gauche/droite)
  const filteredDysfunctions = dysfunctions.filter(dysfunction => {
    if (dysfunction.laterality === "bilateral") return true
    return (
      (anatomicalView === "gauche" && dysfunction.laterality === "left") ||
      (anatomicalView === "droite" && dysfunction.laterality === "right")
    )
  })

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Évaluation anatomique</h2>
        <Button variant="default" size="sm" onClick={handleOpenAddModal} className="flex items-center gap-1">
          <PlusIcon className="h-4 w-4" />
          Ajouter un élément
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section gauche - Vue anatomique */}
        <div className="bg-gradient-to-b from-muted/10 to-background rounded-lg border p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Visualisation anatomique</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                variant={anatomicalView === "gauche" ? "default" : "outline"}
                className={cn(
                  "min-w-[100px]",
                  anatomicalView === "gauche" ? "bg-green-500 hover:bg-green-600 text-white" : ""
                )}
                onClick={() => setAnatomicalView("gauche")}
              >
                Gauche
              </Button>
              <Button
                variant={anatomicalView === "droite" ? "default" : "outline"}
                className="min-w-[100px]"
                onClick={() => setAnatomicalView("droite")}
              >
                Droite
              </Button>
            </div>
          </div>

          <div className="w-full max-w-md h-auto mx-auto overflow-hidden relative">
            {anatomicalView === "gauche" ? (
              <>
                <Image
                  src="/assets/images/dog-left-side.jpg"
                  alt="Vue anatomique côté gauche"
                  width={500}
                  height={380}
                  className="object-contain w-full h-auto"
                />
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 500 380"
                >
                  {filteredDysfunctions.map(dysfunction => {
                    const regionConfig = anatomicalRegionPaths[dysfunction.region]?.left
                    if (!regionConfig) return null

                    return (
                      <g key={dysfunction.id}>
                        <path
                          d={regionConfig.path}
                          fill={getSeverityFillColor(dysfunction.severity)}
                          stroke={getSeverityFillColor(dysfunction.severity).replace("0.5", "0.8")}
                          strokeWidth="2"
                        />
                      </g>
                    )
                  })}
                </svg>
              </>
            ) : (
              <>
                <Image
                  src="/assets/images/dog-right-side.jpg"
                  alt="Vue anatomique côté droit"
                  width={500}
                  height={380}
                  className="object-contain w-full h-auto"
                />
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 500 380"
                >
                  {filteredDysfunctions.map(dysfunction => {
                    const regionConfig = anatomicalRegionPaths[dysfunction.region]?.right
                    if (!regionConfig) return null

                    return (
                      <g key={dysfunction.id}>
                        <path
                          d={regionConfig.path}
                          fill={getSeverityFillColor(dysfunction.severity)}
                          stroke={getSeverityFillColor(dysfunction.severity).replace("0.5", "0.8")}
                          strokeWidth="2"
                        />
                      </g>
                    )
                  })}
                </svg>
              </>
            )}
          </div>
        </div>

        {/* Section droite - Liste des éléments */}
        <div className="rounded-lg border">
          <h3 className="p-3 border-b font-medium">Éléments identifiés</h3>

          <div className="p-4 max-h-[480px] overflow-y-auto">
            {dysfunctions.length > 0 ? (
              <div className="space-y-3">
                {dysfunctions.map(issue => (
                  <div
                    key={issue.id}
                    className="p-3 border rounded-md flex items-start justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn("w-3 h-3 rounded-full", getSeverityColor(issue.severity))} />
                        <div className="flex items-center gap-1.5">
                          {getTypeIcon(issue.type)}
                          <span className="text-xs font-medium text-muted-foreground">{getTypeLabel(issue.type)}</span>
                        </div>
                        <span className="font-medium">
                          {anatomicalRegions.find(r => r.value === issue.region)?.label}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          {getLateralityLabel(issue.laterality)}
                        </span>
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
                      {issue.notes && <p className="text-sm text-muted-foreground">{issue.notes}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDysfunction(issue.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-3">
                <p>Aucun élément anatomique identifié</p>
                <Button variant="outline" size="sm" onClick={handleOpenAddModal} className="flex items-center gap-1">
                  <PlusIcon className="h-4 w-4" />
                  Ajouter un élément
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modale d'ajout de problème anatomique */}
      <AddAnatomicalIssueDialog
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        issueType={newIssue.type}
        newIssue={newIssue}
        setNewIssue={issue => setNewIssue(issue)}
        onAdd={handleAddNewIssue}
      />
    </div>
  )
}
