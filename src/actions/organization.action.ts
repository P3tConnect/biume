"use server";

import {
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
  requireOrganization,
} from "../lib";
import { auth } from "../lib/auth";
import {
  Organization,
  organization as organizationTable,
} from "../db";
import { db } from "../lib";
import { eq, desc } from "drizzle-orm";
import { proInformationsSchema } from "@/components/onboarding/types/onboarding-schemas";
import {
  progression as progressionTable,
  appointments as appointmentsTable,
} from "../db";
import { headers } from "next/headers";
import { z } from "zod";
import { organizationFormSchema } from "@/components/dashboard/pages/pro/settings-page/sections/profile-section";

export const getAllOrganizations = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const organizations = await db.select().from(organizationTable);

    return organizations as Organization[];
  },
  [],
);

export const getCompanyById = createServerAction(
  z.object({
    companyId: z.string(),
  }),
  async (input, ctx) => {
    const company = await db.query.organization.findFirst({
      where: eq(organizationTable.id, input.companyId),
      with: {
        options: true,
        services: true,
        members: {
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              }
            },
          }
        },
        ratings: {
          with: {
            writer: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              }
            },
          },
        },
      },
    });

    if (!company) {
      throw new ActionError("Company not found");
    }

    return company as unknown as Organization;
  },
  [],
);

export const getCurrentOrganization = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }
    const organization = await db.query.organization.findFirst({
      where: eq(organizationTable.id, ctx.organization.id),
    });

    if (!organization) {
      throw new ActionError("Organisation non trouvée");
    }

    return organization;
  },
  [requireAuth, requireOrganization],
);

export const createOrganization = createServerAction(
  proInformationsSchema,
  async (input, ctx) => {
    console.log(ctx.user, "user");
    try {
      const data = input;

      console.log(ctx.user, "user before create organization");

      const result = await auth.api.createOrganization({
        body: {
          name: data.name as string,
          slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
          logo: data.logo,
          metadata: {},
          userId: ctx.user?.id,
        },
      });

      console.log(result, "result after create organization");

      if (!result) {
        throw new ActionError("Organization not created");
      }

      console.log(result, "result before create progression");

      // Créer une progression
      const [progression] = await db
        .insert(progressionTable)
        .values({
          docs: false,
          cancelPolicies: false,
          reminders: false,
          services: false,
        })
        .returning();

      console.log(progression, "progression after create progression");

      const [organizationResult] = await db
        .update(organizationTable)
        .set({
          coverImage: data.coverImage,
          description: data.description,
          progressionId: progression.id,
          companyType: data.companyType,
          atHome: data.atHome,
        })
        .where(eq(organizationTable.id, result?.id as string))
        .returning()
        .execute();

      console.log(
        organizationResult,
        "organizationResult after update organization",
      );

      const activeOrganization = await auth.api.setActiveOrganization({
        headers: await headers(),
        body: {
          organizationId: result?.id,
        },
      });

      console.log(activeOrganization, "activeOrganization");

      // Retourner les données de l'organisation créée
      return organizationResult;
    } catch (err) {
      throw new ActionError("Organization already exists");
    }
  },
  [requireAuth],
);

export const updateOrganization = createServerAction(
  organizationFormSchema,
  async (input, ctx) => {
    const data = await db
      .update(organizationTable)
      .set({
        name: input.name,
        email: input.email,
        description: input.description,
        logo: input.logo,
        openAt: input.openAt,
        closeAt: input.closeAt,
        atHome: input.atHome,
        nac: input.nac,
        siren: input.siren,
        siret: input.siret,
      })
      .where(eq(organizationTable.id, ctx.organization?.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Organization not updated");
    }

    return data;
  },
  [requireAuth, requireOwner],
);

export const getUsersWithAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }

    const usersWithAppointments = await db.query.appointments.findMany({
      where: eq(appointmentsTable.proId, ctx.organization.id),
      with: {
        client: true,
      },
      orderBy: desc(appointmentsTable.createdAt),
    });

    // Get unique users from appointments
    const uniqueUsers = [
      ...usersWithAppointments
        .map((appointment) => appointment.client)
        .filter(
          (user, index, self) =>
            index === self.findIndex((u) => u?.id === user?.id),
        ),
    ];

    return uniqueUsers;
  },
  [requireAuth, requireOrganization],
);
