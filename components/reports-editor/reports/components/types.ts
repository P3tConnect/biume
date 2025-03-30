export interface ReportItem {
  id: string
  type: "observation" | "intervention" | "recommendation"
  content: string
}

export type NewReportItem = Omit<ReportItem, "id">

export interface Observation {
  id: string
  region: string
  severity: number
  notes: string
}

export type NewObservation = Omit<Observation, "id">

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