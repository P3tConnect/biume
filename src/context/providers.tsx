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
    if (safeConfig.NODE_ENV == "production") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "",
        person_profiles: "always",
      });
    }
  }, []);

  if (safeConfig.NODE_ENV == "development") {
    return (
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
    );
  }

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
