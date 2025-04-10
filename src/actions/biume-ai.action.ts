"use server"

import { z } from "zod"
import { createServerAction } from "../lib"
import { db } from "../lib/db"
import { eq, and, gte } from "drizzle-orm"
import { appointments, organization, service, organizationSlots, address } from "../db"

interface AppointmentWithDetails {
  id: string
  type: "oneToOne" | "multiple"
  status: string
  proId: string
  beginAt: Date
  service?: {
    id: string
    atHome: boolean
  }
  pro?: {
    address?: {
      id: string
    }
  }
}

interface OrganizationSlotWithDetails {
  id: string
  organizationId: string
  isAvailable: boolean
  service?: {
    id: string
    atHome: boolean
  }
}

export const getBiumeAIAppointments = createServerAction(
  z.object({
    companyId: z.string(),
    date: z.string(),
  }),
  async (input, ctx) => {
    const { companyId, date } = input;
    
    const org = await db.query.organization.findFirst({
      where: eq(organization.id, companyId),
      with: {
        address: true,
      }
    });
    
    if (!org || !org.onDemand) {
      return { data: null, error: "Organisation non trouvée ou service à la demande non activé" };
    }
    
    const homeAppointments = await db.query.appointments.findMany({
      where: and(
        eq(appointments.proId, companyId),
        gte(appointments.beginAt, new Date(date))
      ),
      with: {
        service: true,
        pro: {
          with: {
            address: true
          }
        }
      }
    });
    
    const atHomeAppointments = homeAppointments.filter(app => 
      app.service?.atHome && app.pro?.address
    );
    
    return { 
      data: {
        organization: org,
        atHomeAppointments
      }, 
      error: null 
    };
  }, []
)

export const getAppointmentsLocalizations = createServerAction(
  z.object({
    companyId: z.string(),
    appointmentIds: z.array(z.string()),
  }),
  async (input, ctx) => {
    const { companyId, appointmentIds } = input;
    
    const appointmentsWithAddresses = await db.query.appointments.findMany({
      where: and(
        eq(appointments.proId, companyId)
      ),
      with: {
        service: true,
        pro: {
          with: {
            address: true
          }
        }
      }
    });
    
    const availableSlots = await db.query.organizationSlots.findMany({
      where: eq(organizationSlots.organizationId, companyId),
      with: {
        service: true
      }
    });
    
    const homeVisitSlots = availableSlots.filter(slot => 
      slot.service?.atHome && slot.isAvailable
    );
    
    return {
      data: {
        appointments: appointmentsWithAddresses,
        availableSlots: homeVisitSlots
      },
      error: null
    };
  }, []
)