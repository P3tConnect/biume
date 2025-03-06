"use server";

import {
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
  requireFullOrganization,
  stripe,
} from "../lib";
import { auth } from "../lib/auth";
import {
  Organization,
  OrganizationImage,
  organizationImages,
  organizationSlots,
  organization as organizationTable,
} from "../db";
import { db } from "../lib";
import { eq, desc, and, gte, lte, asc } from "drizzle-orm";
import { proInformationsSchema } from "@/components/onboarding/types/onboarding-schemas";
import {
  progression as progressionTable,
  appointments as appointmentsTable,
} from "../db";
import { headers } from "next/headers";
import { z } from "zod";
import {
  organizationFormSchema,
  organizationImagesFormSchema,
} from "@/components/dashboard/pages/pro/settings-page/sections/profile-section";
import { revalidatePath } from "next/cache";

export const getAllOrganizations = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const organizations = await db.query.organization.findMany({
      with: {
        images: {
          columns: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        slots: {
          where: eq(organizationSlots.isAvailable, true),
          limit: 4,
          orderBy: asc(organizationSlots.start),
          columns: {
            id: true,
            start: true,
            end: true,
            isAvailable: true,
          },
        },
        address: {
          columns: {
            postalAddress: true,
            lat: true,
            lng: true,
            cntryCode: true,
            zip: true,
          },
        },
      },
      columns: {
        id: true,
        name: true,
        description: true,
        atHome: true,
        onDemand: true,
        verified: true,
      },
    });

    return organizations as Organization[];
  },
  [],
);

export const getAllOrganizationsByUserId = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const organizations = await auth.api.listOrganizations({
      headers: await headers(),
    });

    if (!organizations) {
      throw new ActionError("Organizations not found");
    }

    return organizations as Organization[];
  },
  [requireAuth],
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
              },
            },
            jobs: {
              with: {
                job: true,
              },
            },
          },
        },
        ratings: {
          with: {
            writer: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
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

    return ctx.fullOrganization;
  },
  [requireAuth, requireFullOrganization],
);

export const createOrganization = createServerAction(
  proInformationsSchema,
  async (input, ctx) => {
    // try {
    const data = input;

    const result = await auth.api.createOrganization({
      body: {
        name: data.name as string,
        slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
        logo: data.logo,
        metadata: {},
        userId: ctx.user?.id,
      },
    });

    if (!result) {
      throw new ActionError("Organization not created");
    }

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

    const stripeCompany = await stripe.accounts.create({
      type: "standard",
      country: "FR",
      email: ctx?.user?.email!,
      metadata: {
        organizationId: result?.id!,
        userId: ctx?.user?.id!,
      },
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    const stripeCustomer = await stripe.customers.create({
      name: result?.name!,
      metadata: {
        organizationId: result?.id!,
        userId: ctx?.user?.id!,
      },
    });

    const [organizationResult] = await db
      .update(organizationTable)
      .set({
        email: data.email,
        description: data.description,
        progressionId: progression.id,
        companyType: data.companyType,
        atHome: data.atHome,
        companyStripeId: stripeCompany.id,
        customerStripeId: stripeCustomer.id,
      })
      .where(eq(organizationTable.id, result?.id as string))
      .returning()
      .execute();

    await auth.api.setActiveOrganization({
      headers: await headers(),
      body: {
        organizationId: result?.id,
      },
    });

    // Retourner les données de l'organisation créée
    return organizationResult;
    // } catch (err) {
    //   throw new ActionError("Organization already exists");
    // }
  },
  [requireAuth],
);

export const updateOrganization = createServerAction(
  organizationFormSchema,
  async (input, ctx) => {
    const [data] = await db
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

    return data as Organization;
  },
  [requireAuth, requireOwner],
);

export const updateOrganizationImages = createServerAction(
  organizationImagesFormSchema,
  async (input, ctx) => {
    const data = await db
      .update(organizationTable)
      .set({
        logo: input.logo,
      })
      .where(eq(organizationTable.id, ctx.organization?.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Organization not updated");
    }

    revalidatePath(`/dashboard/organization/${ctx.organization?.id}/settings`);

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
  [requireAuth, requireFullOrganization],
);

export const addImagesToOrganization = createServerAction(
  z.object({
    images: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    ),
  }),
  async (input, ctx) => {
    const data = await db
      .insert(organizationImages)
      .values(
        input.images.map((image) => ({
          organizationId: ctx.organization?.id,
          name: image.name,
          imageUrl: image.url,
        })),
      )
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Images not added");
    }

    return data;
  },
  [requireAuth, requireOwner],
);

export const getNewClientsThisMonth = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const appointments = await db.query.appointments.findMany({
      where: eq(appointmentsTable.proId, ctx.organization.id),
      with: {
        client: true,
      },
      orderBy: desc(appointmentsTable.createdAt),
    });

    // Filtrer pour obtenir uniquement les clients dont le premier rendez-vous est dans le mois en cours
    const clientsFirstAppointments = new Map();

    appointments.forEach((appointment) => {
      const clientId = appointment.clientId;
      if (!clientsFirstAppointments.has(clientId)) {
        clientsFirstAppointments.set(clientId, appointment.createdAt);
      }
    });

    const newClientsThisMonth = Array.from(
      clientsFirstAppointments.entries(),
    ).filter(
      ([_, firstAppointmentDate]) => firstAppointmentDate >= firstDayOfMonth,
    ).length;

    return {
      count: newClientsThisMonth,
    };
  },
  [requireAuth, requireFullOrganization],
);

export const getCompletedAppointmentsThisMonth = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const appointments = await db.query.appointments.findMany({
      where: (appointments) => {
        return and(
          eq(appointments.proId, ctx.organization?.id as string),
          eq(appointments.status, "PAYED"),
          and(
            gte(appointments.beginAt, firstDayOfMonth),
            lte(appointments.beginAt, lastDayOfMonth),
          ),
        );
      },
      with: {
        service: true,
      },
    });

    return {
      count: appointments.length,
      appointments: appointments,
    };
  },
  [requireAuth, requireFullOrganization],
);

export const getOrganizationImages = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }

    const images = await db.query.organizationImages.findMany({
      where: eq(organizationImages.organizationId, ctx.organization.id),
      columns: {
        name: true,
        imageUrl: true,
      },
      orderBy: desc(organizationImages.createdAt),
    });

    return images as OrganizationImage[];
  },
  [requireAuth, requireFullOrganization],
);

export const deleteOrganizationImage = createServerAction(
  z.object({
    imageUrl: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization?.id) {
      throw new ActionError(
        "L'identifiant de l'organisation ne peut pas être indéfini",
      );
    }

    const deletedImage = await db
      .delete(organizationImages)
      .where(
        and(
          eq(organizationImages.organizationId, ctx.organization.id),
          eq(organizationImages.imageUrl, input.imageUrl),
        ),
      )
      .returning()
      .execute();

    if (!deletedImage || deletedImage.length === 0) {
      throw new ActionError("Image non trouvée");
    }

    return deletedImage[0];
  },
  [requireAuth, requireOwner],
);
