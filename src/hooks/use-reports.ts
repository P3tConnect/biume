"use client"

import { useQuery } from "@tanstack/react-query"

import { getReportsAction } from "@/src/actions/reports.action"

// Définir une interface qui correspond à la structure réelle des rapports retournés
interface ReportData {
  id: string
  image: string | null
  title: string
  description: string | null
  createdAt: Date | null
  updatedAt: Date | null
  appointments: {
    type: "oneToOne" | "multiple"
    status: string
    patientId: string
    // autres propriétés de appointments
  } | null
  topics: any[] // Utiliser any[] pour simplifier, à remplacer par le type réel si nécessaire
}

interface ReportsData {
  reports: ReportData[]
}

export function useReports(petId?: string) {
  return useQuery<ReportsData>({
    queryKey: ["reports", petId],
    queryFn: async () => {
      try {
        // Les actions serveur retournent { data: TOutput } ou { error: string }
        const actionResult = await getReportsAction({ petId })

        if (actionResult && "data" in actionResult && actionResult.data) {
          // Le type de retour de l'action est { reports: Report[] }
          return actionResult.data as ReportsData
        }

        if (actionResult && "error" in actionResult) {
          console.error("Erreur retournée par l'action:", actionResult.error)
        }

        // Retourner un tableau vide en cas d'erreur
        return { reports: [] }
      } catch (error) {
        console.error("Erreur lors de la récupération des rapports:", error)
        return { reports: [] }
      }
    },
  })
}
