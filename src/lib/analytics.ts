import { safeConfig } from "@/src/lib";
import { PostHog } from "posthog-node";

export const posthogClient = new PostHog(safeConfig.NEXT_PUBLIC_POSTHOG_KEY, {
  host: safeConfig.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
});
