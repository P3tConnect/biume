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
  { value: "tete", label: "Tête" },
  { value: "cou", label: "Cou" },
  { value: "thorax", label: "Thorax" },
  { value: "abdomen", label: "Abdomen" },
  { value: "dos", label: "Dos" },
  { value: "queue", label: "Queue" },
  { value: "poumons", label: "Poumons" },
  { value: "foie", label: "Foie" },
  { value: "patte-avant-gauche", label: "Patte avant gauche" },
  { value: "patte-avant-droite", label: "Patte avant droite" },
  { value: "patte-arriere-gauche", label: "Patte arrière gauche" },
  { value: "patte-arriere-droite", label: "Patte arrière droite" },
  { value: "oeil-gauche", label: "Œil gauche" },
  { value: "oeil-droit", label: "Œil droit" },
  { value: "oreille-gauche", label: "Oreille gauche" },
  { value: "oreille-droite", label: "Oreille droite" },
]

// Régions anatomiques groupées par catégorie
export const anatomicalRegionsByCategory = [
  {
    category: "Tête et cou",
    items: [
      { value: "tete", label: "Tête" },
      { value: "cou", label: "Cou" },
      { value: "oeil-gauche", label: "Œil gauche" },
      { value: "oeil-droit", label: "Œil droit" },
      { value: "oreille-gauche", label: "Oreille gauche" },
      { value: "oreille-droite", label: "Oreille droite" },
    ],
  },
  {
    category: "Tronc",
    items: [
      { value: "thorax", label: "Thorax" },
      { value: "abdomen", label: "Abdomen" },
      { value: "dos", label: "Dos" },
      { value: "poumons", label: "Poumons" },
      { value: "foie", label: "Foie" },
      { value: "queue", label: "Queue" },
    ],
  },
  {
    category: "Membres",
    items: [
      { value: "patte-avant-gauche", label: "Patte avant gauche" },
      { value: "patte-avant-droite", label: "Patte avant droite" },
      { value: "patte-arriere-gauche", label: "Patte arrière gauche" },
      { value: "patte-arriere-droite", label: "Patte arrière droite" },
    ],
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
