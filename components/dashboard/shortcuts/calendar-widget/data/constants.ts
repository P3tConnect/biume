import type { DayAppointments } from "../types";

export const CALENDAR_VIEW_MODE_KEY = "calendar-widget-view-mode";

export const appointmentColors = {
  consultation: "bg-blue-500 text-white hover:bg-blue-600",
  surgery: "bg-red-500 text-white hover:bg-red-600",
  grooming: "bg-purple-500 text-white hover:bg-purple-600",
  vaccination: "bg-green-500 text-white hover:bg-green-600",
  checkup: "bg-amber-500 text-white hover:bg-amber-600",
} as const;

export const appointmentLabels = {
  consultation: "Consultation",
  surgery: "Chirurgie",
  grooming: "Toilettage",
  vaccination: "Vaccination",
  checkup: "Contrôle",
} as const;

// Exemple de données (à remplacer par vos vraies données)
export const mockAppointments: DayAppointments = {
  [new Date().toDateString()]: [
    {
      id: "1",
      petName: "Luna",
      ownerName: "Sophie Martin",
      type: "consultation",
      time: "09:00",
      duration: "30min",
      status: "confirmed",
      petAvatar: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
      petInitial: "L",
      location: "Cabinet principal - Paris 15ème",
      notes: "Première visite - Consultation de routine",
    },
    {
      id: "2",
      petName: "Max",
      ownerName: "Pierre Dubois",
      type: "vaccination",
      time: "10:30",
      duration: "15min",
      status: "confirmed",
      petAvatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      petInitial: "M",
      location: "Cabinet principal - Paris 15ème",
      notes: "Rappel vaccin annuel",
    },
  ],
  [new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()]: [
    {
      id: "3",
      petName: "Rocky",
      ownerName: "Marie Leroy",
      type: "surgery",
      time: "14:00",
      duration: "1h30",
      status: "confirmed",
      petAvatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      petInitial: "R",
      location: "Bloc opératoire - Paris 15ème",
      notes: "Stérilisation - À jeun depuis la veille",
    },
  ],
  [new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()]: [
    {
      id: "4",
      petName: "Milo",
      ownerName: "Jean Bernard",
      type: "grooming",
      time: "11:00",
      duration: "1h",
      status: "pending",
      petAvatar: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      petInitial: "M",
      location: "Salon de toilettage - Paris 15ème",
      notes: "Toilettage complet - Prévoir un shampooing anti-puces",
    },
    {
      id: "5",
      petName: "Felix",
      ownerName: "Alice Renard",
      type: "checkup",
      time: "15:30",
      duration: "30min",
      status: "confirmed",
      petAvatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      petInitial: "F",
      location: "Cabinet principal - Paris 15ème",
      notes: "Visite de contrôle post-opératoire",
    },
  ],
};
