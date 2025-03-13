"use server"

import { and, count, eq, gte, lte, or, sql } from "drizzle-orm"
import { z } from "zod"

import { appointments } from "@/src/db/appointments"
import { pets } from "@/src/db/pets"
import { ratings } from "@/src/db/ratings"
import { createServerAction, requireAuth, requireFullOrganization } from "@/src/lib"
import { db } from "@/src/lib/db"
import { MetricData } from "@/types/metric-data"

// Empty schema since we don't need input parameters
const emptySchema = z.object({
  months: z.number().optional().default(6), // Number of months to look back
})

// Server action to get metrics for current and previous month
export const getMetricsAction = createServerAction(
  emptySchema,
  async ({ months = 6 }, ctx) => {
    // Get current organization
    const { fullOrganization } = ctx
    const organizationId = fullOrganization?.id

    if (!organizationId) {
      throw new Error("Organization not found")
    }

    // Calculate date ranges for current and previous month
    const now = new Date()

    // Current month
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Previous month
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get month labels
    const currentMonthLabel = currentMonthStart.toLocaleDateString("fr-FR", { month: "long" })
    const previousMonthLabel = previousMonthStart.toLocaleDateString("fr-FR", { month: "long" })

    // Statuses we want to include - we'll check each one with OR
    const statusCondition = or(
      eq(appointments.status, "CONFIRMED"),
      eq(appointments.status, "ONGOING"),
      eq(appointments.status, "COMPLETED")
    )

    // Current month metrics
    const currentMonthAppointments = await db
      .select({ count: count() })
      .from(appointments)
      .where(
        and(
          eq(appointments.proId, organizationId),
          statusCondition,
          gte(appointments.createdAt, currentMonthStart),
          lte(appointments.createdAt, currentMonthEnd)
        )
      )

    // New patients with appointments this month
    const currentMonthNewPatients = await db
      .select({ count: count() })
      .from(pets)
      .leftJoin(appointments, eq(appointments.id, pets.id)) // Assuming there's a relation between appointments and pets
      .where(
        and(
          eq(pets.ownerId, organizationId),
          gte(pets.createdAt, currentMonthStart),
          lte(pets.createdAt, currentMonthEnd),
          statusCondition
        )
      )

    // Treatments for current month (already completed appointments)
    const currentMonthTreatments = await db
      .select({ count: count() })
      .from(appointments)
      .where(
        and(
          eq(appointments.proId, organizationId),
          eq(appointments.status, "COMPLETED"),
          gte(appointments.createdAt, currentMonthStart),
          lte(appointments.createdAt, currentMonthEnd)
        )
      )

    // Satisfaction for current month
    const currentMonthSatisfaction = await db
      .select({
        avgRating: sql<number>`COALESCE(AVG(${ratings.rate}), 0)`,
      })
      .from(ratings)
      .where(
        and(
          eq(ratings.proId, organizationId),
          gte(ratings.createdAt, currentMonthStart),
          lte(ratings.createdAt, currentMonthEnd)
        )
      )

    // Previous month metrics
    const previousMonthAppointments = await db
      .select({ count: count() })
      .from(appointments)
      .where(
        and(
          eq(appointments.proId, organizationId),
          statusCondition,
          gte(appointments.createdAt, previousMonthStart),
          lte(appointments.createdAt, previousMonthEnd)
        )
      )

    // New patients with appointments last month
    const previousMonthNewPatients = await db
      .select({ count: count() })
      .from(pets)
      .leftJoin(appointments, eq(appointments.id, pets.id)) // Assuming there's a relation between appointments and pets
      .where(
        and(
          eq(pets.ownerId, organizationId),
          gte(pets.createdAt, previousMonthStart),
          lte(pets.createdAt, previousMonthEnd),
          statusCondition
        )
      )

    // Treatments for previous month
    const previousMonthTreatments = await db
      .select({ count: count() })
      .from(appointments)
      .where(
        and(
          eq(appointments.proId, organizationId),
          eq(appointments.status, "COMPLETED"),
          gte(appointments.createdAt, previousMonthStart),
          lte(appointments.createdAt, previousMonthEnd)
        )
      )

    // Satisfaction for previous month
    const previousMonthSatisfaction = await db
      .select({
        avgRating: sql<number>`COALESCE(AVG(${ratings.rate}), 0)`,
      })
      .from(ratings)
      .where(
        and(
          eq(ratings.proId, organizationId),
          gte(ratings.createdAt, previousMonthStart),
          lte(ratings.createdAt, previousMonthEnd)
        )
      )

    // Generate chart data for the past X months
    const appointmentsData: { month: string; value: number }[] = []
    const newPatientsData: { month: string; value: number }[] = []
    const treatmentsData: { month: string; value: number }[] = []
    const satisfactionData: { month: string; value: number }[] = []

    // Loop through past months to get data for charts
    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
      const monthLabel = monthStart.toLocaleDateString("fr-FR", { month: "short" })

      // Get appointments for this month
      const monthAppointments = await db
        .select({ count: count() })
        .from(appointments)
        .where(
          and(
            eq(appointments.proId, organizationId),
            statusCondition,
            gte(appointments.createdAt, monthStart),
            lte(appointments.createdAt, monthEnd)
          )
        )

      // Get new patients for this month
      const monthNewPatients = await db
        .select({ count: count() })
        .from(pets)
        .leftJoin(appointments, eq(appointments.id, pets.id))
        .where(
          and(
            eq(pets.ownerId, organizationId),
            gte(pets.createdAt, monthStart),
            lte(pets.createdAt, monthEnd),
            statusCondition
          )
        )

      // Get treatments for this month
      const monthTreatments = await db
        .select({ count: count() })
        .from(appointments)
        .where(
          and(
            eq(appointments.proId, organizationId),
            eq(appointments.status, "COMPLETED"),
            gte(appointments.createdAt, monthStart),
            lte(appointments.createdAt, monthEnd)
          )
        )

      // Get satisfaction for this month
      const monthSatisfaction = await db
        .select({
          avgRating: sql<number>`COALESCE(AVG(${ratings.rate}), 0)`,
        })
        .from(ratings)
        .where(
          and(eq(ratings.proId, organizationId), gte(ratings.createdAt, monthStart), lte(ratings.createdAt, monthEnd))
        )

      // Add data to arrays for charts
      appointmentsData.push({
        month: monthLabel,
        value: monthAppointments[0]?.count || 0,
      })

      newPatientsData.push({
        month: monthLabel,
        value: monthNewPatients[0]?.count || 0,
      })

      treatmentsData.push({
        month: monthLabel,
        value: monthTreatments[0]?.count || 0,
      })

      satisfactionData.push({
        month: monthLabel,
        value: Math.round((monthSatisfaction[0]?.avgRating || 0) * 20), // Convert to percentage
      })
    }

    // Return formatted results with chart data
    return {
      currentMonth: {
        appointments: currentMonthAppointments[0]?.count || 0,
        newPatients: currentMonthNewPatients[0]?.count || 0,
        treatments: currentMonthTreatments[0]?.count || 0,
        satisfaction: Math.round((currentMonthSatisfaction[0]?.avgRating || 0) * 20), // Convert to percentage (0-5 -> 0-100)
      },
      previousMonth: {
        appointments: previousMonthAppointments[0]?.count || 0,
        newPatients: previousMonthNewPatients[0]?.count || 0,
        treatments: previousMonthTreatments[0]?.count || 0,
        satisfaction: Math.round((previousMonthSatisfaction[0]?.avgRating || 0) * 20), // Convert to percentage (0-5 -> 0-100)
      },
      currentMonthLabel,
      previousMonthLabel,
      appointmentsData,
      newPatientsData,
      treatmentsData,
      satisfactionData,
    }
  },
  [requireAuth, requireFullOrganization]
)
