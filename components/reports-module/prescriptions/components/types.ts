export interface PrescriptionItem {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

export type NewPrescriptionItem = Omit<PrescriptionItem, "id"> 