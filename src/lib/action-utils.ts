import { z } from "zod"

import { Organization as FullOrganization } from "@/src/db"

import type { User } from "./auth"

// Define minimal types needed for the context
type MinimalOrganization = {
  id: string
  name: string
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Action Error"
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message
  }
  return "An unexpected error occurred"
}

export type ServerActionContext = {
  user: User | null
  organization: MinimalOrganization | null
  fullOrganization: FullOrganization | null
  meta: Record<string, unknown> | null
}

export type ActionResult<T> = { data: T; error?: never } | { data?: never; error: string }

// Fonction pour vérifier en toute sécurité si le schéma est un schéma Zod valide
function isValidZodSchema(schema: any): schema is z.ZodType {
  return schema && typeof schema === "object" && "parse" in schema && typeof schema.parse === "function"
}

export function createServerAction<TSchema, TOutput>(
  schema: TSchema,
  handler: (input: any, ctx: ServerActionContext) => Promise<TOutput>,
  middlewares: ((ctx: ServerActionContext) => Promise<void>)[] = []
): (input: any) => Promise<ActionResult<TOutput>> {
  return async (input: any) => {
    try {
      // Initialize context
      const ctx: ServerActionContext = {
        meta: {},
        user: null,
        organization: null,
        fullOrganization: null,
      }

      // Execute all middlewares in sequence
      for (const middleware of middlewares) {
        await middleware(ctx)
      }

      // Validate input
      let validatedInput

      if (isValidZodSchema(schema)) {
        try {
          validatedInput = schema.parse(input)
        } catch (e) {
          if (e instanceof z.ZodError) {
            const errors = e.errors.map(err => ({
              path: err.path.join("."),
              message: err.message,
            }))
            return { error: JSON.stringify(errors) }
          }
          if (e instanceof Error) {
            return { error: e.message }
          }
          return { error: "Erreur inconnue" }
        }
      } else {
        // Si le schéma n'est pas un schéma Zod valide, on utilise l'entrée telle quelle
        console.warn(
          "Le schéma fourni n'est pas un schéma Zod valide ou n'a pas de méthode parse, aucune validation effectuée"
        )
        validatedInput = input
      }

      // Execute handler with validated input
      const result = await handler(validatedInput, ctx)

      return { data: result }
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { error: e.errors[0].message }
      }
      if (e instanceof Error) {
        return { error: e.message }
      }
      return { error: "An unexpected error occurred" }
    }
  }
}
