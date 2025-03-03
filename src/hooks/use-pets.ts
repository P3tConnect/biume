"use client";

import { useQuery } from "@tanstack/react-query";
import { getPetsAction } from "@/src/actions/pets.action";
import { petType } from "@/src/db/pets";

// Type simplifié pour les animaux retournés par l'API
interface SimplePet {
  id: string;
  name: string;
  type: typeof petType.enumValues[number];
  weight?: number | null;
  height?: number | null;
  description?: string | null;
  ownerId?: string | null;
  breed?: string | null;
  image?: string | null;
  gender?: string;
  nacType?: string | null;
  birthDate: Date;
  furColor?: string | null;
  eyeColor?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  owner?: {
    id: string;
    name: string;
  } | null;
}

interface PetsData {
  pets: SimplePet[];
}

export function usePets(ownerId?: string) {
  return useQuery<PetsData>({
    queryKey: ["pets", ownerId],
    queryFn: async () => {
      try {
        const response = await getPetsAction({ ownerId });
        // Vérifier la structure de la réponse et extraire les animaux
        if ('data' in response && response.data && 'pets' in response.data) {
          return { pets: response.data.pets };
        } else if ('pets' in response) {
          return response as PetsData;
        }
        return { pets: [] };
      } catch (error) {
        console.error("Erreur lors de la récupération des animaux:", error);
        return { pets: [] };
      }
    },
  });
} 