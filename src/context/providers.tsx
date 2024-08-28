"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

const Providers = async ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        <NextUIProvider navigate={router.push}>
          {children}
          <Toaster />
        </NextUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
