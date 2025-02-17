"use client";
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { safeConfig } from "../lib";

export const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    posthog.init(safeConfig.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: safeConfig.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always",
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          <TooltipProvider disableHoverableContent>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
};

export default Providers;
