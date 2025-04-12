import { Observation, NewObservation, AppointmentReference } from "../components/types"

export interface AdvancedReportBuilderProps {
  orgId: string
}

// Interface pour les problèmes anatomiques (dysfonctions et suspicions)
export interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
  interventionZone?: string
  laterality: "left" | "right" | "bilateral"
}

export type { Observation, NewObservation, AppointmentReference }

export const anatomicalRegions = [
  { value: "head", label: "Tête" },
  { value: "neck", label: "Cou" },
  { value: "back", label: "Dos" },
  { value: "tail", label: "Queue" }
]

export const interventionZones = [
  { value: "muscle", label: "Musculaire" },
  { value: "joint", label: "Articulaire" },
  { value: "nerve", label: "Nerveux" }
] 