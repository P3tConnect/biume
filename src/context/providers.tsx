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
      <NextUIProvider navigate={router.push}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
          {children}
          <Toaster />
        </ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default Providers