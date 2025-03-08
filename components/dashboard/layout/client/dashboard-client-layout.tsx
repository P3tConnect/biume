"use client"

import React from "react"

import { ScrollArea } from "@/components/ui"

import { ClientNavbar } from "./client-navbar"

const DashboardClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      <ClientNavbar />
      <main className="h-full w-full p-4">
        <ScrollArea className="h-[calc(100vh-5rem)]">{children}</ScrollArea>
      </main>
    </div>
  )
}

export default DashboardClientLayout
