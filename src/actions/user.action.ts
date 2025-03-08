"use server"

import { headers } from "next/headers"
import { z } from "zod"

import { clientSettingsSchema } from "@/components/dashboard/pages/user/settings-page/types/settings-schema"

import { ActionError, createServerAction, requireAuth } from "../lib"
import { auth } from "../lib/auth"

export const getUserInformations = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const data = await auth.api.getSession({
      headers: await headers(),
    })

    if (!data) {
      throw new ActionError("User not found")
    }

    return data
  },
  [requireAuth]
)
export const updateUserInformations = createServerAction(
  clientSettingsSchema,
  async (input, ctx) => {
    const user = await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: input.name,
        image: input.image,
        address: input.address,
        country: input.country,
        city: input.city,
        zipCode: input.zipCode,
        phone: input.phoneNumber,
        smsNotifications: input.smsNotifications,
        emailNotifications: input.emailNotifications,
        twoFactorEnabled: input.twoFactorEnabled,
      },
    })

    if (!user) {
      throw new ActionError("User not updated")
    }

    return user
  },
  [requireAuth]
)
