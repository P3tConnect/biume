import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { createServerAction, requireAuth, requireMember } from "@/src/lib"
import { db } from "@/src/lib/db"
import { reminder, CreateReminderSchema } from "@/src/db/reminder"
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"

export const getRemindersAction = createServerAction(
  z.object({}),
  async (_, ctx) => {
    if (!ctx.organization || !ctx.user) throw new Error("Unauthorized")

    const reminders = await db.query.reminder.findMany({
      where: and(eq(reminder.organizationId, ctx.organization.id), eq(reminder.userId, ctx.user.id)),
      with: {
        organization: true,
        user: true,
      },
      orderBy: reminderTable => [reminderTable.dueDate],
    })
    return reminders
  },
  [requireAuth, requireMember]
)

export const createReminderAction = createServerAction(
  CreateReminderSchema,
  async (input, ctx) => {
    if (!ctx.organization || !ctx.user) throw new Error("Unauthorized")

    const newReminder = await db
      .insert(reminder)
      .values({
        ...input,
        organizationId: ctx.organization.id,
        userId: ctx.user.id,
      })
      .returning()
    return newReminder[0]
  },
  [requireAuth, requireMember]
)

export const updateReminderAction = createServerAction(
  z.object({
    id: z.string(),
    data: CreateReminderSchema.partial(),
  }),
  async (input, ctx) => {
    if (!ctx.organization || !ctx.user) throw new Error("Unauthorized")

    const updatedReminder = await db
      .update(reminder)
      .set({
        ...input.data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(reminder.id, input.id),
          eq(reminder.organizationId, ctx.organization.id),
          eq(reminder.userId, ctx.user.id)
        )
      )
      .returning()
    return updatedReminder[0]
  },
  [requireAuth, requireMember]
)

export const deleteReminderAction = createServerAction(
  z.object({
    id: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization || !ctx.user) throw new Error("Unauthorized")

    await db
      .delete(reminder)
      .where(
        and(
          eq(reminder.id, input.id),
          eq(reminder.organizationId, ctx.organization.id),
          eq(reminder.userId, ctx.user.id)
        )
      )
    return true
  },
  [requireAuth, requireMember]
)
