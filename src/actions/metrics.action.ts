"use server";

import { z } from "zod";
import { createServerAction, requireFullOrganization, requireAuth } from "@/src/lib";
import { db } from "@/src/lib/db";
import { appointments } from "@/src/db/appointments";
import { pets } from "@/src/db/pets";
import { eq, and, gte, lte, count, sql } from "drizzle-orm";
import { ratings } from "@/src/db/ratings";

// Interface pour les données de métriques
export interface MetricDataPoint {
  month: string;
  value: number;
}

export interface MetricsData {
  appointmentsData: MetricDataPoint[];
  newPatientsData: MetricDataPoint[];
  treatmentsData: MetricDataPoint[];
  satisfactionData: MetricDataPoint[];
}

// Schéma pour la période de temps
const timeRangeSchema = z.object({
  // Période en mois pour les données historiques
  months: z.number().min(1).max(12).default(6)
});

// Action serveur pour récupérer les données des métriques
export const getMetricsAction = createServerAction(
  timeRangeSchema,
  async (input, ctx) => {
    // Récupérer l'organisation actuelle
    const { fullOrganization, user } = ctx;
    const organizationId = fullOrganization?.id;
    
    if (!organizationId) {
      throw new Error("Organisation non trouvée");
    }

    // Date actuelle et date de début pour la période demandée
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setMonth(currentDate.getMonth() - input.months);
    
    // Générer les mois pour les données
    const monthsLabels: string[] = [];
    for (let i = 0; i < input.months; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      monthsLabels.push(date.toLocaleDateString('fr-FR', { month: 'short' }));
    }

    // Préparer le résultat
    const result: MetricsData = {
      appointmentsData: [],
      newPatientsData: [],
      treatmentsData: [],
      satisfactionData: [],
    };

    // Récupérer les données de rendez-vous par mois
    for (let i = 0; i < input.months; i++) {
      const monthStartDate = new Date(startDate);
      monthStartDate.setMonth(startDate.getMonth() + i);
      
      const monthEndDate = new Date(monthStartDate);
      monthEndDate.setMonth(monthStartDate.getMonth() + 1);
      monthEndDate.setDate(0); // Dernier jour du mois
      
      // 1. Données de rendez-vous
      const appointmentsCount = await db.select({ count: count() })
        .from(appointments)
        .where(
          and(
            eq(appointments.proId, organizationId),
            gte(appointments.createdAt, monthStartDate),
            lte(appointments.createdAt, monthEndDate)
          )
        );
      
      // 2. Nouveaux patients
      const newPetsCount = await db.select({ count: count() })
        .from(pets)
        .where(
          and(
            eq(pets.ownerId, organizationId), // Utiliser ownerId plutôt que organizationId
            gte(pets.createdAt, monthStartDate),
            lte(pets.createdAt, monthEndDate)
          )
        );
      
      // 3. Traitements (pour simplifier, nous utilisons le nombre de rendez-vous terminés)
      const treatmentsCount = await db.select({ count: count() })
        .from(appointments)
        .where(
          and(
            eq(appointments.proId, organizationId),
            eq(appointments.status, "CONFIRMED"), // Utiliser un statut existant
            gte(appointments.createdAt, monthStartDate),
            lte(appointments.createdAt, monthEndDate)
          )
        );
      
      // 4. Satisfaction (moyenne des évaluations, ou 0 s'il n'y en a pas)
      const satisfactionRating = await db.select({
        avgRating: sql<number>`COALESCE(AVG(${ratings.rate}), 0)`
      })
      .from(ratings)
      .where(
        and(
          eq(ratings.proId, organizationId),
          gte(ratings.createdAt, monthStartDate),
          lte(ratings.createdAt, monthEndDate)
        )
      );
      
      // Ajouter les données au résultat
      result.appointmentsData.push({
        month: monthsLabels[i],
        value: appointmentsCount[0]?.count || 0
      });
      
      result.newPatientsData.push({
        month: monthsLabels[i],
        value: newPetsCount[0]?.count || 0
      });
      
      result.treatmentsData.push({
        month: monthsLabels[i],
        value: treatmentsCount[0]?.count || 0
      });
      
      result.satisfactionData.push({
        month: monthsLabels[i],
        value: Math.round((satisfactionRating[0]?.avgRating || 0) * 20) // Convertir en pourcentage (0-5 -> 0-100)
      });
    }
    
    return result;
  },
  [requireAuth, requireFullOrganization]
); 