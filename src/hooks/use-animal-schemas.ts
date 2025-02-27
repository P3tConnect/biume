"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnimalSchemasAction } from "@/src/actions/reports.action";
import { AnimalSchema } from "@/src/actions/reports.action";

interface SchemasData {
  schemas: AnimalSchema[];
}

export function useAnimalSchemas() {
  return useQuery<SchemasData>({
    queryKey: ["animalSchemas"],
    queryFn: async () => {
      try {
        const response = await getAnimalSchemasAction({});
        // Vérifier la structure de la réponse et extraire les schémas
        if ('data' in response && response.data && 'schemas' in response.data) {
          return { schemas: response.data.schemas };
        } else if ('schemas' in response) {
          return response as SchemasData;
        }
        return { schemas: [] };
      } catch (error) {
        console.error("Erreur lors de la récupération des schémas:", error);
        return { schemas: [] };
      }
    },
  });
} 