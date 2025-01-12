"use client";

import { SidebarComponent } from "./sidebar-pro/sidebar";
import { Navbar } from "./navbar";
import { Menu, proMenuList } from "@/src/config/menu-list";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui";
import useWindowSize from "@/src/hooks/use-window-size";

export default function DashboardLayout({
  children,
  companyId,
}: {
  children: React.ReactNode;
  companyId: string;
}) {
  const { windowSize } = useWindowSize();

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <SidebarComponent companyId={companyId} />
      <main className="min-h-[calc(100vh_-_22px)] w-full px-1 ease-in-out duration-300 flex flex-col">
        <Navbar />
        <ScrollArea
          className="pr-3"
          style={{ height: `${windowSize.height! - 85}px` }}
        >
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
