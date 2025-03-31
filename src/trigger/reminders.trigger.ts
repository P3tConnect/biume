import { task } from "@trigger.dev/sdk/v3"

export const remindersTask = task({
  id: "reminder-client",
  description: "Alert client about their future appointments",
  run: async (payload, { ctx }) => {},
})

export const rateReminder = task({
  id: "rate-company",
  description: "Alert client for rate the company",
  run: async (payload, { ctx }) => {},
})

export const cancelPoliciesReminder = task({
  id: "cancel-policies-reminder",
  description: "Alert client for cancel policies for the next appointment",
  run: async (payload, { ctx }) => {},
})

export const reportProReminder = task({
  id: "report-pro-reminder",
  description: "Alert pro for report the client",
  run: async (payload, { ctx }) => {},
})

export const readyForBalancePayout = task({
  id: "ready-for-balance-payout",
  description: "Alert pro when ready for balance payout",
  run: async (payload, { ctx }) => {},
})




