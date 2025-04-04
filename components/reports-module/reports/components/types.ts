export interface ReportItem {
  id: string
  type: "observation" | "intervention" | "recommendation"
  content: string
}

export type NewReportItem = Omit<ReportItem, "id">

export type ObservationType = "staticObservation" | "dynamicObservation" | "dysfunction" | "recommendation"
export type DysfunctionType = "confirmed" | "suspected"

export interface Observation {
  id: string
  region: string
  severity: number
  notes: string
  type: ObservationType
  dysfunctionType?: DysfunctionType
}

export type NewObservation = Omit<Observation, "id">

export interface AppointmentReference {
  appointmentId: string
  petId: string
}

// Liste des régions anatomiques
export const anatomicalRegions = [
  { value: "tete", label: "Tête" },
  { value: "cou", label: "Cou" },
  { value: "thorax", label: "Thorax" },
  { value: "abdomen", label: "Abdomen" },
  { value: "dos", label: "Dos" },
  { value: "queue", label: "Queue" },
  { value: "patte-avant-gauche", label: "Patte avant gauche" },
  { value: "patte-avant-droite", label: "Patte avant droite" },
  { value: "patte-arriere-gauche", label: "Patte arrière gauche" },
  { value: "patte-arriere-droite", label: "Patte arrière droite" },
  { value: "oeil-gauche", label: "Œil gauche" },
  { value: "oeil-droit", label: "Œil droit" },
  { value: "oreille-gauche", label: "Oreille gauche" },
  { value: "oreille-droite", label: "Oreille droite" },
]

export const observationTypes = [
  { value: "staticObservation", label: "Observation statique" },
  { value: "dynamicObservation", label: "Observation dynamique" },
  { value: "dysfunction", label: "Dysfonction" },
  { value: "recommendation", label: "Conseils et recommandations" },
]

export const dysfunctionTypes = [
  { value: "confirmed", label: "Dysfonction confirmée" },
  { value: "suspected", label: "Suspicion de dysfonction" },
]
