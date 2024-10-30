"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { safeConfig } from "../lib";
import { SidebarProvider } from "@/components/ui/sidebar";

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

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
          <SidebarProvider>
            <TooltipProvider disableHoverableContent>
              {children}
              <Toaster />
            </TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
};

export default Providers;
