import { z } from "zod";

// Type pour les clients
export type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  city: string | null;
  country: string | null;
  createdAt: Date;
  status: "Active" | "Inactive";
};

// Schema pour filtrer les clients
export const ClientFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Active", "Inactive", "all"]).optional().default("all"),
});

// Type pour les métriques des clients
export type ClientMetrics = {
  totalClients: number;
  activeClients: number;
  appointments: number;
  averageRating: number;
}; 