"use client"

import { NextUIProvider } from '@nextui-org/react'
import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'
import { useRouter } from 'next/navigation'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = async ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' forcedTheme='dark' enableSystem={false}>
        <NextUIProvider navigate={router.push}>
          {children}
          <Toaster />
        </NextUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers