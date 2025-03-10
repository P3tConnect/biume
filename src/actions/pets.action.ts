import { eq } from "drizzle-orm"
import { z } from "zod"

import { pets } from "@/src/db"
import { createServerAction, requireAuth, requireMember } from "@/src/lib"
import { db } from "@/src/lib"

// Action pour récupérer tous les animaux d'une organisation
export const getPetsAction = createServerAction(
  z.object({
    ownerId: z.string().optional(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    // Note: Comme pets n'a pas de propriété organizationId, nous filtrons uniquement par ownerId si fourni
    let query

    if (input.ownerId) {
      query = db.query.pets.findMany({
        where: eq(pets.ownerId, input.ownerId),
        with: {
          owner: true,
        },
      })
    } else {
      query = db.query.pets.findMany({
        with: {
          owner: true,
        },
      })
    }

    const allPets = await query

    return { pets: allPets }
  },
  [requireAuth, requireMember]
)
