export interface ReportItem {
  id: string
  type: "observation" | "intervention" | "recommendation"
  content: string
}

export type NewReportItem = Omit<ReportItem, "id">

export type ObservationType = "staticObservation" | "dynamicObservation"
export type DysfunctionType = "confirmed" | "suspected"
export type InterventionZone = "articulations" | "fascias" | "organes" | "muscles"

export interface Observation {
  id: string
  region: string
  severity: number
  notes: string
  type: ObservationType
  dysfunctionType?: DysfunctionType
  interventionZone?: InterventionZone
}

export type NewObservation = Omit<Observation, "id">

export interface AppointmentReference {
  appointmentId: string
  petId: string
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

// Liste des régions anatomiques
export const anatomicalRegions = [
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
  { value: "C3", label: "C3" },
  { value: "C4", label: "C4" },
  { value: "C5", label: "C5" },
  { value: "C6", label: "C6" },
  { value: "C7", label: "C7" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "T3", label: "T3" },
  { value: "T4", label: "T4" },
  { value: "T5", label: "T5" },
  { value: "T6", label: "T6" },
  { value: "T7", label: "T7" },
  { value: "T8", label: "T8" },
  { value: "T9", label: "T9" },
  { value: "T10", label: "T10" },
  { value: "T11", label: "T11" },
  { value: "T12", label: "T12" },
  { value: "T13", label: "T13" },
  { value: "tarse", label: "Tarse" },
  { value: "sternum", label: "Sternum" },
  { value: "sacrum", label: "Sacrum" },
  { value: "machoireInf", label: "Machoire inférieure" },
  { value: "machoireSup", label: "Machoire supérieure" },
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
  { value: "L4", label: "L4" },
  { value: "L5", label: "L5" },
  { value: "L6", label: "L6" },
  { value: "L7", label: "L7" },
]

// Régions anatomiques groupées par catégorie
export const anatomicalRegionsByCategory = [
  {
    category: "Tête et cou",
    items: [
      { value: "C1", label: "C1" },
      { value: "C2", label: "C2" },
      { value: "C3", label: "C3" },
      { value: "C4", label: "C4" },
      { value: "C5", label: "C5" },
      { value: "C6", label: "C6" },
      { value: "C7", label: "C7" },
      { value: "machoireInf", label: "Machoire inférieure" },
      { value: "machoireSup", label: "Machoire supérieure" },
    ],
  },
  {
    category: "Tronc",
    items: [
      { value: "T1", label: "T1" },
      { value: "T2", label: "T2" },
      { value: "T3", label: "T3" },
      { value: "T4", label: "T4" },
      { value: "T5", label: "T5" },
      { value: "T6", label: "T6" },
      { value: "T7", label: "T7" },
      { value: "T8", label: "T8" },
      { value: "T9", label: "T9" },
      { value: "T10", label: "T10" },
      { value: "T11", label: "T11" },
      { value: "T12", label: "T12" },
      { value: "T13", label: "T13" },
      { value: "tarse", label: "Tarse" },
      { value: "sternum", label: "Sternum" },
      { value: "sacrum", label: "Sacrum" },
      { value: "L1", label: "L1" },
      { value: "L2", label: "L2" },
      { value: "L3", label: "L3" },
      { value: "L4", label: "L4" },
      { value: "L5", label: "L5" },
      { value: "L6", label: "L6" },
      { value: "L7", label: "L7" },
    ],
  },
  {
    category: "Membres",
    items: [],
  },
]

export const observationTypes = [
  { value: "staticObservation", label: "Observation statique" },
  { value: "dynamicObservation", label: "Observation dynamique" },
]

export const dysfunctionTypes = [
  { value: "confirmed", label: "Dysfonction" },
  { value: "suspected", label: "Suspicion d'atteinte anatomique" },
]

// Zones d'intervention du professionnel
export const interventionZones = [
  { value: "articulations", label: "Articulations" },
  { value: "fascias", label: "Fascias" },
  { value: "organes", label: "Organes" },
  { value: "muscles", label: "Muscles" },
]
