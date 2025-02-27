import { z } from "zod";
import { ActionError, createServerAction, db, requireAuth, requireFullOrganization } from "../lib";
import { organizationSlots } from "../db";
import { and, eq } from "drizzle-orm";
import { CreateOrganizationSlotsSchema, OrganizationSlots } from "../db/organizationSlots";

export const getOrganizationSlots = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const slots = await db.query.organizationSlots.findMany({
      where: eq(organizationSlots.organizationId, ctx.organization?.id as string),
      with: {
        service: true,
      },
      columns: {
        id: true,
        start: true,
        end: true,
        serviceId: true,
      },
    });

    if (!slots) {
      throw new ActionError("Aucun créneau trouvé");
    }

    return slots as OrganizationSlots[];
  },
  [requireAuth, requireFullOrganization],
);

export const getOrganizationSlotsByService = createServerAction(
  z.object({
    serviceId: z.string(),
  }),
  async (input, ctx) => {
    const slots = await db.query.organizationSlots.findMany({
      where: eq(organizationSlots.serviceId, input.serviceId),
    });

    if (!slots) {
      throw new ActionError("Aucun créneau trouvé");
    }

    return slots;
  },
  [requireAuth, requireFullOrganization],
);

export const createOrganizationSlot = createServerAction(
  z.array(CreateOrganizationSlotsSchema),
  async (input, ctx) => {
    const slots = await db
      .insert(organizationSlots)
      .values(input)
      .returning()
      .execute();

    if (!slots) {
      throw new ActionError("Erreur lors de la création des créneaux");
    }

    return slots;
  },
  [requireAuth, requireFullOrganization],
);

export const updateOrganizationSlot = createServerAction(
  CreateOrganizationSlotsSchema,
  async (input, ctx) => {
    const [slot] = await db
      .update(organizationSlots)
      .set(input)
      .where(
        and(
          eq(organizationSlots.id, input.id as string),
          eq(organizationSlots.organizationId, ctx.organization?.id as string),
        ),
      )
      .returning()
      .execute();

    if (!slot) {
      throw new ActionError("Erreur lors de la modification du créneau");
    }

    return slot;
  },
  [requireAuth, requireFullOrganization],
);

export const deleteOrganizationSlot = createServerAction(
  z.object({
    id: z.string(),
  }),
  async (input, ctx) => {
    const [slot] = await db
      .delete(organizationSlots)
      .where(
        and(
          eq(organizationSlots.id, input.id),
          eq(organizationSlots.organizationId, ctx.organization?.id as string),
        ),
      )
      .returning()
      .execute();

    if (!slot) {
      throw new ActionError("Erreur lors de la suppression du créneau");
    }

    return slot;
  },
  [requireAuth, requireFullOrganization],
);
