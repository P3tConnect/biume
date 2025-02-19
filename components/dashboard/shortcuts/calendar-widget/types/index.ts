export type Appointment = {
  id: string;
  petName: string;
  ownerName: string;
  type: "consultation" | "surgery" | "grooming" | "vaccination" | "checkup";
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
  petAvatar?: string;
  petInitial?: string;
  ownerAvatar?: string;
  ownerInitial?: string;
  location?: string;
  notes?: string;
};

export type DayAppointments = {
  [key: string]: Appointment[];
};
