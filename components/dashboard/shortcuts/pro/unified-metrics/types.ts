export type ActiveTab = "info" | "medical" | "appointments" | "documents";

export interface AnimalDetails {
  nextVisit: string;
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: "male" | "female";
  birthDate: string; // Format ISO
  weight?: number;
  age?: string;
  color?: string;
  microchipNumber?: string;
  sterilized?: boolean;
  sterilizationDate?: string;
  ownerName: string;
  ownerContact: string;
  profileImage?: string;
  notes?: string;
  // Pour les onglets spécifiques
  vaccinations?: Vaccination[];
  medicalRecords?: MedicalRecord[];
  appointments?: Appointment[];
  documents?: Document[];
}

export interface Vaccination {
  id: string;
  name: string;
  date: string; // Format ISO
  expiryDate?: string; // Format ISO
  status: "upcoming" | "valid" | "expired";
  notes?: string;
  veterinarian?: string;
}

export interface MedicalRecord {
  id: string;
  type: "consultation" | "surgery" | "hospitalization" | "treatment" | "other";
  date: string; // Format ISO
  diagnosis?: string;
  symptoms?: string[];
  treatment?: string;
  prescriptions?: string[];
  notes?: string;
  veterinarian: string;
}

export interface Appointment {
  id: string;
  date: string; // Format ISO
  time: string;
  duration: number; // en minutes
  type:
    | "check-up"
    | "vaccination"
    | "surgery"
    | "follow-up"
    | "emergency"
    | "other";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  veterinarian: string;
}

export interface Document {
  id: string;
  title: string;
  type: "certificate" | "prescription" | "lab-result" | "image" | "other";
  date: string; // Format ISO
  fileUrl: string;
  fileType: string; // extension du fichier
  notes?: string;
  uploadedBy?: string;
}
