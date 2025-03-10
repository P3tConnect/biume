import { createRouteHandler } from "uploadthing/next"

import { safeConfig } from "@/src/lib"

import { ourFileRouter } from "./core"

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: safeConfig.UPLOADTHING_TOKEN,
  },

  // Apply an (optional) custom config:
  // config: { ... },
})
