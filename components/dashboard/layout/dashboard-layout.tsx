"use client";

import { cn } from "@/src/lib/utils";
import { useStore } from "@/src/hooks/useStore";
import { Sidebar } from "@/components/dashboard/layout/sidebar";
import { useSidebarToggle } from "@/src/hooks/useSidebarToggle";
import { ContentLayout } from "./content-layout";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {/* <ContentLayout title="Dashboard"> */}
          {children}
        {/* </ContentLayout> */}
      </main>
    </>
  );
}