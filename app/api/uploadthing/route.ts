import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { safeConfig } from "@/src/lib";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: safeConfig.UPLOADTHING_TOKEN,
  },
});
