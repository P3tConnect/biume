import type { TriggerConfig } from "@trigger.dev/sdk/v3";

export const config: TriggerConfig = {
  project: "proj_lduckgshsvswaztqyhqy",
  logLevel: "log",
  additionalPackages: ["pnpm"],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  onFailure: async (payload, error, { ctx }) => {
    console.log("Task failed !", ctx.task.id, "Error :", error);
  },
  onSuccess: async (payload, output, { ctx }) => {
    console.log("Task Success !", ctx.task.id, "Output :", output);
  },
};
