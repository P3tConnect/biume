import { task } from "@trigger.dev/sdk/v3"

export const remindersTask = task({
  id: "reminder-client",
  run: async (payload, { ctx }) => {},
})

export const rateReminder = task({
  id: "rate-company",
  run: async (payload, { ctx }) => {},
})
